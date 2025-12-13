import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, BookOpen, Layers, FileText } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

export type ReadingMode = 'updates' | 'base' | 'deep-dive' | 'all';

interface ReadingModeSelectorProps {
  currentMode: ReadingMode;
  onModeChange: (mode: ReadingMode) => void;
  className?: string;
}

const modes = [
  {
    id: 'updates' as ReadingMode,
    icon: Clock,
    label: { en: 'Latest Updates', ja: '最新動向' },
    time: { en: '2 min', ja: '2分' },
    description: { en: 'Quick intelligence briefing', ja: '最新インテリジェンス速報' },
  },
  {
    id: 'base' as ReadingMode,
    icon: FileText,
    label: { en: 'Base Report', ja: 'ベースレポート' },
    time: { en: '10 min', ja: '10分' },
    description: { en: 'Reference-grade analysis', ja: '参照用の包括的分析' },
  },
  {
    id: 'deep-dive' as ReadingMode,
    icon: BookOpen,
    label: { en: 'Deep Dive', ja: '深掘り分析' },
    time: { en: '15-20 min', ja: '15〜20分' },
    description: { en: 'In-depth strategic insights', ja: '戦略的洞察の深堀り' },
  },
  {
    id: 'all' as ReadingMode,
    icon: Layers,
    label: { en: 'Full Report', ja: '全章を読む' },
    time: { en: '30+ min', ja: '30分以上' },
    description: { en: 'Complete analysis', ja: '完全版レポート' },
  },
];

export const ReadingModeSelector: React.FC<ReadingModeSelectorProps> = ({
  currentMode,
  onModeChange,
  className = '',
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  return (
    <Card className={`p-4 ${className}`}>
      <p className="text-sm font-medium text-muted-foreground mb-3">
        {isJapanese ? '読み方を選択' : 'Choose reading mode'}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          return (
            <Button
              key={mode.id}
              variant={isActive ? 'default' : 'outline'}
              className={`flex flex-col items-start h-auto py-3 px-3 text-left ${
                isActive ? '' : 'hover:bg-primary/5'
              }`}
              onClick={() => onModeChange(mode.id)}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4" />
                <span className="font-medium text-sm">
                  {isJapanese ? mode.label.ja : mode.label.en}
                </span>
              </div>
              <span className="text-xs opacity-70">
                {isJapanese ? mode.time.ja : mode.time.en}
              </span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
