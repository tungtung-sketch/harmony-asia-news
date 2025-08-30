import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n/I18nProvider';
import { categories, getAvailableYears } from '@/data/businessIntelligenceData';

interface BIFilterProps {
  selectedCategory: string;
  selectedYear: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onYearChange: (year: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  resultCount: number;
  totalCount: number;
}

const BIFilter = ({
  selectedCategory,
  selectedYear,
  searchQuery,
  onCategoryChange,
  onYearChange,
  onSearchChange,
  onClearFilters,
  resultCount,
  totalCount
}: BIFilterProps) => {
  const { t, lang } = useI18n();
  const availableYears = getAvailableYears();

  const getCategoryName = (key: string) => {
    const categoryMap = {
      en: {
        economy: 'Economy & Investment',
        trade: 'Trade & Industry',
        regulation: 'Regulation & Tax',
        workforce: 'Workforce & Society',
        infrastructure: 'Infrastructure & Innovation'
      },
      ja: {
        economy: '経済・投資',
        trade: '貿易・産業',
        regulation: '規制・税制',
        workforce: '労働力・社会',
        infrastructure: 'インフラ・イノベーション'
      }
    };
    return categoryMap[lang][key as keyof typeof categoryMap.en] || key;
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedYear !== 'all' || searchQuery !== '';

  return (
    <div className="space-y-4 p-6 bg-background/50 border rounded-lg">
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('bi.filter.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t('bi.filter.selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('bi.filter.allCategories')}</SelectItem>
            {Object.keys(categories).map((key) => (
              <SelectItem key={key} value={key}>
                {getCategoryName(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Filter */}
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="w-full sm:w-[120px]">
            <SelectValue placeholder={t('bi.filter.selectYear')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('bi.filter.allYears')}</SelectItem>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters}
            className="w-full sm:w-auto"
          >
            {t('bi.filter.clearAll')}
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">{t('bi.filter.activeFilters')}:</span>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {getCategoryName(selectedCategory)}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          {selectedYear !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedYear}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onYearChange('all')}
              />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              "{searchQuery}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount === totalCount 
          ? `${t('bi.filter.showing')} ${totalCount} ${t('bi.filter.results')}`
          : `${t('bi.filter.showing')} ${resultCount} ${t('bi.filter.of')} ${totalCount} ${t('bi.filter.results')}`
        }
      </div>
    </div>
  );
};

export default BIFilter;