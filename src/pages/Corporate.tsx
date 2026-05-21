import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Corporate = () => {
  const { lang } = useI18n();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    contact_email: '',
    industry: '',
    team_size: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Bangkok' });
      const messageBody = [
        '【WaLens 法人プラン お問い合わせ】',
        '',
        `会社名: ${form.company_name}`,
        `担当者名: ${form.contact_name}`,
        `メールアドレス: ${form.contact_email}`,
        `業種: ${form.industry}`,
        `チーム人数: ${form.team_size}`,
        `メッセージ: ${form.message}`,
        '',
        `送信日時: ${timestamp} (ICT)`,
      ].join('\n');

      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          email: form.contact_email,
          message: messageBody,
        },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (error: any) {
      console.error('Corporate inquiry error:', error);
      toast({
        description:
          lang === 'ja'
            ? '送信に失敗しました。もう一度お試しください。'
            : 'Failed to send. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const included = [
    {
      icon: '📧',
      ja: '毎朝JP+ENニュースレター（全員）',
      en: 'Daily JP+EN newsletter for all seats',
    },
    {
      icon: '📞',
      ja: '月次戦略ブリーフィングコール（日本語・30分）',
      en: 'Monthly JP strategy briefing call (30 min)',
    },
    {
      icon: '📚',
      ja: '過去レポート全アーカイブアクセス',
      en: 'Full archive access',
    },
    {
      icon: '⚡',
      ja: 'メール優先サポート（2営業日以内）',
      en: 'Priority email support (within 2 business days)',
    },
    {
      icon: '➕',
      ja: 'オプション：コーチングプラン追加可',
      en: 'Optional coaching add-on available',
    },
  ];

  const faqs = [
    {
      q: {
        ja: 'ChatGPTやNikkei Asiaとどう違うのですか？',
        en: 'How is this different from ChatGPT or Nikkei Asia?',
      },
      a: {
        ja: 'WaLensは、タイ現地5年以上の経営コンサルタントが毎日手動で厳選した情報をお届けします。ChatGPTは過去データを参照しますが、WaLensはタイの今日の動向を、日系企業の視点で解釈した実務的なインサイトです。',
        en: 'WaLens is curated daily by a Thailand-based management consultant with 5+ years experience. Every item is filtered through the lens of what Japanese subsidiary managers need to act on today — not generic AI-generated summaries.',
      },
    },
    {
      q: {
        ja: '社内稟議は必要ですか？',
        en: 'Do we need headquarters approval?',
      },
      a: {
        ja: '150,000 THB/年は、多くの日系子会社GM様の裁量支出枠内に収まります。東京本社の承認なしにご導入いただけるケースがほとんどです。',
        en: "At 150,000 THB/year, this typically falls within a Japanese subsidiary GM's discretionary spending authority. Most clients do not require Tokyo HQ approval.",
      },
    },
    {
      q: {
        ja: '法人契約はどのように行われますか？',
        en: 'How does the corporate contract work?',
      },
      a: {
        ja: 'タイの正式な税務インボイスを発行いたします。年払い、会社名での請求書発行に対応しています。',
        en: 'We issue a Thai tax invoice in your company name. Annual payment with a formal invoice for your accounts.',
      },
    },
  ];

  const industries = [
    { value: 'automotive',    ja: '自動車',    en: 'Automotive' },
    { value: 'energy',        ja: 'エネルギー', en: 'Energy' },
    { value: 'finance',       ja: '金融',      en: 'Finance' },
    { value: 'logistics',     ja: '物流',      en: 'Logistics' },
    { value: 'manufacturing', ja: '製造業',    en: 'Manufacturing' },
    { value: 'trading',       ja: '商社',      en: 'Trading' },
    { value: 'other',         ja: 'その他',    en: 'Other' },
  ];

  return (
    <>
      <SEO
        title={lang === 'ja' ? '法人プラン — WaLens' : 'Corporate Plan — WaLens'}
        description={
          lang === 'ja'
            ? 'チーム全員でタイの市場動向を把握する法人向けプラン。月次ブリーフィングコール付き。'
            : 'Corporate intelligence plan for Japanese executives managing teams in Thailand.'
        }
        canonicalPath="/corporate"
      />
      <div className="min-h-screen bg-background">
        <Header />

        {/* ── HERO (always dark) ── */}
        <section
          className="relative py-20 md:py-28 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, hsl(222,47%,6%) 0%, hsl(222,47%,9%) 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/10 text-white/80 mb-6">
                {lang === 'ja' ? '法人向け' : 'For Teams'}
              </span>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                style={{ wordBreak: 'keep-all' }}
              >
                {lang === 'ja'
                  ? '法人向けプラン — チーム全員でタイの市場動向を把握する'
                  : 'Corporate Plan — Strategic intelligence for your entire Thailand team'}
              </h1>
              <p className="text-lg text-white/70 mb-10">
                {lang === 'ja'
                  ? '日系企業のタイ拠点チームが、毎日の経営判断を自信を持って行えるように。'
                  : 'Empower your Japan-affiliated Thailand office to make confident daily business decisions.'}
              </p>
              <Button
                size="lg"
                className="text-base px-8 py-6 font-semibold bg-white text-[hsl(222,47%,6%)] hover:bg-white/90"
                onClick={scrollToInquiry}
              >
                {lang === 'ja' ? '資料請求・お問い合わせ' : 'Request Information'}
              </Button>
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="py-16 md:py-20 bg-muted/20 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                {lang === 'ja' ? '法人プランに含まれるもの' : "What's included"}
              </h2>
              <ul className="space-y-5">
                {included.map((item) => (
                  <li key={item.en} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <span
                      className="text-base font-medium text-foreground"
                      style={{ wordBreak: 'keep-all' }}
                    >
                      {lang === 'ja' ? item.ja : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              {lang === 'ja' ? '料金プラン' : 'Pricing'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

              {/* Card 1 — Intelligence Plan */}
              <Card className="bg-card border-border flex flex-col">
                <CardContent className="p-8 flex flex-col flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    {lang === 'ja' ? 'インテリジェンスプラン' : 'Intelligence Plan'}
                  </p>

                  <div className="mb-3 space-y-1">
                    <p className="text-xs text-muted-foreground/50 line-through">
                      {lang === 'ja'
                        ? '5名の個人プランの場合: ฿6,495/月'
                        : '5 individual plans: ฿6,495/month'}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                      {lang === 'ja' ? '法人プランなら:' : 'Corporate plan:'}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="text-3xl font-bold text-foreground">
                      ฿500
                      <span className="text-sm font-normal text-muted-foreground">
                        {lang === 'ja' ? '/席/月' : '/seat/month'}
                      </span>
                    </p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                      {lang === 'ja' ? '約62%お得' : 'save ~62%'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    {lang === 'ja'
                      ? '฿150,000/年（5席）— 合計 ฿2,500/月'
                      : '฿150,000/year (5 seats) — ฿2,500/month total'}
                  </p>

                  <div className="flex-1" />
                  <Button
                    variant="outline"
                    className="w-full font-semibold mt-6"
                    onClick={scrollToInquiry}
                  >
                    {lang === 'ja' ? 'お問い合わせ' : 'Contact us'}
                  </Button>
                </CardContent>
              </Card>

              {/* Card 2 — Bundle (Recommended) */}
              <div className="relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white"
                    style={{ background: '#00BCD4' }}
                  >
                    {lang === 'ja' ? 'おすすめ' : 'Recommended'}
                  </span>
                </div>
                <Card className="border-[#00BCD4]/50 bg-card flex flex-col h-full shadow-[0_0_0_1px_rgba(0,188,212,0.15),0_4px_24px_rgba(0,188,212,0.08)]">
                  <CardContent className="p-8 flex flex-col flex-1 mt-3">
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-4"
                      style={{ color: '#00BCD4' }}
                    >
                      {lang === 'ja'
                        ? 'インテリジェンス＋コーチングセット'
                        : 'Intelligence + Coaching Bundle'}
                    </p>

                    <div className="mb-3 space-y-1">
                      <p className="text-xs text-muted-foreground/50 line-through">
                        {lang === 'ja'
                          ? '5名の個人プランの場合: ฿6,495/月'
                          : '5 individual plans: ฿6,495/month'}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        {lang === 'ja' ? '法人プランなら:' : 'Corporate plan:'}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-3 mb-1">
                      <p className="text-3xl font-bold text-foreground">
                        ฿1,000
                        <span className="text-sm font-normal text-muted-foreground">
                          {lang === 'ja' ? '/席/月' : '/seat/month'}
                        </span>
                      </p>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
                        {lang === 'ja' ? '約23%お得' : 'save ~23%'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {lang === 'ja'
                        ? '฿60,000/年（5席）— 合計 ฿5,000/月'
                        : '฿60,000/year (5 seats) — ฿5,000/month total'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {lang === 'ja'
                        ? '稟議不要。GM決裁枠内でご導入いただけます。'
                        : 'No HQ approval needed — fits within GM discretionary authority.'}
                    </p>

                    <div className="flex-1" />
                    <Button
                      className="w-full font-semibold text-white border-0 mt-6"
                      style={{ background: 'linear-gradient(to right, #00BCD4, #26C6DA)' }}
                      onClick={scrollToInquiry}
                    >
                      {lang === 'ja' ? 'お問い合わせ' : 'Contact us'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 md:py-20 bg-muted/20 border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                {lang === 'ja' ? 'よくある質問' : 'FAQ'}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger
                      className="text-left font-semibold text-foreground py-5 hover:no-underline"
                      style={{ wordBreak: 'keep-all' }}
                    >
                      {lang === 'ja' ? faq.q.ja : faq.q.en}
                    </AccordionTrigger>
                    <AccordionContent
                      className="text-muted-foreground pb-5 leading-relaxed"
                      style={{ wordBreak: 'keep-all' }}
                    >
                      {lang === 'ja' ? faq.a.ja : faq.a.en}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── INQUIRY FORM ── */}
        <section id="inquiry" className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                {lang === 'ja' ? '資料請求・お問い合わせ' : 'Request Information'}
              </h2>

              {submitted ? (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="text-lg font-semibold text-foreground">
                    {lang === 'ja'
                      ? 'お問い合わせありがとうございます。2営業日以内にご連絡いたします。'
                      : 'Thank you. We will be in touch within 2 business days.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="space-y-1.5">
                    <Label htmlFor="company_name">
                      {lang === 'ja' ? '会社名' : 'Company name'}{' '}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="company_name"
                      required
                      value={form.company_name}
                      onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                      placeholder={lang === 'ja' ? '会社名' : 'Company name'}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact_name">
                      {lang === 'ja' ? 'ご担当者名' : 'Contact name'}{' '}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact_name"
                      required
                      value={form.contact_name}
                      onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                      placeholder={lang === 'ja' ? 'ご担当者名' : 'Contact name'}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact_email">
                      {lang === 'ja' ? 'メールアドレス' : 'Email address'}{' '}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact_email"
                      type="email"
                      required
                      value={form.contact_email}
                      onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                      placeholder={lang === 'ja' ? 'メールアドレス' : 'Email address'}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="industry">
                      {lang === 'ja' ? '業種' : 'Industry'}
                    </Label>
                    <Select onValueChange={(v) => setForm({ ...form, industry: v })}>
                      <SelectTrigger id="industry">
                        <SelectValue
                          placeholder={lang === 'ja' ? '業種を選択' : 'Select industry'}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value}>
                            {lang === 'ja' ? ind.ja : ind.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="team_size">
                      {lang === 'ja' ? 'チーム人数' : 'Team size'}
                    </Label>
                    <Input
                      id="team_size"
                      value={form.team_size}
                      onChange={(e) => setForm({ ...form, team_size: e.target.value })}
                      placeholder={lang === 'ja' ? 'チーム人数' : 'Team size'}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">
                      {lang === 'ja' ? 'メッセージ（任意）' : 'Message (optional)'}
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={lang === 'ja' ? 'メッセージ（任意）' : 'Message (optional)'}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full font-semibold text-base" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {lang === 'ja' ? '送信中...' : 'Sending...'}
                      </>
                    ) : (
                      lang === 'ja' ? '送信する' : 'Submit'
                    )}
                  </Button>

                </form>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Corporate;
