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
  // Remove everything before the first '{' and after the last '}'
  const startIdx = text.indexOf('{');
  const endIdx = text.lastIndexOf('}');
  
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Invalid gviz response format');
  }
  
  const json = text.substring(startIdx, endIdx + 1);
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

function getCellValue(cell: any, useFormatted: boolean = false) {
  if (!cell) return "";
  return useFormatted && cell.f ? cell.f : (cell.v ?? "");
}

function buildHeaders(table: any): { headers: string[]; dataRows: any[] } {
  const fallbackHeaders = [
    "date",
    "time",
    "title_raw",
    "content_raw",
    "title_en",
    "content_en",
    "title_jp",
    "content_jp",
    "url",
    "category",
    "approved",
    "published",
    "image",
    "slug",
    "url_published",
    "schema_version",
  ];

  const columnHeaders = table.cols.map((c: any) => c.label || c.id || "");
  const hasNamedHeaders = columnHeaders.some((header: string) => fallbackHeaders.includes(header));

  if (hasNamedHeaders) {
    return { headers: columnHeaders, dataRows: table.rows };
  }

  const firstRow = table.rows?.[0]?.c ?? [];
  const firstRowValues = firstRow.map((cell: any) => clean(getCellValue(cell)));
  const headerMatches = firstRowValues.filter((value: string) => fallbackHeaders.includes(value)).length;

  if (headerMatches >= 6) {
    const headers = columnHeaders.map((_, index: number) => firstRowValues[index] || fallbackHeaders[index] || `col_${index}`);
    return { headers, dataRows: table.rows.slice(1) };
  }

  const headers = columnHeaders.map((_, index: number) => fallbackHeaders[index] || `col_${index}`);
  return { headers, dataRows: table.rows };
}

// โหลดข้อมูลข่าว
export async function fetchWalensNews(): Promise<WalensNews[]> {
  try {
    const res = await fetch(SHEETS_URL);
    const text = await res.text();
    const table = parseGVizJSON(text);

    const { headers, dataRows } = buildHeaders(table);

    const rows = dataRows.map((row: any) => {

      const cells = row.c;
      const getValueByHeader = (header: string, useFormatted: boolean = false) => {
        const index = headers.indexOf(header);
        return index >= 0 ? getCellValue(cells[index], useFormatted) : "";
      };

      return {
        date: clean(getValueByHeader("date", true)), // Use formatted date
        time: clean(getValueByHeader("time", true)), // Use formatted time
        title_raw: clean(getValueByHeader("title_raw")),
        content_raw: clean(getValueByHeader("content_raw")),
        title_en: clean(getValueByHeader("title_en")),
        content_en: clean(getValueByHeader("content_en")),
        title_jp: clean(getValueByHeader("title_jp")),
        content_jp: clean(getValueByHeader("content_jp")),
        url: clean(getValueByHeader("url")),
        category: clean(getValueByHeader("category")),
        approved: toBool(getValueByHeader("approved")),
        published: toBool(getValueByHeader("published")),
        image: clean(getValueByHeader("image")),
        slug: clean(getValueByHeader("slug")),
        url_published: clean(getValueByHeader("url_published")),
        schema_version: clean(getValueByHeader("schema_version")),
      } as WalensNews;
    }).filter((row) => row.slug || row.title_en || row.title_jp || row.title_raw);

    // Filter ข่าวที่ “approved”
    const approvedNews = rows.filter((r) => r.approved);

    console.log("[Walens] Loaded approved articles:", approvedNews);
    return approvedNews;
  } catch (err) {
    console.error("[Walens] Failed to fetch sheet:", err);
    return [];
  }
}
