// src/sheetNews.ts
//
// This used to read from the WaLens Google Sheet via the gviz endpoint.
// The content pipeline has moved to Notion -> Cloudflare Worker -> Supabase,
// so this now reads directly from Supabase instead. The WalensNews shape is
// kept identical on purpose so NewsCard.tsx, NewsSectionFromSheet.tsx, and
// anything else consuming fetchWalensNews() need zero changes.

import { supabase } from "@/integrations/supabase/client";

export type WalensNews = {
  date: string;
  time: string;
  title_raw: string;
  content_raw: string;
  title_en: string;
  content_en: string;
  title_jp: string;
  content_jp: string;
  url: string;
  category: string;
  approved: boolean;
  published: boolean;
  image: string;
  slug: string;
  url_published: string;
  schema_version?: string;
};

// โหลดข้อมูลข่าว (ตอนนี้ดึงจาก Supabase แทน Google Sheet)
export async function fetchWalensNews(): Promise<WalensNews[]> {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        slug,
        status,
        is_premium,
        published_at,
        source_url,
        featured_image_url,
        categories ( name_en ),
        article_content ( language, title, content )
      `
      )
      .eq("status", "published")
      .eq("is_premium", false)
      .order("published_at", { ascending: false });

    if (error) throw error;

    const rows: WalensNews[] = (data || []).map((a: any) => {
      const contents = Array.isArray(a.article_content) ? a.article_content : [];
      const en = contents.find((c: any) => c.language === "en");
      const ja = contents.find((c: any) => c.language === "ja");
      const publishedDate = a.published_at ? new Date(a.published_at) : null;

      return {
        date: publishedDate ? publishedDate.toISOString().slice(0, 10) : "",
        time: publishedDate ? publishedDate.toISOString().slice(11, 16) : "",
        title_raw: "",
        content_raw: "",
        title_en: en?.title || "",
        content_en: en?.content || "",
        title_jp: ja?.title || "",
        content_jp: ja?.content || "",
        url: a.source_url || "",
        category: a.categories?.name_en || "",
        approved: true,
        published: a.status === "published",
        image: a.featured_image_url || "",
        slug: a.slug || "",
        url_published: "",
        schema_version: "",
      } as WalensNews;
    });

    console.log("[Walens] Loaded articles from Supabase:", rows.length);
    return rows;
  } catch (err) {
    console.error("[Walens] Failed to fetch from Supabase:", err);
    return [];
  }
}
