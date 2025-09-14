import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetUrl, language }: ResetEmailRequest = await req.json();
    console.log("Processing reset email for:", email, "Language:", language);

    const isJapanese = language === 'ja';
    
    const subject = isJapanese 
      ? "パスワードリセットのご案内" 
      : "Reset Your Password";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <img src="https://qyqssdzhwhwagdhxxews.supabase.co/storage/v1/object/public/lovable-uploads/Harmony_Logo_only.png" alt="Harmony" style="height: 60px; margin-bottom: 10px;">
          <p style="color: #666; margin: 0; font-size: 14px;">${isJapanese ? 'Harmonize the global business' : 'Harmonize the global business'}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <h1 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">
            ${isJapanese ? 'パスワードリセットのご案内' : 'Reset Your Password'}
          </h1>
          
          <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px;">
            ${isJapanese 
              ? 'Harmonyアカウントのパスワードリセットをご希望の旨、承りました。下記のボタンをクリックして、新しいパスワードを設定してください。' 
              : 'We received a request to reset your Harmony account password. Click the button below to set a new password.'}
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, hsl(221, 39%, 11%), hsl(221, 39%, 25%)); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 16px;">
              ${isJapanese ? 'パスワードをリセット' : 'Reset Password'}
            </a>
          </div>
          
          <p style="margin: 20px 0 0 0; color: #64748b; font-size: 14px;">
            ${isJapanese 
              ? 'このリンクは24時間有効です。パスワードリセットをご希望でない場合は、このメールを無視してください。' 
              : 'This link will expire in 24 hours. If you did not request a password reset, please ignore this email.'}
          </p>
        </div>
        
        <div style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 40px;">
          <p style="margin: 0;">
            ${isJapanese 
              ? '© 2024 Harmony. All rights reserved.' 
              : '© 2024 Harmony. All rights reserved.'}
          </p>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Harmony <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
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