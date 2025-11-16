// src/components/LatestArticles.tsx

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/NewsCard";
import { useI18n } from "@/i18n/I18nProvider";
import { fetchWalensNews, WalensNews } from "@/sheetNews";

const categories = ["News", "Analysis", "Tips"] as const;
type Cat = (typeof categories)[number];

const LatestArticles = () => {
  const { t } = useI18n();
  const [active, setActive] = useState<Cat>("News");
  const [articles, setArticles] = useState<WalensNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const data = await fetchWalensNews();
      if (!cancelled) {
        // เก็บเฉพาะ approved เท่านั้น
        setArticles(data.filter((n) => n.approved));
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = articles.filter((a) => a.category === active);

  return (
    <section className="container mx-auto py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          {t("home.latestArticles", { defaultValue: "Latest Articles" })}
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((c) => (
            <Button
              key={c}
              variant={active === c ? "default" : "secondary"}
              size="sm"
              onClick={() => setActive(c)}
              className="whitespace-nowrap"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading articles…</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">No articles in this category yet.</p>
      )}

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {filtered.map((article) => (
          <NewsCard key={article.slug || article.url} article={article} />
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
