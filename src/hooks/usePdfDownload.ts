import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { usePaywall } from '@/hooks/usePaywall';
import { toast } from '@/hooks/use-toast';

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

interface UsePdfDownloadOptions {
  reportId: string;
  language: 'en' | 'ja';
  onLoginRequired?: () => void;
}

export const usePdfDownload = ({ reportId, language, onLoginRequired }: UsePdfDownloadOptions) => {
  const { user } = useAuth();
  const { canViewArticle } = usePaywall();
  const [isDownloading, setIsDownloading] = useState(false);

  const isJapanese = language === 'ja';
  const access = canViewArticle('premium');
  const canDownload = access.canDownloadPdf;

  const downloadPdf = useCallback(async (reportContent?: ReportContent) => {
    if (!user) {
      onLoginRequired?.();
      return { success: false, error: 'Not authenticated' };
    }

    if (!canDownload) {
      toast({
        title: isJapanese ? "プレミアム会員限定" : "Premium Members Only",
        description: isJapanese 
          ? "PDFダウンロードにはプレミアムプランへのアップグレードが必要です。" 
          : "Please upgrade to Premium plan to download PDF reports.",
        variant: "destructive",
      });
      return { success: false, error: 'Premium required' };
    }

    setIsDownloading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-insight-pdf', {
        body: {
          reportId,
          language,
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
        window.open(data.pdfUrl, '_blank');
        toast({
          title: isJapanese ? "ダウンロード準備完了" : "Download Ready",
          description: data.message || (isJapanese 
            ? "PDFのダウンロードが開始されました。" 
            : "Your PDF download has started."),
        });
        return { success: true, url: data.pdfUrl };
      }

      return { success: false, error: 'No PDF URL returned' };
    } catch (error) {
      console.error('PDF download error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : (isJapanese 
          ? "PDFのダウンロードに失敗しました。しばらくしてから再度お試しください。" 
          : "Failed to download PDF. Please try again later.");
      
      toast({
        title: isJapanese ? "エラー" : "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsDownloading(false);
    }
  }, [user, canDownload, reportId, language, isJapanese, onLoginRequired]);

  return {
    downloadPdf,
    isDownloading,
    canDownload,
    isAuthenticated: !!user,
  };
};

export default usePdfDownload;
