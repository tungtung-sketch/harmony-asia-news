// src/components/NewsCard.tsx

import type { WalensNews } from "@/sheetNews";

type Props = {
  article: WalensNews;
};

const NewsCard = ({ article }: Props) => {
  const href = article.url_published || article.url || "#";
  const hasLink = href && href !== "#";

  return (
    <article className="flex flex-col justify-between border rounded-2xl p-4 md:p-5 bg-card hover:shadow-md transition-shadow h-full">
      {/* meta */}
      <p className="text-xs text-muted-foreground mb-1">
        {article.date} {article.time && `・${article.time}`} {article.category && `・${article.category}`}
      </p>

      {/* title */}
      <h3 className="font-semibold mb-2 line-clamp-2">{article.title_en || article.title_raw || "Untitled"}</h3>

      {/* excerpt */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
        {article.content_en || article.content_raw || ""}
      </p>

      {/* link */}
      {hasLink && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm font-medium text-primary hover:underline"
        >
          Read more →
        </a>
      )}
    </article>
  );
};

export default NewsCard;
