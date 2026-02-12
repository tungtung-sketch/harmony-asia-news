import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, checking local subscription status");
      
      // Check local subscription in Supabase
      const { data: localSub } = await supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (localSub && localSub.tier === 'free_trial' && new Date(localSub.trial_end_date) > new Date()) {
        return new Response(JSON.stringify({ 
          subscribed: true,
          plan: 'free_trial',
          subscription_end: localSub.trial_end_date,
          status: 'trialing'
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    const hasActiveSub = subscriptions.data.length > 0;
    let plan = null;
    let subscriptionEnd = null;
    let status = 'inactive';

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      // Handle current_period_end as either Unix timestamp (number) or ISO string
      const periodEnd = subscription.current_period_end;
      if (typeof periodEnd === 'number') {
        subscriptionEnd = new Date(periodEnd * 1000).toISOString();
      } else if (typeof periodEnd === 'string') {
        subscriptionEnd = new Date(periodEnd).toISOString();
      } else {
        subscriptionEnd = null;
      }
      status = subscription.status;
      
      // Determine plan based on price ID
      const priceId = subscription.items.data[0].price.id;
      const basicPriceId = Deno.env.get("STRIPE_PRICE_BASIC");
      const premiumPriceId = Deno.env.get("STRIPE_PRICE_PREMIUM");
      
      if (priceId === basicPriceId) {
        plan = 'basic';
      } else if (priceId === premiumPriceId) {
        plan = 'premium';
      }
      
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd, plan, status });

      // Update local subscription in Supabase
      await supabaseClient
        .from('subscriptions')
        .update({
          stripe_subscription_id: subscription.id,
          stripe_customer_id: customerId,
          stripe_price_id: priceId,
          tier: plan || 'basic',
          status: status,
          subscription_end_date: subscriptionEnd,
          current_period_end: subscriptionEnd,
          is_active: true,
        })
        .eq('user_id', user.id);
    } else {
      logStep("No active subscription found");
      
      // Check if user has an active free trial
      const { data: localSub } = await supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (localSub && localSub.tier === 'free_trial' && new Date(localSub.trial_end_date) > new Date()) {
        return new Response(JSON.stringify({ 
          subscribed: true,
          plan: 'free_trial',
          subscription_end: localSub.trial_end_date,
          status: 'trialing'
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      plan: plan,
      subscription_end: subscriptionEnd,
      status: status
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});