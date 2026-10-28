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
  "Choose the plan that matches your level of strategic engagement. Basic keeps you up to date. Premium is built for executive decision-making.",
  "Twice a week in your inbox — economic, regulatory and risk updates that matter for decision-making at Japanese companies in Thailand.",
  "Twice a week, WaLens delivers a curated report designed for Japanese companies in Thailand. Here's exactly what you receive:",
  "Twice a week: economic, regulatory and risk intelligence for decision-making at Japanese companies in Thailand.",
  "Early-warning signals on disruptions that could impact your business — before they become widely known.",
  "FX, regulations, energy, supply chain — Thailand's strategic developments, delivered twice a week.",
  "Includes the twice-weekly Thailand Economic Report, basic market analysis, and website access.",
  "WaLens は、タイおよび東南アジアで事業を展開する国際的なビジネスリーダーに向けて、マーケットインサイト、分析レポート、ローカル知見を提供します。内容は契約プランにより異なります。",
  "WaLens は、利用者および購読者の個人情報を保護することを最優先に考えています。本プライバシーポリシーは、当社が収集・利用・保管する情報およびその保護方法について説明します。",
  "The more information you provide, the more relevant the insights we can provide to you.",
  "Twice a week — Thailand's key business developments filtered for Japanese subsidiaries",
  "Strategic intelligence and insights for executives operating across Asia-Pacific.",
  "Your subscription has been successfully cancelled. Thank you for using WaLens.",
  "All articles, insights, reports, and visuals are the property of WaLens.",
  "Real examples of the intelligence reports our subscribers receive.",
  "Twice-weekly report with deeper context and an executive summary.",
  "戦略的な関与のレベルに合ったプランをお選びください。ベーシックは最新動向の把握に。プレミアムはエグゼクティブの意思決定のために。",
  "Learn how WaLens protects your privacy and personal information.",
  "本ウェブサイト WaLens をご利用いただくにあたり、本利用規約に同意いただく必要があります。ご利用前に必ずご確認ください。",
  "Twice-weekly curated report — not AI-generated, expert-selected",
  "To provide insights and reports according to your subscription.",
  "provides curated business intelligence and strategic insights",
  "Curated economic, regulatory and risk updates, twice a week.",
  "To personalize content and reports for your business needs.",
  "Terms of Service for WaLens subscription and website usage",
  "Create your account and start your subscription to WaLens",
  "Twice-weekly JP+EN Thailand Economic Report for all seats",
  "Manage your subscription, profile, and access to WaLens",
  "Full access to the website + Thailand Economic Report",
  "週2回、WaLensは在タイ日系企業の経営判断に特化したレポートをお届けします。毎号の内容はこちら：",
  "Your first report will arrive within a few days.",
  "サブスクリプションは正常に解約されました。WaLensをご利用いただきありがとうございました。",
  "Thailand Economic Report for Japanese Companies",
  "5–7 curated business developments, twice a week",
  "為替・規制・エネルギー・サプライチェーン——タイ現地の動向を、日本語で、週2回お届けします。",
  "アジア太平洋で事業を展開する経営者のための戦略インテリジェンスとインサイトをお届けします。",
  "記事、インサイト、レポート、ビジュアル等のコンテンツはすべて WaLens に帰属します。",
  "To stay on top of local business developments",
  "Scan to get the free Thailand Economic Report",
  "Access to selected reports and some analysis",
  "WaLensがお客様のプライバシーと個人情報をどのように保護しているかをご説明します。",
  "Stop receiving the Thailand Economic Report",
  "Twice-weekly JP+EN Thailand Economic Report",
  "Full access to the Thailand Economic Report",
  "WaLens is hand-curated by a Thailand-based",
  "Twice-weekly report with curated insights",
  "週2回のタイ経済レポート、基本的な市場分析、ウェブサイトへのアクセスが含まれます。",
  "rather than focusing on real-time alerts",
  "Payment Successful – Welcome to WaLens!",
  "Thailand Economic Report (twice weekly)",
  "Get the free Thailand Economic Report",
  "Twice-weekly Thailand Economic Report",
  "Delivered to your inbox twice a week",
  "Is WaLens a real-time alert service?",
  "LINE公式アカウントをスキャンして無料の「タイ経済レポート」を受け取る",
  "週2回、在タイ日系企業の経営判断に効く経済・規制・リスク情報をお届け。",
  "週2回配信 — 日系子会社のGMに必要な情報だけを厳選してお届けします",
  "より多くの情報を入力いただくと、より的確なインサイトをお届けできます。",
  "週2回のキュレーション・レポート — AI生成ではなく、専門家が厳選",
  "週2回、在タイ日系企業の経営判断に効く経済・規制・リスク情報をお届け",
  "Local Business Intelligence Digest",
  "週2回のレポートに加え、背景分析とエグゼクティブサマリーを提供。",
  "厳選されたビジネスインテリジェンスおよび戦略的インサイトを提供",
  "ビジネスニーズに合わせたコンテンツやレポートのパーソナライズ",
  "ビジネスに影響し得る混乱の早期警告 — 広く知られる前に。",
  "購読者に届くインテリジェンスレポートの実例をご覧ください。",
  "Search insights, reports...",
  "Payment Successful - WaLens",
  "Searchable report archive",
  "Terms of Service - WaLens",
  "Search all past reports —",
  "購読、プロフィール、WaLensへのアクセスを管理",
  "WaLens購読およびウェブサイト利用の利用規約",
  "経済・規制・リスク情報を厳選し、週2回お届け。",
  "Privacy Policy - WaLens",
  "ウェブサイトとタイ経済レポートへのフルアクセス",
  "ローカルビジネス・インテリジェンスダイジェスト",
  "決済が完了しました。WaLensへようこそ！",
  "アカウントを作成してWaLensの購読を開始",
  "Delivered twice a week",
  "My Dashboard - WaLens",
  "厳選されたレポートと一部の分析へのアクセス",
  "週2回JP+ENタイ経済レポート（全員）",
  "最初のレポートは数日以内にお届けします。",
  "在タイ日系企業のための タイ経済レポート",
  "「タイ経済レポート」の配信を停止します",
  "プライバシーポリシー - WaLens",
  "が手作業で厳選した情報をお届けします",
  "Subscribe - WaLens",
  "無料で「タイ経済レポート」を受け取る",
  "タイのビジネス動向を常に把握するため",
  "WaLensは速報サービスですか？",
  "Sign Up - WaLens",
  "My Page - WaLens",
  "週2回JP+ENタイ経済レポート",
  "インサイト、レポートを検索...",
  "インサイトおよびレポートの提供",
  "サインアップ - WaLens",
  "マイページ - WaLens",
  "週2回、厳選トピック5〜7本",
  "タイ経済レポート（週2回）",
  "利用規約 - WaLens",
  "View Insights",
  "過去の全レポートを検索可能",
  "決済完了 - WaLens",
  "メールでお届け（週2回）",
  "Twice Weekly",
  "購読 - WaLens",
  "Join WaLens",
  "レポートアーカイブ検索",
  "WaLensに参加",
  "インサイト一覧へ",
  "週2回配信"
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
  { area: 'New name (every page)', detail: '「在タイ日系企業のための タイ経済レポート」 / "Thailand Economic Report for Japanese Companies" — delivered twice a week (was "daily / every morning at 7am").' },
  { area: 'Home — top banner', detail: 'Headline is now the report name; subtitle is the tagline 「週2回、在タイ日系企業の経営判断に効く経済・規制・リスク情報をお届け」; "Delivered twice a week". Browser-tab title and Google description also use タイ経済 / 日系企業.', to: '/' },
  { area: 'Home — sections', detail: '"What You Get" section and the free signup block use the new name and twice-weekly wording.', to: '/' },
  { area: 'Every page — header', detail: '"News" menu removed (yellow ✕ tag marks where it was).' },
  { area: 'Every page — footer', detail: 'Tagline and LINE QR text reworded.' },
  { area: 'News pages', detail: '/news and /news/sheet/… now show "Page Not Found" for everyone.', to: '/news' },
  { area: 'Subscribe', detail: 'Plan descriptions, plan cards and feature table reworded (twice weekly).', to: '/subscribe' },
  { area: 'Corporate', detail: '"Included" items, plan cards and FAQ answer reworded (twice weekly).', to: '/corporate' },
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
