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

// Generate PDF HTML for browser printing
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
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }
    
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Meiryo', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 11pt;
      line-height: 1.7;
      color: #1a1a1a;
      margin: 0;
      padding: 20px;
      background: white;
    }
    
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 42pt;
      color: rgba(200, 200, 200, 0.12);
      white-space: nowrap;
      pointer-events: none;
      z-index: 1000;
      user-select: none;
    }
    
    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: #1a365d;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14pt;
      font-weight: bold;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .print-button:hover {
      background: #2d4a7c;
    }
    
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 85vh;
      text-align: center;
      padding: 40px;
      border-bottom: 3px solid #d69e2e;
      margin-bottom: 40px;
    }
    
    .cover-logo {
      font-size: 28pt;
      font-weight: bold;
      color: #1a365d;
      margin-bottom: 50px;
    }
    
    .cover-title {
      font-size: 26pt;
      font-weight: bold;
      color: #1a365d;
      margin-bottom: 20px;
      line-height: 1.3;
      max-width: 600px;
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
      padding: 10px 30px;
      border-radius: 25px;
      font-weight: bold;
      margin-bottom: 40px;
      display: inline-block;
    }
    
    .section {
      margin-bottom: 35px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 16pt;
      font-weight: bold;
      color: #1a365d;
      border-bottom: 2px solid #d69e2e;
      padding-bottom: 10px;
      margin-bottom: 18px;
    }
    
    .executive-summary {
      background: #f8fafc;
      border-left: 4px solid #d69e2e;
      padding: 25px;
      margin-bottom: 35px;
      border-radius: 0 8px 8px 0;
    }
    
    .summary-item {
      margin-bottom: 14px;
      padding-left: 25px;
      position: relative;
      line-height: 1.6;
    }
    
    .summary-item::before {
      content: "▸";
      position: absolute;
      left: 0;
      color: #d69e2e;
      font-weight: bold;
    }
    
    .section-content {
      line-height: 1.8;
    }
    
    .section-content strong {
      color: #1a365d;
    }
    
    .sources-list {
      font-size: 10pt;
      color: #666;
    }
    
    .sources-list div {
      margin-bottom: 6px;
    }
    
    .disclaimer {
      font-size: 9pt;
      color: #888;
      border-top: 1px solid #ddd;
      padding-top: 25px;
      margin-top: 45px;
      line-height: 1.6;
    }
    
    .citation-box {
      background: #f0f9ff;
      border: 1px solid #bee3f8;
      padding: 25px;
      margin-top: 35px;
      border-radius: 8px;
    }
    
    .citation-title {
      font-weight: bold;
      margin-bottom: 12px;
      color: #2b6cb0;
      font-size: 12pt;
    }
    
    .footer-info {
      font-size: 9pt;
      color: #aaa;
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  `;

  const citationText = isJapanese
    ? `引用方法：WaLens（${new Date().getFullYear()}）『${content?.title || 'Report'}』WaLens株式会社`
    : `Citation: WaLens (${new Date().getFullYear()}), "${content?.title || 'Report'}", WaLens Co., Ltd.`;

  const printButtonText = isJapanese ? 'PDFとして保存' : 'Save as PDF';
  const printInstructions = isJapanese 
    ? 'このボタンをクリックし、印刷ダイアログで「PDFとして保存」を選択してください。'
    : 'Click this button and select "Save as PDF" in the print dialog.';

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content?.title || 'WaLens Report'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <style>${pageStyles}</style>
</head>
<body>
  <div class="watermark">${watermarkText}</div>
  
  <button class="print-button no-print" onclick="window.print()" title="${printInstructions}">
    🖨️ ${printButtonText}
  </button>
  
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
      <div class="section-content">${section.content}</div>
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
  
  <div class="footer-info">
    © ${new Date().getFullYear()} WaLens Co., Ltd. | ${userInfo} | ${timestamp}
  </div>
  
  <script>
    // Auto-focus print dialog on load for better UX
    window.onload = function() {
      // Give a small delay for the page to fully render
      setTimeout(function() {
        // Show a subtle hint that the page is ready
        document.querySelector('.print-button').style.animation = 'pulse 2s infinite';
      }, 500);
    };
  </script>
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

    // Generate the PDF HTML
    logStep("Generating PDF HTML");
    const pdfHtml = generatePdfHtml(reportContent, userProfile, language, watermarkText);

    // Log download
    await supabaseClient.from('pdf_downloads').insert({
      report_slug: reportId,
      user_id: user.id,
      user_email: user.email,
      user_company: userProfile.company,
      language,
    });

    logStep("PDF HTML generated successfully");

    // Return HTML content as base64 data URL for browser rendering
    const base64Html = btoa(unescape(encodeURIComponent(pdfHtml)));
    const dataUrl = `data:text/html;base64,${base64Html}`;

    return new Response(
      JSON.stringify({
        pdfUrl: dataUrl,
        htmlContent: pdfHtml,
        cached: false,
        message: language === 'ja' 
          ? '新しいタブでPDFプレビューが開きました。右上の「PDFとして保存」ボタンをクリックしてください。'
          : 'PDF preview opened in new tab. Click the "Save as PDF" button in the top-right corner.',
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
