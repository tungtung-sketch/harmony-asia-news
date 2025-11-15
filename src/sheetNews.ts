// src/sheetNews.ts

export interface WalensNews {
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
  schema_version: string;
}

// URL ของ Google Sheets (ต้องเป็น Anyone with the link / Viewer แล้ว)
// แก้ ID และชื่อชีตให้ตรงของจริงนะครับ
const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1cxgOWbOse2pSsTb2aGZqDbPbsGdkWP417HrAKudnoc/gviz/tq?tqx=out:json&sheet=Merged_news';

function parseGvizJson(text: string): any {
  // gviz return string แบบ "/*O_o*/google.visualization.Query.setResponse({...});"
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  const json = text.slice(start, end + 1);
  return JSON.parse(json);
}

export async function fetchWalensNews(): Promise<WalensNews[]> {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const data = parseGvizJson(text);

  // ใช้ label ของคอลัมน์ = header แถวแรกในชีต
  const cols: string[] = data.table.cols.map((c: any) => c.label);
  const rows: any[] = data.table.rows;

  const toBool = (v: any) =>
    v === true || v === 'TRUE' || v === 'true' || v === 1 || v === '1';

  return rows
    // ตัด row ว่างทิ้ง
    .filter((r) => r.c && r.c.some((cell: any) => cell && cell.v != null))
    .map((r) => {
      const obj: Record<string, any> = {};
      cols.forEach((col, idx) => {
        const cell = r.c[idx];
        obj[col] = cell ? cell.v : '';
      });

      // เผื่อ slug ว่าง ก็สร้างจาก title_en ให้อัตโนมัติ
      const autoSlug =
        obj.slug ||
        (obj.title_en
          ? String(obj.title_en)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
          : '');

      return {
        date: obj.date || '',
        time: obj.time || '',
        title_raw: obj.title_raw || '',
        content_raw: obj.content_raw || '',
        title_en: obj.title_en || '',
        content_en: obj.content_en || '',
        title_jp: obj.title_jp || '',
        content_jp: obj.content_jp || '',
        url: obj.url || '',
        category: obj.category || 'News',
        approved: toBool(obj.approved),
        published: toBool(obj.published),
        image: obj.image || '',
        slug: autoSlug,
        url_published: obj.url_published || '',
        schema_version: obj.schema_version || '',
      } as WalensNews;
    });
}
