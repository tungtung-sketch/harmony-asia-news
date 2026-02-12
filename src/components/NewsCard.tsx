// src/components/NewsCard.tsx

import { Link } from "react-router-dom";
import type { WalensNews } from "@/sheetNews";
import { useI18n } from "@/i18n/I18nProvider";
import { BookmarkButton } from "@/components/BookmarkButton";

type Props = {
  article: WalensNews;
  showBookmark?: boolean;
};

const getSourceName = (url: string): string => {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    const sourceMap: Record<string, string> = {
      'bangkokpost.com': 'Bangkok Post',
      'thestandard.co': 'The Standard',
      'thaipbsworld.com': 'Thai PBS',
      'thaipbs.or.th': 'Thai PBS',
      'bangkokbiznews.com': 'Bangkok Biz',
      'prachachat.net': 'Prachachat',
      'nationthailand.com': 'Nation Thailand',
    };
    return sourceMap[hostname] || hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1);
  } catch {
    return '';
  }
};

const NewsCard = ({ article, showBookmark = true }: Props) => {
  const { lang } = useI18n();

  if (!article) {
    return null;
  }

  // Use language-specific fields
  const title = lang === 'ja' ? article.title_jp : article.title_en;
  const content = lang === 'ja' ? article.content_jp : article.content_en;

  // Format date based on language
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    
    if (lang === 'ja') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
    } else {
      return date.toLocaleDateString('en-US', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const formattedDate = formatDate(article.date);

  return (
    <article className="flex flex-col justify-between border rounded-2xl p-4 md:p-5 bg-card hover:shadow-md transition-shadow h-full relative group">
      {/* Bookmark button */}
      {showBookmark && article.slug && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <BookmarkButton
            article={{
              slug: article.slug,
              title: title || article.title_raw || "Untitled",
              language: lang === 'ja' ? 'JP' : 'EN',
              url: `/news/sheet/${article.slug}`,
              thumbnail_url: article.image,
              category: article.category
            }}
            variant="icon"
          />
        </div>
      )}

      {/* meta */}
      <p className="text-xs text-muted-foreground mb-1">
        {formattedDate} {article.time && `・${article.time}`} {article.category && `・${article.category}`}
      </p>

      {/* title */}
      <h3 className="font-semibold mb-2 line-clamp-2">{title || article.title_raw || "Untitled"}</h3>

      {/* excerpt */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
        {content || article.content_raw || ""}
      </p>

      {/* source */}
      {article.url && (
        <p className="text-xs text-muted-foreground mb-2">
          {lang === 'ja' ? '出典: ' : 'Source: '}
          <span className="font-medium">{getSourceName(article.url)}</span>
          {lang === 'ja' ? ' (要約・編集：WaLens)' : ' (summarized by WaLens)'}
        </p>
      )}

      {/* link */}
      {article.slug && (
        <Link
          to={`/news/sheet/${article.slug}`}
          className="mt-auto text-sm font-medium text-primary hover:underline"
        >
          {lang === 'ja' ? '続きを読む →' : 'Read more →'}
        </Link>
      )}
    </article>
  );
};

export default NewsCard;
