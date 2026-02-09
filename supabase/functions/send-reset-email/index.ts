import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResetEmailRequest {
  email: string;
  resetUrl: string;
  language: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Reset email request received:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetUrl, language }: ResetEmailRequest = await req.json();
    console.log("Processing reset email for:", email, "Language:", language);

    const isJapanese = language === 'ja';
    
    const subject = isJapanese 
      ? "パスワードリセットのご案内 | WaLen" 
      : "Reset Your Password | WaLen";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f5f7;">
        
        <!-- Dark header banner -->
        <div style="background-color: hsl(221, 39%, 11%); padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <img src="https://qyqssdzhwhwagdhxxews.supabase.co/storage/v1/object/public/lovable-uploads/WaLen_Logo_magnifier_inverted.png" alt="WaLens" style="height: 40px; margin-bottom: 12px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
            ${isJapanese ? 'パスワードリセットのご案内' : 'Password Reset'}
          </h1>
          <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0 0; font-size: 13px; font-style: italic;">
            ${isJapanese ? '日本語とグローバル視点のASEANビジネス情報' : 'For Japanese & global executives in Thailand'}
          </p>
        </div>
        
        <!-- Content area -->
        <div style="background: #ffffff; padding: 32px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <p style="margin: 0 0 16px 0; color: #1e293b; font-size: 15px;">
            ${isJapanese ? 'こんにちは、' : 'Hello,'}
          </p>
          
          <p style="margin: 0 0 24px 0; color: #64748b; font-size: 15px;">
            ${isJapanese 
              ? 'WaLenアカウントのパスワードリセットをご依頼いただきました。下記のボタンをクリックして、新しいパスワードを設定してください。' 
              : 'We received a request to reset your WaLen account password. Click the button below to set a new password.'}
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; background: hsl(221, 39%, 11%); color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; letter-spacing: 0.3px;">
              ${isJapanese ? 'パスワードをリセット' : 'Reset Password'}
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          
          <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 13px;">
            ${isJapanese 
              ? 'このリンクは24時間有効です。' 
              : 'This link will expire in 24 hours.'}
          </p>
          <p style="margin: 0; color: #94a3b8; font-size: 13px;">
            ${isJapanese 
              ? 'パスワードリセットをご依頼でない場合は、このメールを無視してください。' 
              : 'If you did not request a password reset, please ignore this email.'}
          </p>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px 32px;">
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">
            © ${new Date().getFullYear()} WaLens. All rights reserved.
          </p>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "WaLen - editor team <contact@walensnews.com>",
      to: [email],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-reset-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
