import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock } from 'lucide-react';

interface HighlightItem {
  title: string;
  category: string;
  time: string;
}

interface InsightSidebarProps {
  highlights: HighlightItem[];
}

const InsightSidebar = ({ highlights }: InsightSidebarProps) => {
  return (
    <aside className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {highlights.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
                <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </div>
              </div>
              {index < highlights.length - 1 && (
                <div className="border-b border-border/50 mt-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Market Intelligence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="font-medium text-foreground">Thailand-Japan Trade</p>
            <p className="text-muted-foreground">$85.2B annual value</p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Active FDI Projects</p>
            <p className="text-muted-foreground">2,847 registered</p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-foreground">Growth Rate</p>
            <p className="text-primary font-medium">+12.3% YoY</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default InsightSidebar;