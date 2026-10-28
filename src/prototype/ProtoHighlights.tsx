// PROTOTYPE ONLY — this file exists only on the prototype/archive-daily-news branch.
// It highlights in yellow every piece of wording changed by the "archive daily news" work,
// and shows a floating panel listing all changes. It must never be merged to main.
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CHANGED_STRINGS: string[] = [
  "WaLens provides market insights, analysis reports, and resources to support international executives and companies operating globally. Service offerings vary by subscription plan (Basic, Premium, Corporate).",
  "At WaLens, we are committed to protecting the privacy and personal information of our subscribers and visitors. This Privacy Policy explains how we collect, use, store, and protect your information.",
  "Welcome to WaLens. By accessing or using our website and subscription services, you agree to these Terms of Service. Please read them carefully before subscribing.",
  "A curated daily executive briefing and reports — delivering the local intelligence you need to make confident cross-border decisions.",
  "Early-warning signals on disruptions that could impact your business — before they become widely known.",
  "WaLens は、タイおよび東南アジアで事業を展開する国際的なビジネスリーダーに向けて、マーケットインサイト、分析レポート、ローカル知見を提供します。内容は契約プランにより異なります。",
  "WaLens は、利用者および購読者の個人情報を保護することを最優先に考えています。本プライバシーポリシーは、当社が収集・利用・保管する情報およびその保護方法について説明します。",
  "The more information you provide, the more relevant the insights we can provide to you.",
  "Strategic intelligence and insights for executives operating across Asia-Pacific.",
  "Includes the Daily Executive Briefing, basic market analysis, and website access.",
  "Your subscription has been successfully cancelled. Thank you for using WaLens.",
  "To provide insights, reports, and briefings according to your subscription.",
  "Curated daily briefing on local business developments and market updates.",
  "Daily curated local business briefing — not AI-generated, expert-selected",
  "All articles, insights, reports, and visuals are the property of WaLens.",
  "キュレーションされた日刊エグゼクティブ・ブリーフィングとエグゼクティブレポートで、クロスボーダー経営に必要な現地インテリジェンスをお届けします。",
  "Daily Local Business Intelligence & Reports for Global Decision-Makers.",
  "Learn how WaLens protects your privacy and personal information.",
  "本ウェブサイト WaLens をご利用いただくにあたり、本利用規約に同意いただく必要があります。ご利用前に必ずご確認ください。",
  "To personalize content and briefings for your business needs.",
  "provides curated business intelligence and strategic insights",
  "Daily briefing with deeper context and an executive summary.",
  "Terms of Service for WaLens subscription and website usage",
  "Create your account and start your subscription to WaLens",
  "Manage your subscription, profile, and access to WaLens",
  "Scan to subscribe to our free Daily Executive Briefing",
  "Full access to the website + Daily Executive Briefing",
  "5–7 curated business developments every morning",
  "サブスクリプションは正常に解約されました。WaLensをご利用いただきありがとうございました。",
  "日刊エグゼクティブ・ブリーフィング、基本的な市場分析、ウェブサイトへのアクセスが含まれます。",
  "Subscribe to our free Daily Executive Briefing",
  "Access to selected briefings and some analysis",
  "アジア太平洋で事業を展開する経営者のための戦略インテリジェンスとインサイトをお届けします。",
  "記事、インサイト、レポート、ビジュアル等のコンテンツはすべて WaLens に帰属します。",
  "To stay on top of local business developments",
  "Daily JP+EN Executive Briefing for all seats",
  "Full access to the Daily Executive Briefing",
  "WaLensがお客様のプライバシーと個人情報をどのように保護しているかをご説明します。",
  "Stop receiving the Daily Executive Briefing",
  "LINE公式アカウントをスキャンして無料の日刊エグゼクティブ・ブリーフィングを購読",
  "Daily Local Business Intelligence Digest",
  "rather than focusing on real-time alerts",
  "日刊キュレーション・ビジネスブリーフィング — AI生成ではなく、専門家が厳選",
  "Payment Successful – Welcome to WaLens!",
  "Search all past reports and briefings",
  "Is WaLens a real-time alert service?",
  "Daily briefing with curated insights",
  "より多くの情報を入力いただくと、より的確なインサイトをお届けできます。",
  "ビジネスニーズに合わせたコンテンツやブリーフィングのパーソナライズ",
  "日刊ブリーフィングに加え、背景分析とエグゼクティブサマリーを提供。",
  "ウェブサイトと日刊エグゼクティブ・ブリーフィングへのフルアクセス",
  "厳選されたビジネスインテリジェンスおよび戦略的インサイトを提供",
  "Daily JP+EN Executive Briefing",
  "Your Daily Executive Briefing",
  "ビジネスに影響し得る混乱の早期警告 — 広く知られる前に。",
  "現地ビジネスの動向と市場の最新情報を厳選し、毎日お届け。",
  "The Daily Executive Briefing",
  "Daily briefing to your inbox",
  "Payment Successful - WaLens",
  "Search insights, reports...",
  "日刊エグゼクティブ・ブリーフィングの配信を停止します",
  "現地ビジネスインテリジェンス＆レポートを毎日お届け。",
  "毎朝JP+ENエグゼクティブ・ブリーフィング（全員）",
  "日刊ローカルビジネス・インテリジェンスダイジェスト",
  "購読、プロフィール、WaLensへのアクセスを管理",
  "Terms of Service - WaLens",
  "Searchable report archive",
  "厳選されたブリーフィングと一部の分析へのアクセス",
  "Daily Executive Briefing",
  "WaLens購読およびウェブサイト利用の利用規約",
  "Privacy Policy - WaLens",
  "無料の日刊エグゼクティブ・ブリーフィングに登録",
  "アカウントを作成してWaLensの購読を開始",
  "決済が完了しました。WaLensへようこそ！",
  "毎日JP+ENエグゼクティブ・ブリーフィング",
  "過去の全レポート・ブリーフィングを検索可能",
  "インサイト、レポート、ブリーフィングの提供",
  "My Dashboard - WaLens",
  "プライバシーポリシー - WaLens",
  "タイのビジネス動向を常に把握するため",
  "Subscribe - WaLens",
  "日刊エグゼクティブ・ブリーフィング",
  "WaLensは速報サービスですか？",
  "My Page - WaLens",
  "Sign Up - WaLens",
  "インサイト、レポートを検索...",
  "サインアップ - WaLens",
  "Daily Briefing",
  "マイページ - WaLens",
  "毎朝の厳選トピック5〜7本",
  "利用規約 - WaLens",
  "View Insights",
  "決済完了 - WaLens",
  "購読 - WaLens",
  "レポートアーカイブ検索",
  "Join WaLens",
  "WaLensに参加",
  "日刊ブリーフィング",
  "インサイト一覧へ"
];

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const TARGETS = CHANGED_STRINGS.map(norm).filter(Boolean);

