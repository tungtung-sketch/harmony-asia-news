import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan, metadata } = await req.json();
    
    console.log("Creating checkout session for plan:", plan);
    console.log("Metadata:", metadata);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Get the appropriate price ID based on the plan
    let priceId: string;
    if (plan === "basic") {
      priceId = Deno.env.get("STRIPE_PRICE_BASIC") || "";
    } else if (plan === "premium") {
      priceId = Deno.env.get("STRIPE_PRICE_PREMIUM") || "";
    } else {
      throw new Error(`Invalid plan: ${plan}`);
    }

    if (!priceId) {
      throw new Error(`Price ID not found for plan: ${plan}`);
    }

    console.log("Using price ID:", priceId);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: metadata.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/subscribe`,
      metadata: {
        name: metadata.name,
        email: metadata.email,
        position: metadata.position,
        industry: metadata.industry,
        purpose: metadata.purpose,
        plan: metadata.plan,
      },
    });

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});