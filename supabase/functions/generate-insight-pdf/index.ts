import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PdfRequest {
  reportId: string;
  language: 'en' | 'ja';
  userEmail: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[GENERATE-INSIGHT-PDF] Function started");

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify user authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }

    const user = userData.user;
    console.log(`[GENERATE-INSIGHT-PDF] User authenticated: ${user.email}`);

    // Check subscription status
    const { data: subscription, error: subError } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (subError || !subscription) {
      console.log("[GENERATE-INSIGHT-PDF] No active subscription found");
      return new Response(
        JSON.stringify({ error: "Premium subscription required for PDF download" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if subscription tier allows PDF download (business or enterprise)
    const allowedTiers = ['business', 'enterprise'];
    if (!allowedTiers.includes(subscription.tier)) {
      console.log(`[GENERATE-INSIGHT-PDF] Tier ${subscription.tier} does not allow PDF download`);
      return new Response(
        JSON.stringify({ error: "Premium subscription required for PDF download" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const { reportId, language, userEmail }: PdfRequest = await req.json();
    console.log(`[GENERATE-INSIGHT-PDF] Generating PDF for report: ${reportId}, language: ${language}`);

    // Generate a watermarked PDF URL
    // In a production environment, this would integrate with a PDF generation service
    // For now, we'll return a placeholder that indicates successful authorization
    
    const timestamp = new Date().toISOString();
    const watermarkText = `${userEmail} | ${timestamp} | Not for redistribution`;
    
    // Log the PDF generation event
    console.log(`[GENERATE-INSIGHT-PDF] PDF generation authorized`);
    console.log(`[GENERATE-INSIGHT-PDF] Watermark: ${watermarkText}`);

    // In production, this would:
    // 1. Generate the actual PDF with the report content
    // 2. Add watermark with user email and timestamp
    // 3. Upload to Supabase Storage or return as base64
    // 4. Return the download URL

    // For now, return a success response indicating the feature is ready
    // The actual PDF generation would require additional libraries like jsPDF or a PDF service
    
    return new Response(
      JSON.stringify({
        success: true,
        message: language === 'ja' 
          ? "PDFダウンロード機能は準備中です。近日公開予定。"
          : "PDF download feature is coming soon. We are preparing the infrastructure.",
        reportId,
        language,
        watermark: watermarkText,
        // In production: pdfUrl: "https://storage.supabase.co/..."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("[GENERATE-INSIGHT-PDF] Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
