import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (resets when function cold-starts)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 60; // max events per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

const VALID_EVENTS = new Set([
  "page_view",
  "article_view",
  "report_view",
  "paywall_hit",
  "signup_start",
  "signup_complete",
  "checkout_start",
  "subscribe_success",
  "subscribe_cancel",
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    // Validate required fields
    const { event_name, session_id, path } = body;
    if (!event_name || !session_id || !path) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: event_name, session_id, path" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!VALID_EVENTS.has(event_name)) {
      return new Response(
        JSON.stringify({ error: `Invalid event_name: ${event_name}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limit by session_id or anon_id
    const rateLimitKey = body.anon_id || session_id;
    if (isRateLimited(rateLimitKey)) {
      return new Response(
        JSON.stringify({ error: "Rate limited" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Derive user_id from JWT if available
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const anonClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const token = authHeader.replace("Bearer ", "");
      const { data } = await anonClient.auth.getClaims(token);
      if (data?.claims?.sub) {
        userId = data.claims.sub as string;
      }
    }

    // Insert using service role (bypasses RLS)
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Sanitize meta - strip any PII fields
    const meta = body.meta || {};
    delete meta.email;
    delete meta.password;
    delete meta.token;

    const { error } = await serviceClient.from("events").insert({
      event_name,
      user_id: userId,
      anon_id: body.anon_id || null,
      session_id,
      path,
      category: body.category || null,
      content_id: body.content_id || null,
      plan: body.plan || null,
      step: body.step || null,
      referrer: body.referrer || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      language: body.language || null,
      country: body.country || null,
      device: body.device || null,
      meta,
    });

    if (error) {
      console.error("Insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to insert event" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Track error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
