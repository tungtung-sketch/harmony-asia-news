import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, ExternalLink, Lock } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { DataPoint, TimePeriod } from '@/data/businessIntelligenceData';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { usePaywall } from '@/hooks/usePaywall';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AuthModals } from '@/components/AuthModals';
import { Link } from 'react-router-dom';

interface DataCardProps {
  data: DataPoint;
  compact?: boolean;
  timePeriod?: TimePeriod;
}

const DataCard = ({ data, compact = false, timePeriod = 'quarterly' }: DataCardProps) => {
  const { lang } = useI18n();
  const { userContext, loading } = usePaywall();
  const { user } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
  // Check if user has access (BASIC, PREMIUM, or ADMIN)
  const role = userContext.role;
  const hasAccess = role === 'BASIC' || role === 'PREMIUM' || role === 'ADMIN';
  const isLoading = loading;
  
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

  // Get chart data based on selected time period
  const getChartData = () => {
    if (!data.chartData) return null;
    return data.chartData[timePeriod] || data.chartData.quarterly || null;
  };

  const chartData = getChartData();

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
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
          {/* Main Value - Blurred for non-subscribers */}
          <div className="flex items-center gap-3 relative">
            <div className={`text-3xl font-bold text-primary ${!hasAccess && !isLoading ? 'blur-md select-none' : ''}`}>
              {data.value.toLocaleString()} {data.unit}
            </div>
            <div className={`flex items-center gap-1 ${getTrendColor()} ${!hasAccess && !isLoading ? 'blur-md select-none' : ''}`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">
                {data.percentageChange > 0 ? '+' : ''}{data.percentageChange}%
              </span>
            </div>
          </div>

          {/* Chart (if available) - Blurred for non-subscribers */}
          {chartData && !compact && (
            <div className={`h-32 w-full relative ${!hasAccess && !isLoading ? 'blur-md select-none pointer-events-none' : ''}`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="period" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis hide={!hasAccess} />
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

          {/* Paywall Overlay for non-subscribers */}
          {!hasAccess && !isLoading && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center p-4">
              <div className="bg-background border rounded-lg p-6 shadow-lg text-center max-w-sm">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {lang === 'ja' ? 'プレミアムコンテンツ' : 'Premium Content'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {lang === 'ja' 
                    ? 'このデータを閲覧するにはBasicプラン以上が必要です'
                    : 'Subscribe to Basic plan or above to view this data'
                  }
                </p>
                {user ? (
                  <Button asChild className="w-full">
                    <Link to="/subscribe">
                      {lang === 'ja' ? 'プランをアップグレード' : 'Upgrade Plan'}
                    </Link>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setIsLoginOpen(true)} variant="outline" className="w-full">
                      {lang === 'ja' ? 'ログイン' : 'Login'}
                    </Button>
                    <Button onClick={() => setIsSignUpOpen(true)} className="w-full">
                      {lang === 'ja' ? '無料で始める' : 'Start Free Trial'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Summary - Only show if has access */}
          {hasAccess && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.summary[lang]}
            </p>
          )}

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

      <AuthModals
        isSignUpOpen={isSignUpOpen}
        isLoginOpen={isLoginOpen}
        onSignUpClose={() => setIsSignUpOpen(false)}
        onLoginClose={() => setIsLoginOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </>
  );
};

export default DataCard;
