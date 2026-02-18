import { FileDown, Building2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface CompanyProfileDownloadProps {
  variant?: 'banner' | 'card' | 'inline';
}

const CompanyProfileDownload = ({ variant = 'banner' }: CompanyProfileDownloadProps) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  const label = isJapanese ? '会社概要をダウンロード' : 'Download Company Profile';
  const sublabel = isJapanese
    ? 'WaLens 会社概要（日本語・PDF）'
    : 'WaLens Company Profile (Japanese · PDF)';
  const description = isJapanese
    ? 'WaLensのサービス概要・会社情報をまとめたPDF資料をご覧いただけます。'
    : 'View our company overview and service details in PDF format.';

  if (variant === 'inline') {
    return (
      <a
        href="/assets/WaLens_Company_Profile_JP.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
      >
        <FileDown className="h-4 w-4 flex-shrink-0" />
        {sublabel}
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <div className="border border-border rounded-xl bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">{sublabel}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <a
          href="/assets/WaLens_Company_Profile_JP.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <FileDown className="h-4 w-4" />
          {label}
        </a>
      </div>
    );
  }

  // Default: banner
  return (
    <div className="bg-muted/30 border-y">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 flex-shrink-0">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-lg">{sublabel}</p>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <a
            href="/assets/WaLens_Company_Profile_JP.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            <FileDown className="h-4 w-4" />
            {label}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileDownload;
