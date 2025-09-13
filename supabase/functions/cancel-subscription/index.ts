import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CANCEL-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    if (!resendKey) throw new Error("RESEND_API_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { reason } = await req.json();
    logStep("Cancellation reason received", { reason });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const resend = new Resend(resendKey);

    // Find the customer in Stripe
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      throw new Error("No Stripe customer found for this user");
    }
    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Find active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 10,
    });

    if (subscriptions.data.length === 0) {
      throw new Error("No active subscriptions found for this customer");
    }

    // Cancel all active subscriptions
    const cancelPromises = subscriptions.data.map(async (subscription) => {
      logStep("Cancelling subscription", { subscriptionId: subscription.id });
      return stripe.subscriptions.update(subscription.id, {
        cancel_at_period_end: true,
        metadata: {
          cancellation_reason: reason || "User requested cancellation",
          cancelled_at: new Date().toISOString(),
        },
      });
    });

    const cancelledSubscriptions = await Promise.all(cancelPromises);
    logStep("Subscriptions cancelled", { count: cancelledSubscriptions.length });

    // Update user subscription status in Supabase
    const { error: updateError } = await supabaseClient
      .from("subscriptions")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (updateError) {
      logStep("Error updating subscription status", { error: updateError });
    } else {
      logStep("Subscription status updated in database");
    }

    // Send confirmation email
    try {
      const emailResponse = await resend.emails.send({
        from: "Harmony Asia News <noreply@harmonyasianews.com>",
        to: [user.email],
        subject: "Subscription Cancellation Confirmation / サブスクリプション解約確認",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Harmony Asia News</h2>
            
            <h3 style="color: #333;">Subscription Cancellation Confirmation</h3>
            <p>Dear Valued Subscriber,</p>
            <p>Your subscription has been successfully cancelled. Thank you for using Harmony Asia News.</p>
            <p>Your subscription will remain active until the end of your current billing cycle. You will continue to have access to premium content until that time.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            
            <h3 style="color: #333;">サブスクリプション解約確認</h3>
            <p>お客様各位</p>
            <p>サブスクリプションは正常に解約されました。Harmony Asia Newsをご利用いただきありがとうございました。</p>
            <p>現在の請求サイクルが終了するまで、サブスクリプションは有効です。その期間中はプレミアムコンテンツにアクセスできます。</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                If you have any questions, please contact our support team.<br>
                ご質問がございましたら、サポートチームまでお問い合わせください。
              </p>
            </div>
          </div>
        `,
      });

      logStep("Confirmation email sent", { emailId: emailResponse.data?.id });
    } catch (emailError) {
      logStep("Error sending confirmation email", { error: emailError });
      // Don't fail the whole operation if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Subscription cancelled successfully",
        cancelled_subscriptions: cancelledSubscriptions.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in cancel-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});