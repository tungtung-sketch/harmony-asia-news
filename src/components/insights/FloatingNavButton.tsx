import React from 'react';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface FloatingNavButtonProps {
  onClick: () => void;
  className?: string;
}

export const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({
  onClick,
  className = '',
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  return (
    <Button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 shadow-lg rounded-full px-4 py-2 flex items-center gap-2 ${className}`}
      size="sm"
    >
      <List className="h-4 w-4" />
      <span className="hidden sm:inline">
        {isJapanese ? '目次へ' : 'Contents'}
      </span>
    </Button>
  );
};
