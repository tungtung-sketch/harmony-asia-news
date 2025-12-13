import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PdfRequest {
  reportId: string;
  language: 'en' | 'ja';
  reportContent?: {
    title: string;
    category: string;
    lastUpdated: string;
    executiveSummary: string[];
    sections: Array<{
      title: string;
      content: string;
    }>;
    sources: string[];
    disclaimer: string;
  };
}

interface UserProfile {
  email: string;
  full_name: string | null;
  company: string | null;
}

// Simple PDF generation using HTML template
function generatePdfHtml(
  content: PdfRequest['reportContent'],
  userProfile: UserProfile,
  language: 'en' | 'ja',
  watermarkText: string
): string {
  const isJapanese = language === 'ja';
  const timestamp = new Date().toISOString();
  const userInfo = `${userProfile.email}${userProfile.company ? ` | ${userProfile.company}` : ''}`;
  
  const pageStyles = `
    @page {
      size: A4;
      margin: 2cm;
      @bottom-center {
        content: "© WaLens | Not for redistribution | Page " counter(page) " of " counter(pages);
        font-size: 9pt;
        color: #666;
      }
    }
    
    body {
      font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Meiryo', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      counter-reset: page;
    }
    
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 48pt;
      color: rgba(200, 200, 200, 0.15);
      white-space: nowrap;
      pointer-events: none;
      z-index: 1000;
      user-select: none;
    }
    
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      text-align: center;
    }
    
    .cover-logo {
      font-size: 24pt;
      font-weight: bold;
      color: #1a365d;
      margin-bottom: 40px;
    }
    
    .cover-title {
      font-size: 28pt;
      font-weight: bold;
      color: #1a365d;
      margin-bottom: 20px;
      line-height: 1.3;
    }
    
    .cover-category {
      font-size: 14pt;
      color: #666;
      margin-bottom: 40px;
    }
    
    .cover-meta {
      font-size: 11pt;
      color: #888;
    }
    
    .premium-badge {
      background: linear-gradient(135deg, #d69e2e, #ecc94b);
      color: #1a1a1a;
      padding: 8px 24px;
      border-radius: 20px;
      font-weight: bold;
      margin-bottom: 30px;
      display: inline-block;
    }
    
    .section {
      page-break-inside: avoid;
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 16pt;
      font-weight: bold;
      color: #1a365d;
      border-bottom: 2px solid #d69e2e;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    
    .executive-summary {
      background: #f7fafc;
      border-left: 4px solid #d69e2e;
      padding: 20px;
      margin-bottom: 30px;
    }
    
    .summary-item {
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;
    }
    
    .summary-item::before {
      content: "▸";
      position: absolute;
      left: 0;
      color: #d69e2e;
    }
    
    .sources-list {
      font-size: 10pt;
      color: #666;
    }
    
    .disclaimer {
      font-size: 9pt;
      color: #888;
      border-top: 1px solid #ddd;
      padding-top: 20px;
      margin-top: 40px;
    }
    
    .citation-box {
      background: #f0f9ff;
      border: 1px solid #bee3f8;
      padding: 20px;
      margin-top: 30px;
      border-radius: 8px;
    }
    
    .citation-title {
      font-weight: bold;
      margin-bottom: 10px;
      color: #2b6cb0;
    }
    
    .user-watermark {
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-size: 8pt;
      color: #ccc;
      user-select: none;
    }
    
    /* Disable text selection for security */
    * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;

  const citationText = isJapanese
    ? `引用方法：WaLens（${new Date().getFullYear()}）『${content?.title || 'Report'}』WaLens株式会社`
    : `Citation: WaLens (${new Date().getFullYear()}), "${content?.title || 'Report'}", WaLens Co., Ltd.`;

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content?.title || 'WaLens Report'}</title>
  <style>${pageStyles}</style>
</head>
<body>
  <div class="watermark">${watermarkText}</div>
  <div class="user-watermark">${userInfo} | ${timestamp}</div>
  
  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-logo">🔍 WaLens (和視)</div>
    <div class="premium-badge">${isJapanese ? 'プレミアムレポート' : 'Premium Report'}</div>
    <h1 class="cover-title">${content?.title || ''}</h1>
    <div class="cover-category">${content?.category || ''}</div>
    <div class="cover-meta">
      ${isJapanese ? '最終更新' : 'Last Updated'}: ${content?.lastUpdated || ''}<br>
      ${isJapanese ? '発行' : 'Published by'}: WaLens Co., Ltd.
    </div>
  </div>
  
  <!-- Executive Summary -->
  <div class="section">
    <h2 class="section-title">${isJapanese ? 'エグゼクティブサマリー' : 'Executive Summary'}</h2>
    <div class="executive-summary">
      ${(content?.executiveSummary || []).map(item => `
        <div class="summary-item">${item}</div>
      `).join('')}
    </div>
  </div>
  
  <!-- Main Sections -->
  ${(content?.sections || []).map(section => `
    <div class="section">
      <h2 class="section-title">${section.title}</h2>
      <div>${section.content}</div>
    </div>
  `).join('')}
  
  <!-- Citation Guide -->
  <div class="citation-box">
    <div class="citation-title">${isJapanese ? '本レポートの引用方法' : 'How to Cite This Report'}</div>
    <div>${citationText}</div>
  </div>
  
  <!-- Sources -->
  <div class="section">
    <h2 class="section-title">${isJapanese ? '出典・参考文献' : 'Sources & References'}</h2>
    <div class="sources-list">
      ${(content?.sources || []).map((source, i) => `
        <div>${i + 1}. ${source}</div>
      `).join('')}
    </div>
  </div>
  
  <!-- Disclaimer -->
  <div class="disclaimer">
    ${content?.disclaimer || ''}
    <br><br>
    <strong>${isJapanese ? 'ダウンロード情報' : 'Download Information'}:</strong><br>
    ${isJapanese ? 'ダウンロード者' : 'Downloaded by'}: ${userProfile.email}<br>
    ${userProfile.company ? `${isJapanese ? '会社名' : 'Company'}: ${userProfile.company}<br>` : ''}
    ${isJapanese ? 'ダウンロード日時' : 'Downloaded at'}: ${new Date().toLocaleString(isJapanese ? 'ja-JP' : 'en-US')}
  </div>
</body>
</html>`;
}

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-INSIGHT-PDF] ${step}${detailsStr}`);
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Verify user authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("No authorization header");
      return new Response(
        JSON.stringify({ error: "認証が必要です。ログインしてください。" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      logStep("User authentication failed", { error: userError?.message });
      return new Response(
        JSON.stringify({ error: "セッションが切れました。再度ログインしてください。" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get user profile for watermark
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email, full_name, company')
      .eq('user_id', user.id)
      .maybeSingle();

    const userProfile: UserProfile = {
      email: user.email || '',
      full_name: profile?.full_name || null,
      company: profile?.company || null,
    };

    // Check subscription status
    const { data: subscription } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .maybeSingle();

    // Check if admin
    const isAdmin = user.email === 'tungtungtutungtung@gmail.com';

    // Determine if user can download
    const now = new Date();
    const allowedTiers = ['business', 'enterprise'];
    const hasTrialAccess = subscription?.tier === 'free_trial' && 
      subscription?.trial_end_date && 
      new Date(subscription.trial_end_date) > now;
    const hasPaidAccess = subscription && 
      allowedTiers.includes(subscription.tier) &&
      (!subscription.subscription_end_date || new Date(subscription.subscription_end_date) > now);

    if (!isAdmin && !hasTrialAccess && !hasPaidAccess) {
      logStep("User not authorized for PDF download", { tier: subscription?.tier });
      return new Response(
        JSON.stringify({ error: "PDFダウンロードにはプレミアムプランへのアップグレードが必要です。" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const { reportId, language, reportContent }: PdfRequest = await req.json();
    logStep("Request parsed", { reportId, language });

    // Check if PDF is enabled for this report
    const { data: reportSettings } = await supabaseClient
      .from('insight_reports')
      .select('*')
      .eq('report_slug', reportId)
      .maybeSingle();

    if (reportSettings && !reportSettings.pdf_enabled) {
      logStep("PDF download disabled for report", { reportId });
      return new Response(
        JSON.stringify({ error: "このレポートのPDFダウンロードは現在無効です。" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const watermarkText = reportSettings?.watermark_text || 'For Premium Members of WaLen Only';

    // Check cache
    const { data: cachedPdf } = await supabaseClient
      .from('pdf_cache')
      .select('*')
      .eq('report_slug', reportId)
      .eq('user_id', user.id)
      .eq('language', language)
      .maybeSingle();

    const contentVersion = reportSettings?.last_content_update || new Date().toISOString();

    // If we have a valid cache entry, return signed URL
    if (cachedPdf && 
        new Date(cachedPdf.expires_at) > now &&
        cachedPdf.content_version === contentVersion) {
      logStep("Using cached PDF", { storagePath: cachedPdf.storage_path });
      
      const { data: signedUrl } = await supabaseClient.storage
        .from('insight-pdfs')
        .createSignedUrl(cachedPdf.storage_path, 3600); // 1 hour expiry

      if (signedUrl?.signedUrl) {
        // Log the download
        await supabaseClient.from('pdf_downloads').insert({
          report_slug: reportId,
          user_id: user.id,
          user_email: user.email,
          user_company: userProfile.company,
          language,
          ip_hash: null, // Could hash IP for analytics
        });

        return new Response(
          JSON.stringify({ 
            pdfUrl: signedUrl.signedUrl,
            cached: true,
            message: language === 'ja' ? 'PDFを準備しました。' : 'PDF is ready.'
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Generate new PDF
    logStep("Generating new PDF");
    
    const pdfHtml = generatePdfHtml(reportContent, userProfile, language, watermarkText);
    
    // Convert HTML to PDF using a simple approach
    // In production, you'd use a PDF service like Puppeteer Cloud, PDFShift, etc.
    // For now, we'll store the HTML and provide instructions
    
    const fileName = `${user.id}/${reportId}_${language}_${Date.now()}.html`;
    
    // Store the HTML file (as a demonstration - real impl would convert to PDF)
    const { error: uploadError } = await supabaseClient.storage
      .from('insight-pdfs')
      .upload(fileName, pdfHtml, {
        contentType: 'text/html',
        upsert: true,
      });

    if (uploadError) {
      logStep("Upload error", { error: uploadError.message });
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Update cache
    await supabaseClient
      .from('pdf_cache')
      .upsert({
        report_slug: reportId,
        user_id: user.id,
        language,
        storage_path: fileName,
        content_version: contentVersion,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      }, { onConflict: 'report_slug,user_id,language' });

    // Create signed URL
    const { data: signedUrl } = await supabaseClient.storage
      .from('insight-pdfs')
      .createSignedUrl(fileName, 3600);

    // Log download
    await supabaseClient.from('pdf_downloads').insert({
      report_slug: reportId,
      user_id: user.id,
      user_email: user.email,
      user_company: userProfile.company,
      language,
    });

    logStep("PDF generated successfully", { fileName });

    return new Response(
      JSON.stringify({
        pdfUrl: signedUrl?.signedUrl,
        cached: false,
        message: language === 'ja' 
          ? 'PDFを生成しました。ブラウザの印刷機能でPDFとして保存できます。'
          : 'PDF generated. Use your browser\'s print function to save as PDF.',
        // Note: This returns an HTML file that can be printed to PDF
        // For production, integrate with a PDF generation service
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    logStep("Error", { error: error instanceof Error ? error.message : String(error) });
    return new Response(
      JSON.stringify({ 
        error: "PDFのダウンロードに失敗しました。しばらくしてから再度お試しください。",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