const matches = (text: string) => {
  const t = norm(text);
  if (!t) return false;
  return TARGETS.some(s => (s.length >= 12 ? t.includes(s.slice(0, 40)) : t === s));
};

const STYLE = `
.proto-changed { background: #fde047 !important; color: #111827 !important; outline: 2px solid #eab308; outline-offset: 1px; border-radius: 3px; }
.proto-changed * { color: #111827 !important; }
input.proto-changed { background: #fef9c3 !important; }
.proto-removed { display: inline-flex; align-items: center; gap: 4px; background: #fde047; color: #111827; border: 1px dashed #a16207; border-radius: 9999px; padding: 1px 8px; font-size: 11px; font-weight: 600; white-space: nowrap; }
`;

function scan() {
  const root = document.getElementById('root');
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || parent.closest('[data-proto-panel]')) continue;
    if (matches(node.nodeValue || '')) parent.classList.add('proto-changed');
  }
  root.querySelectorAll<HTMLInputElement>('input[placeholder]').forEach(el => {
    if (matches(el.placeholder)) el.classList.add('proto-changed');
  });
}

export const ProtoRemoved = ({ label }: { label: string }) => (
  <span className="proto-removed" title="Removed in this prototype">✕ {label}</span>
);

const CHANGES: { area: string; detail: string; to?: string }[] = [
  { area: 'Every page — header', detail: '"News" menu removed (yellow ✕ tag marks where it was).' },
  { area: 'Every page — footer', detail: 'Tagline and LINE QR text: "news" / "newsletter" → Daily Executive Briefing.' },
  { area: 'Home', detail: '"What You Get" section and the free signup block renamed to Daily Executive Briefing.', to: '/' },
  { area: 'News pages', detail: '/news and /news/sheet/… now show "Page Not Found" for everyone.', to: '/news' },
  { area: 'Subscribe', detail: 'Plan descriptions, plan cards and feature table reworded.', to: '/subscribe' },
  { area: 'Corporate', detail: '"Included" items and plan cards reworded.', to: '/corporate' },
  { area: 'FAQ', detail: '"What is WaLens?" (General) and the real-time alert question (Content & Data) reworded — click a question to open it and see the yellow answer.', to: '/faq' },
  { area: 'Terms / Privacy', detail: 'Brand "WaLens Asia News" → "WaLens"; service description no longer lists news.', to: '/terms-of-service' },
  { area: 'Sign up', detail: 'Heading "Join WaLens"; signup purpose option reworded.', to: '/signup' },
  { area: 'Search', detail: 'Placeholder reworded; news articles no longer appear in results.', to: '/search?q=thailand' },
  { area: 'Unsubscribe (new page)', detail: 'Working page for the email footer link. Submitting sends a REAL request email to contact@walensnews.com.', to: '/unsubscribe' },
  { area: 'My Page (login)', detail: 'Saved Articles and Reading History show insight reports only.' },
  { area: 'After payment', detail: 'Bullets reworded; "Back to News" button → "View Insights".' },
  { area: 'Not visible on screen', detail: 'Browser-tab titles renamed to "WaLens"; /news removed from sitemap, pre-render and redirects.' },
];

