// src/components/NewsCard.tsx

import Link from "next/link";
import type { WalensNews } from "@/sheetNews";

type Props = {
  article: WalensNews;
};

const NewsCard = ({ article }: Props) => {
  const href = article.url_published || article.url || "#";

  return (
    <article className="border rounded-2xl p-4 md:p-5 bg-card hover:shadow-md transition-shadow">
      <p className="text-xs text-muted-foreground mb-1">
        {article.date} {article.time} ・ {article.category}
      </p>

      <h3 className="font-semibold mb-2 line-clamp-2">{article.title_en || article.title_raw}</h3>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.content_en || article.content_raw}</p>

      <Link href={href} className="text-sm font-medium text-primary hover:underline">
        Read more →
      </Link>
    </article>
  );
};

export default NewsCard;
