import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// 1x1 transparent GIF pixel
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
  0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b
]);

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  
  // Remove 'newsletter-api' from path if present
  const basePath = pathParts[0] === "newsletter-api" ? pathParts.slice(1) : pathParts;
  const endpoint = basePath.join("/");

  console.log(`Newsletter API request: ${req.method} /${endpoint}`);

  try {
    // GET /articles - Fetch approved/published articles
    if (req.method === "GET" && endpoint === "articles") {
      const since = url.searchParams.get("since");
      const limit = parseInt(url.searchParams.get("limit") || "50");

      let query = supabase
        .from("articles")
        .select(`
          id,
          slug,
          featured_image_url,
          published_at,
          category_id,
          article_content (
            title,
            content,
            meta_description,
            language
          ),
          categories (
            name_en
          )
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(limit);

      if (since) {
        query = query.gte("published_at", since);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching articles:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      // Transform data to expected format
      const articles = (data || []).map((article: any) => {
        const enContent = article.article_content?.find((c: any) => c.language === "en");
        const jpContent = article.article_content?.find((c: any) => c.language === "ja");
        
        return {
          id: article.id,
          title_en: enContent?.title || "",
          title_jp: jpContent?.title || "",
          summary_en: enContent?.meta_description || "",
          summary_jp: jpContent?.meta_description || "",
          content_en: enContent?.content || "",
          content_jp: jpContent?.content || "",
          url: `/news/${article.slug}`,
          category: article.categories?.name_en || "",
          published_at: article.published_at,
          image_url: article.featured_image_url || "",
        };
      });

      console.log(`Returning ${articles.length} articles`);
      return new Response(JSON.stringify(articles), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // GET /subscribers - Fetch newsletter-eligible users from profiles + subscriptions
    if (req.method === "GET" && endpoint === "subscribers") {
      const status = url.searchParams.get("status");
      const segment = url.searchParams.get("segment");

      // Newsletter-eligible tiers (Basic plan or higher)
      const eligibleTiers = ["starter", "business", "enterprise", "free_trial"];

      // Query profiles with their subscription data
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select(`
          id,
          user_id,
          email,
          full_name,
          company,
          preferred_language,
          created_at,
          subscriptions!inner (
            tier,
            is_active,
            status,
            subscription_end_date,
            trial_end_date
          )
        `)
        .not("email", "is", null);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        return new Response(JSON.stringify({ error: profilesError.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      // Map tier to segment name
      const tierToSegment = (tier: string): string => {
        switch (tier) {
          case "starter": return "BASIC";
          case "business": return "PREMIUM";
          case "enterprise": return "ENTERPRISE";
          case "free_trial": return "TRIAL";
          default: return "FREE";
        }
      };

      // Determine if user has active newsletter-eligible subscription
      const isActiveSubscriber = (profile: any): boolean => {
        const sub = profile.subscriptions;
        if (!sub || !Array.isArray(sub) || sub.length === 0) return false;
        
        const subscription = sub[0];
        const tier = subscription.tier;
        const isActive = subscription.is_active;
        const subStatus = subscription.status;
        
        // Check if tier is newsletter-eligible
        if (!eligibleTiers.includes(tier)) return false;
        
        // Check subscription is active
        if (!isActive) return false;
        
        // For free_trial, check if trial hasn't expired
        if (tier === "free_trial" && subscription.trial_end_date) {
          const trialEnd = new Date(subscription.trial_end_date);
          if (trialEnd < new Date()) return false;
        }
        
        // For paid plans, check subscription_end_date if exists
        if (tier !== "free_trial" && subscription.subscription_end_date) {
          const subEnd = new Date(subscription.subscription_end_date);
          if (subEnd < new Date()) return false;
        }
        
        return true;
      };

      // Transform and filter data
      let subscribers = (profilesData || []).map((profile: any) => {
        const sub = profile.subscriptions?.[0];
        const tier = sub?.tier || "free";
        const active = isActiveSubscriber(profile);
        
        return {
          id: profile.user_id || profile.id,
          email: profile.email,
          full_name: profile.full_name || "",
          language_preference: profile.preferred_language || "en",
          segment: tierToSegment(tier),
          status: active ? "active" : "inactive",
          company: profile.company || "",
          created_at: profile.created_at,
        };
      });

      // Filter by status parameter
      if (status === "active") {
        subscribers = subscribers.filter((s: any) => s.status === "active");
      } else if (status === "inactive") {
        subscribers = subscribers.filter((s: any) => s.status === "inactive");
      }

      // Filter by segment if provided
      if (segment) {
        subscribers = subscribers.filter((s: any) => s.segment === segment.toUpperCase());
      }

      console.log(`Returning ${subscribers.length} subscribers (status=${status || "all"}, segment=${segment || "all"})`);
      return new Response(JSON.stringify(subscribers), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // POST /log/send - Log newsletter send
    if (req.method === "POST" && endpoint === "log/send") {
      const body = await req.json();
      const { subscriber_id, email, article_ids, tracking_id, sent_at, provider } = body;

      if (!email || !tracking_id) {
        return new Response(JSON.stringify({ error: "email and tracking_id are required" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      const { data, error } = await supabase
        .from("newsletter_sends")
        .insert({
          subscriber_id: subscriber_id || null,
          email,
          article_ids: article_ids || [],
          tracking_id,
          sent_at: sent_at || new Date().toISOString(),
          provider: provider || "n8n",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Error logging send:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      console.log(`Logged newsletter send: ${data.id}`);
      return new Response(JSON.stringify({ status: "ok", saved: true, send_id: data.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // GET /open/:trackingId - Track email open (returns tracking pixel)
    if (req.method === "GET" && endpoint.startsWith("open/")) {
      const trackingId = endpoint.replace("open/", "");
      
      if (!trackingId) {
        return new Response(TRACKING_PIXEL, {
          headers: { ...corsHeaders, "Content-Type": "image/gif" },
          status: 200,
        });
      }

      // Find the send record by tracking_id
      const { data: sendData } = await supabase
        .from("newsletter_sends")
        .select("id")
        .eq("tracking_id", trackingId)
        .maybeSingle();

      if (sendData) {
        // Log the open event
        const userAgent = req.headers.get("user-agent") || "";
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "";
        // Hash IP for privacy
        const ipHash = ip ? btoa(ip).substring(0, 16) : "";

        await supabase.from("newsletter_opens").insert({
          send_id: sendData.id,
          user_agent: userAgent,
          ip_hash: ipHash,
        });

        console.log(`Tracked open for tracking_id: ${trackingId}`);
      }

      // Always return tracking pixel
      return new Response(TRACKING_PIXEL, {
        headers: {
          ...corsHeaders,
          "Content-Type": "image/gif",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
        status: 200,
      });
    }

    // 404 for unknown endpoints
    console.log(`Unknown endpoint: ${endpoint}`);
    return new Response(JSON.stringify({ error: "Not found", endpoint }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 404,
    });

  } catch (error) {
    console.error("Newsletter API error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