const ProtoHighlights = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let t: number | undefined;
    const run = () => { window.clearTimeout(t); t = window.setTimeout(scan, 250); };
    run();
    const obs = new MutationObserver(run);
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => { obs.disconnect(); window.clearTimeout(t); };
  }, [location.pathname, location.search]);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <style>{STYLE}</style>
      </Helmet>
      <div
        data-proto-panel
        style={{ position: 'fixed', left: 12, bottom: 12, zIndex: 2147483000, maxWidth: 380, width: 'calc(100vw - 24px)', fontFamily: 'system-ui, sans-serif' }}
      >
        <div style={{ background: '#fffbeb', color: '#111827', border: '2px solid #eab308', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.25)', overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: '#fde047', fontWeight: 700, fontSize: 13, border: 0, cursor: 'pointer', color: '#111827' }}
          >
            PROTOTYPE — not the live site · {open ? 'hide ▾' : 'show changes ▸'}
          </button>
          {open && (
            <div style={{ maxHeight: '55vh', overflowY: 'auto', padding: '8px 12px 12px', fontSize: 12, lineHeight: 1.45 }}>
              <p style={{ margin: '0 0 8px' }}>
                <span style={{ background: '#fde047', outline: '2px solid #eab308', borderRadius: 3, padding: '0 4px' }}>Yellow</span> = wording changed.{' '}
                <span className="proto-removed">✕ tag</span> = item removed. Switch JP / EN to check both languages.
              </p>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {CHANGES.map(c => (
                  <li key={c.area} style={{ marginBottom: 6 }}>
                    <strong>{c.area}:</strong> {c.detail}{' '}
                    {c.to && <Link to={c.to} style={{ color: '#1d4ed8', textDecoration: 'underline' }}>open</Link>}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProtoHighlights;
