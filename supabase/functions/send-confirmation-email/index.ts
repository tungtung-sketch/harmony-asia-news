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
  tagline: "Executive News & Decision-Ready Insights",
  subTagline: "For Japanese & global executives in Thailand",
};

interface ConfirmRequest {
  email: string;
  fullName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName }: ConfirmRequest = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Generating confirmation link for:", email);

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email,
      options: {
        redirectTo: BRAND.siteUrl,
      },
    });

    if (linkError) {
      console.error("Failed to generate confirmation link:", linkError);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    let confirmUrl = linkData.properties?.action_link || BRAND.siteUrl;

    // Force redirect_to to production URL
    if (confirmUrl.includes("redirect_to=")) {
      confirmUrl = confirmUrl.replace(
        /redirect_to=[^&]*/,
        `redirect_to=${encodeURIComponent(BRAND.siteUrl)}`
      );
    } else if (confirmUrl.includes("?")) {
      confirmUrl += `&redirect_to=${encodeURIComponent(BRAND.siteUrl)}`;
    }

    console.log("Generated confirmation URL (sanitized):", confirmUrl.substring(0, 100) + "...");

    const userName = fullName || null;
    const greetingJa = userName ? `${userName} 様` : "お客様";
    const greetingEn = userName ? `Dear ${userName},` : "Hello,";

    const subject = `${BRAND.name} | メールアドレス確認のお願い / Confirm Your Email Address`;

    const emailHtml = buildEmailHtml({ confirmUrl, greetingJa, greetingEn });

    const emailResponse = await resend.emails.send({
      from: `${BRAND.senderName} <${BRAND.senderEmail}>`,
      to: [email],
      subject,
      html: emailHtml,
      text: buildPlainText({ confirmUrl, greetingJa, greetingEn }),
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

function buildEmailHtml({
  confirmUrl,
  greetingJa,
  greetingEn,
}: {
  confirmUrl: string;
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
  <title>メールアドレス確認 / Confirm Email — ${BRAND.name}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans JP',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- HEADER — dark navy -->
          <tr>
            <td style="background-color:#0f172a;padding:28px 32px 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <a href="${BRAND.siteUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                      <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="44" height="44" style="display:inline-block;height:44px;width:44px;border:0;filter:invert(1);" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3;">${BRAND.name} – ${BRAND.tagline}</p>
                    <p style="margin:6px 0 0 0;font-size:13px;color:#94a3b8;line-height:1.4;">${BRAND.subTagline}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ==================== JAPANESE SECTION ==================== -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 32px 0 32px;">
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;">日本語</p>
              <h1 style="margin:0 0 22px 0;font-size:20px;font-weight:700;color:#0f172a;line-height:1.4;">メールアドレス確認のお願い</h1>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1e293b;">${greetingJa}</p>
              <p style="margin:0 0 8px 0;font-size:15px;line-height:1.7;color:#475569;">
                WaLensへのご登録ありがとうございます。
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#475569;">
                下記のボタンをクリックして、メールアドレスの確認を完了してください。<br>
                本メールは、お客様のアカウントの安全性を確保するためにお送りしています。
              </p>

              <!-- CTA JP -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:4px 0 24px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${confirmUrl}" style="height:48px;v-text-anchor:middle;width:280px;" arcsize="13%" fillcolor="#0f172a" stroke="false">
                    <w:anchorlock/>
                    <center style="font-size:15px;font-weight:600;color:#ffffff;">メールアドレスを確認する</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${confirmUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:6px;line-height:1;mso-hide:all;">
                      メールアドレスを確認する
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">ボタンが表示されない場合は、以下のリンクをブラウザにコピー＆ペーストしてください：</p>
              <p style="margin:0 0 20px 0;font-size:12px;word-break:break-all;"><a href="${confirmUrl}" style="color:#3b82f6;text-decoration:underline;">${confirmUrl}</a></p>

              <p style="margin:0 0 0 0;font-size:13px;color:#94a3b8;">本メールに心当たりがない場合は、操作は不要です。</p>
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
            <td style="background-color:#ffffff;padding:0 32px 36px 32px;">
              <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;">English</p>
              <h2 style="margin:0 0 22px 0;font-size:20px;font-weight:700;color:#0f172a;line-height:1.4;">Confirm Your Email Address</h2>
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#1e293b;">${greetingEn}</p>
              <p style="margin:0 0 8px 0;font-size:15px;line-height:1.7;color:#475569;">
                Thank you for signing up for WaLens.
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#475569;">
                Please confirm your email address by clicking the button below.<br>
                This step helps us ensure account security and deliver trusted executive-level insights.
              </p>

              <!-- CTA EN -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:4px 0 24px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${confirmUrl}" style="height:48px;v-text-anchor:middle;width:280px;" arcsize="13%" fillcolor="#0f172a" stroke="false">
                    <w:anchorlock/>
                    <center style="font-size:15px;font-weight:600;color:#ffffff;">Confirm Email Address</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${confirmUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:6px;line-height:1;mso-hide:all;">
                      Confirm Email Address
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">If the button above does not work, copy and paste this link into your browser:</p>
              <p style="margin:0 0 20px 0;font-size:12px;word-break:break-all;"><a href="${confirmUrl}" style="color:#3b82f6;text-decoration:underline;">${confirmUrl}</a></p>

              <p style="margin:0;font-size:13px;color:#94a3b8;">If you did not request this signup, no action is required.</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#64748b;">${BRAND.name} Editorial Team</p>
                    <p style="margin:0 0 4px 0;font-size:12px;color:#94a3b8;line-height:1.5;">
                      WaLens delivers curated business news and insights for decision-makers in Thailand.
                    </p>
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
                    <p style="margin:0;font-size:11px;color:#cbd5e1;">&copy; ${year} ${BRAND.name}. All rights reserved.</p>
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
  confirmUrl,
  greetingJa,
  greetingEn,
}: {
  confirmUrl: string;
  greetingJa: string;
  greetingEn: string;
}) {
  const year = new Date().getFullYear();

  return `[日本語]

${greetingJa}

WaLensへのご登録ありがとうございます。

以下のリンクをクリックして、メールアドレスの確認を完了してください：
${confirmUrl}

本メールに心当たりがない場合は、操作は不要です。

--------------------------------------

[English]

${greetingEn}

Thank you for signing up for WaLens.

Please confirm your email address by clicking the link below:
${confirmUrl}

If you did not request this signup, no action is required.

--------------------------------------
${BRAND.name} Editorial Team
${BRAND.siteUrl}
${BRAND.supportEmail}
© ${year} ${BRAND.name}`;
}

serve(handler);
