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
  siteUrl: "https://walensnews.com",
  supportEmail: "contact@walensnews.com",
  senderName: "WaLen - editor team",
  senderEmail: "contact@walensnews.com",
  logoUrl: "https://walensnews.com/assets/logo-email.png",
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
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    let resetUrl = linkData.properties?.action_link || `${BRAND.siteUrl}/reset-password`;
    
    // Fix: Supabase may embed the preview URL as redirect_to. Replace it with the production URL.
    if (resetUrl.includes('redirect_to=')) {
      resetUrl = resetUrl.replace(
        /redirect_to=[^&]*/,
        `redirect_to=${encodeURIComponent(`${BRAND.siteUrl}/reset-password`)}`
      );
    }

    // Get user name for personalization
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name")
      .eq("email", email)
      .maybeSingle();

    const userName = profile?.full_name || null;
    const greetingJa = userName ? `${userName} 様` : "お客様";
    const greetingEn = userName ? `Dear ${userName},` : "Hello,";

    const subject = `${BRAND.name} | パスワードリセットのご案内 / Password Reset Request`;

    const emailHtml = buildEmailHtml({ resetUrl, greetingJa, greetingEn });

    const emailResponse = await resend.emails.send({
      from: `${BRAND.senderName} <${BRAND.senderEmail}>`,
      to: [email],
      subject,
      html: emailHtml,
      text: buildPlainText({ resetUrl, greetingJa, greetingEn }),
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
  greetingJa,
  greetingEn,
}: {
  resetUrl: string;
  greetingJa: string;
  greetingEn: string;
}) {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="ja" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>パスワードリセット / Password Reset — ${BRAND.name}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#ffffff;padding:24px 32px;border-bottom:1px solid #e2e8f0;">
              <a href="${BRAND.siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="40" height="40" style="display:inline-block;height:40px;width:40px;border:0;" />
              </a>
            </td>
          </tr>

          <!-- ==================== JAPANESE SECTION ==================== -->
          <tr>
            <td style="background-color:#ffffff;padding:32px 32px 0 32px;">
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;">日本語</p>
              <h1 style="margin:0 0 20px 0;font-size:20px;font-weight:700;color:#0f172a;line-height:1.4;">パスワードリセットのご案内</h1>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1e293b;">${greetingJa}</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#475569;">
                ${BRAND.name}アカウントのパスワードリセットリクエストを受け付けました。<br>以下のボタンをクリックして、新しいパスワードを設定してください。
              </p>

              <!-- CTA JP -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:4px 0 24px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${resetUrl}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="13%" fillcolor="#0f172a" stroke="false">
                    <w:anchorlock/>
                    <center style="font-size:15px;font-weight:600;color:#ffffff;">パスワードをリセット</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:6px;line-height:1;mso-hide:all;">
                      パスワードをリセット
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">ボタンが表示されない場合は、以下のリンクをブラウザにコピー＆ペーストしてください：</p>
              <p style="margin:0 0 20px 0;font-size:12px;word-break:break-all;"><a href="${resetUrl}" style="color:#3b82f6;text-decoration:underline;">${resetUrl}</a></p>

              <p style="margin:0 0 4px 0;font-size:13px;color:#94a3b8;">このリンクは24時間有効です。</p>
              <p style="margin:0 0 0 0;font-size:13px;color:#94a3b8;">パスワードリセットをリクエストした覚えがない場合は、このメールを無視してください。アカウントのパスワードは変更されません。</p>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="background-color:#ffffff;padding:24px 32px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
            </td>
          </tr>

          <!-- ==================== ENGLISH SECTION ==================== -->
          <tr>
            <td style="background-color:#ffffff;padding:0 32px 32px 32px;">
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;">English</p>
              <h2 style="margin:0 0 20px 0;font-size:20px;font-weight:700;color:#0f172a;line-height:1.4;">Password Reset Request</h2>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1e293b;">${greetingEn}</p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#475569;">
                We received a request to reset the password associated with your ${BRAND.name} account.<br>Click the button below to set a new password.
              </p>

              <!-- CTA EN -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:4px 0 24px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${resetUrl}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="13%" fillcolor="#0f172a" stroke="false">
                    <w:anchorlock/>
                    <center style="font-size:15px;font-weight:600;color:#ffffff;">Reset Password</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:6px;line-height:1;mso-hide:all;">
                      Reset Password
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">If the button above does not work, copy and paste this link into your browser:</p>
              <p style="margin:0 0 20px 0;font-size:12px;word-break:break-all;"><a href="${resetUrl}" style="color:#3b82f6;text-decoration:underline;">${resetUrl}</a></p>

              <p style="margin:0 0 4px 0;font-size:13px;color:#94a3b8;">This link will expire in 24 hours.</p>
              <p style="margin:0;font-size:13px;color:#94a3b8;">If you did not request a password reset, please ignore this email. Your account password will remain unchanged.</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:#64748b;">${BRAND.name} Editorial Team</p>
                    <p style="margin:0 0 2px 0;font-size:12px;color:#94a3b8;">
                      <a href="${BRAND.siteUrl}" style="color:#94a3b8;text-decoration:none;">walensnews.com</a>
                    </p>
                    <p style="margin:0;font-size:12px;color:#94a3b8;">
                      <a href="mailto:${BRAND.supportEmail}" style="color:#94a3b8;text-decoration:none;">${BRAND.supportEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <p style="margin:0;font-size:11px;color:#cbd5e1;">© ${year} ${BRAND.name}. All rights reserved.</p>
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
  greetingJa,
  greetingEn,
}: {
  resetUrl: string;
  greetingJa: string;
  greetingEn: string;
}) {
  const year = new Date().getFullYear();

  return `[日本語]

${greetingJa}

${BRAND.name}アカウントのパスワードリセットリクエストを受け付けました。

以下のリンクをクリックして、新しいパスワードを設定してください：
${resetUrl}

このリンクは24時間有効です。
パスワードリセットをリクエストした覚えがない場合は、このメールを無視してください。

--------------------------------------

[English]

${greetingEn}

We received a request to reset the password for your ${BRAND.name} account.

Click the link below to set a new password:
${resetUrl}

This link will expire in 24 hours.
If you did not request a password reset, please ignore this email.

--------------------------------------
${BRAND.name} Editorial Team
${BRAND.siteUrl}
${BRAND.supportEmail}
© ${year} ${BRAND.name}`;
}

serve(handler);
