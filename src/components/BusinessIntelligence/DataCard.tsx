import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { DataPoint } from '@/data/businessIntelligenceData';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface DataCardProps {
  data: DataPoint;
  compact?: boolean;
}

const DataCard = ({ data, compact = false }: DataCardProps) => {
  const { lang } = useI18n();
  
  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTrendColor = () => {
    switch (data.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className={`${compact ? 'text-lg' : 'text-xl'} font-semibold leading-tight`}>
            {data.title[lang]}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 flex-shrink-0">
            {data.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Value */}
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-primary">
            {data.value.toLocaleString()} {data.unit}
          </div>
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {data.percentageChange > 0 ? '+' : ''}{data.percentageChange}%
            </span>
          </div>
        </div>

        {/* Chart (if available) */}
        {data.chartData && !compact && (
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chartData}>
                <XAxis 
                  dataKey="period" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.summary[lang]}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <a 
              href={data.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <span>{data.source.name}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(data.lastUpdated).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;