import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { TimePeriod } from '@/data/businessIntelligenceData';
import { Calendar } from 'lucide-react';

interface TimePeriodFilterProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

const TimePeriodFilter = ({ selectedPeriod, onPeriodChange }: TimePeriodFilterProps) => {
  const { lang } = useI18n();

  const periods: { value: TimePeriod; labelEn: string; labelJa: string }[] = [
    { value: 'monthly', labelEn: 'Monthly', labelJa: '月次' },
    { value: 'quarterly', labelEn: 'Quarterly', labelJa: '四半期' },
    { value: 'yearly', labelEn: 'Yearly', labelJa: '年次' },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{lang === 'ja' ? '期間:' : 'Period:'}</span>
      </div>
      <div className="flex gap-1">
        {periods.map((period) => (
          <Button
            key={period.value}
            variant={selectedPeriod === period.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPeriodChange(period.value)}
            className="text-xs"
          >
            {lang === 'ja' ? period.labelJa : period.labelEn}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimePeriodFilter;
