import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

interface FurtherInquiryNoticeProps {
  className?: string;
}

export const FurtherInquiryNotice: React.FC<FurtherInquiryNoticeProps> = ({
  className = '',
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  const content = {
    title: {
      en: "Need Deeper Analysis?",
      ja: "より深い分析が必要ですか？"
    },
    description: {
      en: "If you would like to explore this topic in greater depth, or require a customized report tailored to your company's specific situation, please contact us. Our team will be happy to discuss how WaLens can support your decision-making.",
      ja: "このトピックをより深く掘り下げたい場合、または貴社の具体的な状況に合わせたカスタマイズレポートが必要な場合は、お気軽にお問い合わせください。WaLensがお客様の意思決定をどのようにサポートできるか、喜んでご相談に応じます。"
    },
    button: {
      en: "Contact Us",
      ja: "お問い合わせ"
    }
  };

  return (
    <Card className={`border-primary/20 bg-gradient-to-r from-primary/5 via-background to-primary/5 ${className}`}>
      <CardContent className="p-6 md:p-8 text-center">
        <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-3">
          {isJapanese ? content.title.ja : content.title.en}
        </h3>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto mb-4">
          {isJapanese ? content.description.ja : content.description.en}
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          📞 <a href="tel:+66953256631" className="hover:text-primary transition-colors">(+66) 95-325-6631</a>
        </p>
        <Button asChild>
          <Link to="/contact">
            {isJapanese ? content.button.ja : content.button.en}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
