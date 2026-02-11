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
  senderName: "WaLens Editorial Team",
  senderEmail: "contact@walensnews.com",
  logoUrl: "https://walensnews.com/assets/walens-magnifier.png",
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

    let linkData;
    let linkError;

    // Try signup link first
    const signupResult = await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email,
      options: { redirectTo: BRAND.siteUrl },
    });

    if (signupResult.error?.code === "email_exists") {
      console.log("User already exists, generating magiclink for confirmation");
      const magicResult = await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email,
        options: { redirectTo: BRAND.siteUrl },
      });
      linkData = magicResult.data;
      linkError = magicResult.error;
    } else {
      linkData = signupResult.data;
      linkError = signupResult.error;
    }

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
    const greetingLine = userName ? `Dear ${userName},` : "Hello,";

    const subject = "WaLens \u2013 Please confirm your email address";

    const emailHtml = buildEmailHtml({ confirmUrl, greetingLine, email });
    const emailText = buildPlainText({ confirmUrl, greetingLine, email });

    const emailResponse = await resend.emails.send({
      from: `${BRAND.senderName} <${BRAND.senderEmail}>`,
      to: [email],
      subject,
      html: emailHtml,
      text: emailText,
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
  greetingLine,
  email,
}: {
  confirmUrl: string;
  greetingLine: string;
  email: string;
}) {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Confirm Your Email \u2013 ${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding:28px 32px 20px 32px;border-bottom:1px solid #eeeeee;">
              <img src="${BRAND.logoUrl}" alt="${BRAND.name} Logo" width="36" height="36" style="display:block;width:36px;height:36px;border:0;object-fit:contain;" />
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:36px 32px;">
              <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#333333;">${greetingLine}</p>
              <p style="margin:0 0 8px 0;font-size:15px;line-height:1.7;color:#555555;">
                WaLensへのご登録ありがとうございます。下記のボタンをクリックして、メールアドレスの確認を完了してください。
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#555555;">
                Thank you for signing up with ${BRAND.name}. Please confirm your email address to activate your account.
              </p>

              <!-- CTA BUTTON -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:4px 0 28px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${confirmUrl}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="13%" fillcolor="#1a1a2e" stroke="false">
                    <center style="font-size:15px;font-weight:600;color:#ffffff;">Confirm Email Address</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${confirmUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background-color:#1a1a2e;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 40px;border-radius:6px;line-height:1;">
                      Confirm Email Address
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px 0;font-size:13px;color:#999999;">
                If the button does not work, copy and paste this link into your browser:<br>
                <a href="${confirmUrl}" style="color:#3b82f6;text-decoration:underline;word-break:break-all;font-size:12px;">${confirmUrl}</a>
              </p>

              <p style="margin:0;font-size:13px;color:#999999;">
                本メールに心当たりがない場合は、操作は不要です。<br>
                If you did not sign up for ${BRAND.name}, no action is required.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#f8f9fa;padding:20px 32px;border-top:1px solid #eeeeee;">
              <p style="margin:0 0 4px 0;font-size:12px;color:#999999;">This email was sent to ${email}.</p>
              <p style="margin:0;font-size:12px;color:#999999;">&copy; ${year} ${BRAND.name} Editorial Team &middot; <a href="${BRAND.siteUrl}" style="color:#999999;text-decoration:none;">walensnews.com</a></p>
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
  greetingLine,
  email,
}: {
  confirmUrl: string;
  greetingLine: string;
  email: string;
}) {
  const year = new Date().getFullYear();

  return `${greetingLine}

WaLensへのご登録ありがとうございます。以下のリンクをクリックして、メールアドレスの確認を完了してください。

Thank you for signing up with ${BRAND.name}. Please confirm your email address to activate your account.

Confirm Email Address / メール確認: ${confirmUrl}

本メールに心当たりがない場合は、操作は不要です。
If you did not sign up for ${BRAND.name}, no action is required.

--------------------------------------
This email was sent to ${email}.
© ${year} ${BRAND.name} Editorial Team
${BRAND.siteUrl}`;
}

serve(handler);
