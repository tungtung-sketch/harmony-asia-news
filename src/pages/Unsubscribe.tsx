import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { MailX, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Unsubscribe = () => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError(isJapanese ? '有効なメールアドレスを入力してください。' : 'Please enter a valid email address.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      // Unsubscribe requests are handled manually by the WaLens team via contact@walensnews.com.
      const { error: fnError } = await supabase.functions.invoke("contact-form", {
        body: {
          email: trimmed,
          message: `UNSUBSCRIBE REQUEST — Daily Executive Briefing\n\nPlease stop sending the Daily Executive Briefing to: ${trimmed}\n\nSubmitted via walensnews.com/unsubscribe (${isJapanese ? 'JA' : 'EN'}).`,
        },
      });
      if (fnError) throw fnError;
      setDone(true);
    } catch (err) {
      console.error("Unsubscribe request error:", err);
      setError(isJapanese
        ? '送信できませんでした。お手数ですが contact@walensnews.com まで直接ご連絡ください。'
        : 'We could not send your request. Please email contact@walensnews.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={isJapanese ? '配信停止 | WaLens' : 'Unsubscribe | WaLens'}
        description={isJapanese
          ? 'WaLens 日刊エグゼクティブ・ブリーフィングの配信停止手続き'
          : 'Stop receiving the WaLens Daily Executive Briefing.'}
        canonicalPath="/unsubscribe"
        noIndex
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {done
                    ? <CheckCircle className="w-8 h-8 text-primary" />
                    : <MailX className="w-8 h-8 text-primary" />}
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">
                {done
                  ? (isJapanese ? '配信停止のご依頼を受け付けました' : 'Your request has been received')
                  : (isJapanese ? '配信停止' : 'Unsubscribe')}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {done
                  ? (isJapanese
                    ? '2営業日以内に日刊エグゼクティブ・ブリーフィングの配信を停止いたします。その間にお届けするメールがある場合がございますので、ご了承ください。'
                    : 'We will stop sending the Daily Executive Briefing within 2 business days. You may receive an email in the meantime.')
                  : (isJapanese
                    ? '日刊エグゼクティブ・ブリーフィングの配信を停止します。配信先のメールアドレスを入力してください。'
                    : 'Stop receiving the Daily Executive Briefing. Enter the email address it is sent to.')}
              </p>
            </div>

            {done ? (
              <div className="text-center">
                <Button asChild variant="outline">
                  <Link to="/">{isJapanese ? 'ホームへ戻る' : 'Back to Home'}</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isJapanese ? 'メールアドレス' : 'Email address'}
                  aria-label={isJapanese ? 'メールアドレス' : 'Email address'}
                  required
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isJapanese ? '配信を停止する' : 'Unsubscribe'}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {isJapanese
                    ? '有料プランの解約はマイページの「Subscription」から行えます。'
                    : 'To cancel a paid plan, use the Subscription section on My Page.'}
                </p>
              </form>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Unsubscribe;
