import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

export interface FilterState {
  dateRange: number; // days
  language: string;
  plan: string;
  category: string;
  source: string;
}

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

export const AnalyticsFilters: React.FC<Props> = ({ filters, onChange }) => {
  const update = (key: keyof FilterState, value: string | number) =>
    onChange({ ...filters, [key]: value });

  return (
    <Card>
      <CardContent className="flex flex-wrap gap-4 pt-4 pb-4">
        <Select
          value={String(filters.dateRange)}
          onValueChange={(v) => update('dateRange', Number(v))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Last 24h</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.language} onValueChange={(v) => update('language', v)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="th">Thai</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.plan} onValueChange={(v) => update('plan', v)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.category} onValueChange={(v) => update('category', v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="insights">Insights</SelectItem>
            <SelectItem value="bi">Business Intel</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.source} onValueChange={(v) => update('source', v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="organic">Organic</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
