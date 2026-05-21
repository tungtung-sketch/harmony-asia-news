import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CorporateInquiryRequest {
  company_name: string;
  contact_name: string;
  contact_email: string;
  industry: string;
  team_size: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: CorporateInquiryRequest = await req.json();
    const { company_name, contact_name, contact_email, industry, team_size, message } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact_email || !emailRegex.test(contact_email)) {
      return new Response(
        JSON.stringify({ error: "A valid email address is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!company_name || !contact_name) {
      return new Response(
        JSON.stringify({ error: "Company name and contact name are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const escape = (s: string) =>
      String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const timestamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Bangkok" });

    // ── Admin notification ──
    const adminEmail = await resend.emails.send({
      from: "WaLens Corporate <contact@walensnews.com>",
      to: ["contact@walensnews.com"],
      replyTo: contact_email,
      subject: `【WaLens】新規法人問い合わせ: ${company_name}`,
      html: `
        <h2>新しい法人プランのお問い合わせが届きました。</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:140px">会社名</td><td style="padding:8px;border-bottom:1px solid #eee">${escape(company_name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">担当者名</td><td style="padding:8px;border-bottom:1px solid #eee">${escape(contact_name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">メールアドレス</td><td style="padding:8px;border-bottom:1px solid #eee">${escape(contact_email)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">業種</td><td style="padding:8px;border-bottom:1px solid #eee">${escape(industry)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">チーム人数</td><td style="padding:8px;border-bottom:1px solid #eee">${escape(team_size)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">メッセージ</td><td style="padding:8px;border-bottom:1px solid #eee">${escape(message).replace(/\n/g, "<br/>")}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">送信日時</td><td style="padding:8px">${timestamp} (ICT)</td></tr>
        </table>
      `,
    });

    if (adminEmail.error) throw new Error(adminEmail.error.message);

    // ── Confirmation to contact ──
    const confirmEmail = await resend.emails.send({
      from: "WaLens <contact@walensnews.com>",
      to: [contact_email],
      subject: "【WaLens】お問い合わせを承りました",
      html: `
        <p>${escape(contact_name)}様</p>
        <p>この度はWaLens法人プランにお問い合わせいただき、<br/>ありがとうございます。</p>
        <p>2営業日以内に担当者よりご連絡いたします。</p>
        <br/>
        <p>WaLens編集部<br/><a href="https://walensnews.com">walensnews.com</a></p>
      `,
    });

    if (confirmEmail.error) {
      // Log but don't fail — admin email already sent
      console.error("Confirmation email error:", confirmEmail.error);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in corporate-inquiry function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
