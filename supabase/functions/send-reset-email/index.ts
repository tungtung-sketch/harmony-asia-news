import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BRAND = {
  name: "WaLens",
  siteUrl: "https://walens.lovable.app",
  supportEmail: "contact@walensnews.com",
  senderName: "WaLens Editorial Team",
  senderEmail: "contact@walensnews.com",
  logoUrl: "https://qyqssdzhwhwagdhxxews.supabase.co/storage/v1/object/public/lovable-uploads/WaLen_Logo_magnifier_inverted.png",
};

interface ResetRequest {
  email: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, language }: ResetRequest = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Generating recovery link for:", email);

    // Use Supabase Admin API to generate the recovery link
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${BRAND.siteUrl}/reset-password`,
      },
    });

    if (linkError) {
      console.error("Failed to generate recovery link:", linkError);
      // Don't reveal whether the email exists — always return success to the client
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // The generated link contains the token — extract and build the proper link
    // linkData.properties.action_link has the full verification URL
    const resetUrl = linkData.properties?.action_link || `${BRAND.siteUrl}/reset-password`;

    // Try to get user's name from profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("email", email)
      .maybeSingle();

    const userName = profile?.full_name || null;
    const isJa = language === "ja";

    const subject = isJa
      ? `${BRAND.name} | パスワードリセットのご案内`
      : `${BRAND.name} | Password Reset Request`;

    const greeting = userName
      ? isJa ? `${userName} 様` : `Dear ${userName},`
      : isJa ? "お客様" : "Hello,";

    const emailHtml = buildEmailHtml({ resetUrl, greeting, isJa });

    const emailResponse = await resend.emails.send({
      from: `${BRAND.senderName} <${BRAND.senderEmail}>`,
      to: [email],
      subject,
      html: emailHtml,
      text: buildPlainText({ resetUrl, greeting, isJa }),
    });

    console.log("Reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-reset-email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

function buildEmailHtml({
  resetUrl,
  greeting,
  isJa,
}: {
  resetUrl: string;
  greeting: string;
  isJa: boolean;
}) {
  return `<!DOCTYPE html>
<html lang="${isJa ? "ja" : "en"}" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${isJa ? "パスワードリセット" : "Password Reset"} — ${BRAND.name}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#0f172a;padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="120" height="36" style="display:block;height:36px;width:auto;border:0;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                      ${isJa ? "パスワードリセットのご案内" : "Password Reset Request"}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#ffffff;padding:32px 32px 24px 32px;">
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1e293b;">
                ${greeting}
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#475569;">
                ${isJa
                  ? `${BRAND.name}アカウントのパスワードリセットリクエストを受け付けました。以下のボタンをクリックして、新しいパスワードを設定してください。`
                  : `We received a request to reset the password associated with your ${BRAND.name} account. Click the button below to set a new password.`}
              </p>

              <!-- CTA BUTTON -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:8px 0 32px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${resetUrl}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="13%" fillcolor="#0f172a" stroke="false">
                    <w:anchorlock/>
                    <center style="font-size:15px;font-weight:600;color:#ffffff;">
                    ${isJa ? "パスワードをリセット" : "Reset Password"}
                    </center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:6px;line-height:1;mso-hide:all;">
                      ${isJa ? "パスワードをリセット" : "Reset Password"}
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- FALLBACK LINK -->
              <p style="margin:0 0 8px 0;font-size:13px;color:#94a3b8;">
                ${isJa
                  ? "ボタンが表示されない場合は、以下のリンクをブラウザにコピー＆ペーストしてください："
                  : "If the button above does not work, copy and paste this link into your browser:"}
              </p>
              <p style="margin:0 0 24px 0;font-size:12px;word-break:break-all;color:#3b82f6;">
                <a href="${resetUrl}" style="color:#3b82f6;text-decoration:underline;">${resetUrl}</a>
              </p>

              <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

              <!-- EXPIRY NOTE -->
              <p style="margin:0 0 8px 0;font-size:13px;color:#94a3b8;">
                ${isJa ? "このリンクは24時間有効です。" : "This link will expire in 24 hours."}
              </p>

              <!-- SECURITY DISCLAIMER -->
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                ${isJa
                  ? "パスワードリセットをリクエストした覚えがない場合は、このメールを無視してください。アカウントのパスワードは変更されません。"
                  : "If you did not request a password reset, please ignore this email. Your account password will remain unchanged."}
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:#64748b;">
                      ${BRAND.senderName}
                    </p>
                    <p style="margin:0 0 2px 0;font-size:12px;color:#94a3b8;">
                      <a href="${BRAND.siteUrl}" style="color:#94a3b8;text-decoration:none;">${BRAND.siteUrl.replace("https://", "")}</a>
                    </p>
                    <p style="margin:0;font-size:12px;color:#94a3b8;">
                      <a href="mailto:${BRAND.supportEmail}" style="color:#94a3b8;text-decoration:none;">${BRAND.supportEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <p style="margin:0;font-size:11px;color:#cbd5e1;">
                      © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildPlainText({
  resetUrl,
  greeting,
  isJa,
}: {
  resetUrl: string;
  greeting: string;
  isJa: boolean;
}) {
  if (isJa) {
    return `${greeting}

${BRAND.name}アカウントのパスワードリセットリクエストを受け付けました。

以下のリンクをクリックして、新しいパスワードを設定してください：
${resetUrl}

このリンクは24時間有効です。

パスワードリセットをリクエストした覚えがない場合は、このメールを無視してください。

---
${BRAND.senderName}
${BRAND.siteUrl}
${BRAND.supportEmail}
© ${new Date().getFullYear()} ${BRAND.name}`;
  }

  return `${greeting}

We received a request to reset the password for your ${BRAND.name} account.

Click the link below to set a new password:
${resetUrl}

This link will expire in 24 hours.

If you did not request a password reset, please ignore this email. Your account password will remain unchanged.

---
${BRAND.senderName}
${BRAND.siteUrl}
${BRAND.supportEmail}
© ${new Date().getFullYear()} ${BRAND.name}`;
}

serve(handler);
