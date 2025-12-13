import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Lock, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePaywall } from '@/hooks/usePaywall';
import { useI18n } from '@/i18n/I18nProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface ReportContent {
  title: string;
  category: string;
  lastUpdated: string;
  executiveSummary: string[];
  sections: Array<{
    title: string;
    content: string;
  }>;
  sources: string[];
  disclaimer: string;
}

interface PdfDownloadButtonProps {
  reportId: string;
  reportContent?: ReportContent;
  onLoginRequired?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export const PdfDownloadButton = ({
  reportId,
  reportContent,
  onLoginRequired,
  className = '',
  variant = 'default',
  size = 'default',
}: PdfDownloadButtonProps) => {
  const { lang } = useI18n();
  const { user } = useAuth();
  const { canViewArticle } = usePaywall();
  const [isDownloading, setIsDownloading] = useState(false);

  const isJapanese = lang === 'ja';
  const access = canViewArticle('premium');
  const canDownloadPdf = access.canDownloadPdf;

  const handleDownload = async () => {
    if (!user) {
      onLoginRequired?.();
      return;
    }

    if (!canDownloadPdf) {
      toast({
        title: isJapanese ? "プレミアム会員限定" : "Premium Members Only",
        description: isJapanese 
          ? "PDFダウンロードにはプレミアムプランへのアップグレードが必要です。" 
          : "Please upgrade to Premium plan to download PDF reports.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-insight-pdf', {
        body: {
          reportId,
          language: lang,
          reportContent,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.pdfUrl) {
        // Open in new tab for printing/saving
        window.open(data.pdfUrl, '_blank');
        toast({
          title: isJapanese ? "ダウンロード準備完了" : "Download Ready",
          description: data.message || (isJapanese 
            ? "PDFのダウンロードが開始されました。" 
            : "Your PDF download has started."),
        });
      }
    } catch (error) {
      console.error('PDF download error:', error);
      toast({
        title: isJapanese ? "エラー" : "Error",
        description: error instanceof Error 
          ? error.message 
          : (isJapanese 
            ? "PDFのダウンロードに失敗しました。しばらくしてから再度お試しください。" 
            : "Failed to download PDF. Please try again later."),
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Not logged in - show login prompt
  if (!user) {
    return (
      <Button
        variant="outline"
        size={size}
        className={`gap-2 ${className}`}
        onClick={onLoginRequired}
      >
        <Lock className="h-4 w-4" />
        {isJapanese ? 'ログインしてダウンロード' : 'Login to Download'}
      </Button>
    );
  }

  // Logged in but not premium
  if (!canDownloadPdf) {
    return (
      <Button
        variant="outline"
        size={size}
        className={`gap-2 opacity-80 ${className}`}
        onClick={handleDownload}
      >
        <Lock className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">
          {isJapanese ? 'PDFダウンロード' : 'PDF Download'}
        </span>
        <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-300">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      </Button>
    );
  }

  // Premium user - full access
  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 ${className}`}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {isJapanese ? '生成中...' : 'Generating...'}
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          {isJapanese ? 'PDFダウンロード' : 'PDF Download'}
          <Crown className="h-4 w-4 ml-1" />
        </>
      )}
    </Button>
  );
};

export default PdfDownloadButton;
