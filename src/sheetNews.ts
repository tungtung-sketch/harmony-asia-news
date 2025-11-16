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

// ใส่ Spreadsheet ID และชื่อ Sheet ที่คุณใช้อยู่
const SPREADSHEET_ID = "1cxgOwBvOse2pSsTb2aGZqDbPbsGdkWP417HrAKudnoc";
const SHEET_NAME = "Merged_news";

// URL สำหรับ gviz JSON
const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
  SHEET_NAME,
)}`;

// parse gviz format
function parseGVizJSON(text: string) {
  const json = text.replace(/^[^{]+/, "").replace(/;?\s*$/, "");
  return JSON.parse(json).table;
}

// แปลง cell → string
function clean(v: any): string {
  if (!v) return "";
  return typeof v === "string" ? v.trim() : String(v).trim();
}

// boolean จาก Google Sheets
function toBool(v: any): boolean {
  if (!v) return false;
  if (typeof v === "boolean") return v;
  return String(v).toLowerCase() === "true" || v === "✔";
}

// โหลดข้อมูลข่าว
export async function fetchWalensNews(): Promise<WalensNews[]> {
  try {
    const res = await fetch(SHEETS_URL);
    const text = await res.text();
    const table = parseGVizJSON(text);

    const headers = table.cols.map((c: any) => c.label || c.id || "");

    const rows = table.rows.map((row: any, index: number) => {
      const obj: any = {};
      headers.forEach((h, i) => {
        obj[h] = row.c[i]?.v ?? "";
      });

      return {
        date: clean(obj.date),
        time: clean(obj.time),
        title_raw: clean(obj.title_raw),
        content_raw: clean(obj.content_raw),
        title_en: clean(obj.title_en),
        content_en: clean(obj.content_en),
        title_jp: clean(obj.title_jp),
        content_jp: clean(obj.content_jp),
        url: clean(obj.url),
        category: clean(obj.category),
        approved: toBool(obj.approved),
        published: toBool(obj.published),
        image: clean(obj.image),
        slug: clean(obj.slug),
        url_published: clean(obj.url_published),
        schema_version: clean(obj.schema_version),
      } as WalensNews;
    });

    // Filter ข่าวที่ “approved”
    const approvedNews = rows.filter((r) => r.approved);

    console.log("[Walens] Loaded approved articles:", approvedNews);
    return approvedNews;
  } catch (err) {
    console.error("[Walens] Failed to fetch sheet:", err);
    return [];
  }
}
