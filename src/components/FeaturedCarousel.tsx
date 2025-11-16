// src/components/FeaturedCarousel.tsx

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { fetchWalensNews, WalensNews } from "@/sheetNews";
import NewsCard from "@/components/NewsCard";

// helper: แปลงวันที่+เวลาเป็น timestamp สำหรับ sort
function toTs(n: WalensNews): number {
  const iso =
    (n.date || "").trim() +
    "T" +
    ((n.time || "00:00").trim().length === 5 ? (n.time || "00:00").trim() : "00:00") +
    ":00";
  const ts = Date.parse(iso);
  return Number.isFinite(ts) ? ts : 0;
}

const FeaturedCarousel = () => {
  const { t } = useI18n();
  const [items, setItems] = useState<WalensNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const data = await fetchWalensNews();

      if (!cancelled) {
        const approved = data.filter((n) => n.approved);
        const sorted = [...approved].sort((a, b) => toTs(b) - toTs(a));
        // เลือกมา 3 ข่าวล่าสุด
        setItems(sorted.slice(0, 3));
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto py-6 md:py-8">
        <p className="text-sm text-muted-foreground">
          {t("home.featured.loading", { defaultValue: "Loading featured news…" })}
        </p>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="container mx-auto py-6 md:py-8">
        <p className="text-sm text-muted-foreground">
          {t("home.featured.empty", {
            defaultValue: "No featured news available yet.",
          })}
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{t("home.featured.title", { defaultValue: "Featured News" })}</h2>
      </div>

      {/* layout 3 การ์ดแนวนอนเหมือน section แรกของเว็บเดิม */}
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((article) => (
          <NewsCard key={article.slug || article.url} article={article} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
