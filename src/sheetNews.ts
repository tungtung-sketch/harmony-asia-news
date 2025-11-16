// src/sheetNews.ts

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

const SHEETS_JSON_URL =
  "https://docs.google.com/spreadsheets/d/1cxgOwBvOse2pSsTb2aGZqDbPbsGdkWP417HrAKudnoc/gviz/tq?tqx=out:json";
// 👆 ใส่ ID ของ Google Sheets ตัวจริงแทน XXXXXX

function toBool(v: unknown): boolean {
  if (typeof v === "string") {
    return v.toLowerCase() === "true" || v === "✔";
  }
  if (typeof v === "boolean") return v;
  return false;
}

function cleanText(v: unknown): string {
  if (!v) return "";
  return String(v).replace(/\s+/g, " ").trim();
}

export async function fetchWalensNews(): Promise<WalensNews[]> {
  try {
    const res = await fetch(SHEETS_JSON_URL);
    const text = await res.text();

    const match = text.match(/setResponse\((.*)\);?/s);
    if (!match) {
      console.error("[Walens] Cannot parse sheet JSON");
      return [];
    }

    const payload = JSON.parse(match[1]);
    const rows: any[] = payload.table.rows ?? [];

    const news: WalensNews[] = rows
      .map((r) => r.c?.map((c: any) => (c ? c.v : "")) ?? [])
      .filter((cols) => cols[0]) // ต้องมี date
      .map((cols) => ({
        date: cleanText(cols[0]),
        time: cleanText(cols[1]),
        title_raw: cleanText(cols[2]),
        content_raw: cleanText(cols[3]),
        title_en: cleanText(cols[4]),
        content_en: cleanText(cols[5]),
        title_jp: cleanText(cols[6]),
        content_jp: cleanText(cols[7]),
        url: cleanText(cols[8]),
        category: cleanText(cols[9]) || "News",
        approved: toBool(cols[10]),
        published: toBool(cols[11]),
        image: cleanText(cols[12]),
        slug: cleanText(cols[13]),
        url_published: cleanText(cols[14]),
        schema_version: cleanText(cols[15]),
      }));

    return news;
  } catch (e) {
    console.error("[Walens] fetchWalensNews error", e);
    return [];
  }
}
