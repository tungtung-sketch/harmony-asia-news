import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/i18n/I18nProvider';
import { newsArticles } from '@/data/newsData';

export interface FilterState {
  category: string;
  year: string;
}

interface NewsFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

const NewsFilter = ({ onFilterChange }: NewsFilterProps) => {
  const { t, lang } = useI18n();
  const [filters, setFilters] = useState<FilterState>({ category: 'all', year: 'all' });

  // Extract unique categories and years from news data
  const categories = Array.from(new Set(newsArticles.map(article => article.category[lang])));
  const years = Array.from(new Set(newsArticles.map(article => new Date(article.date).getFullYear().toString()))).sort((a, b) => b.localeCompare(a));

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-background/50 border-b border-border/50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('newsFilter.category')}
              </label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background border-border/50">
                  <SelectValue placeholder={t('newsFilter.selectCategory')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="all">{t('newsFilter.allCategories')}</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {t('newsFilter.year')}
              </label>
              <Select value={filters.year} onValueChange={(value) => handleFilterChange('year', value)}>
                <SelectTrigger className="w-full sm:w-[140px] bg-background border-border/50">
                  <SelectValue placeholder={t('newsFilter.selectYear')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  <SelectItem value="all">{t('newsFilter.allYears')}</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Summary */}
          {(filters.category !== 'all' || filters.year !== 'all') && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{t('newsFilter.activeFilters')}:</span>
              {filters.category !== 'all' && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                  {categories.find(cat => cat.toLowerCase() === filters.category) || filters.category}
                </span>
              )}
              {filters.year !== 'all' && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                  {filters.year}
                </span>
              )}
              <button
                onClick={() => {
                  const resetFilters = { category: 'all', year: 'all' };
                  setFilters(resetFilters);
                  onFilterChange(resetFilters);
                }}
                className="text-primary hover:text-primary/80 text-xs underline ml-2"
              >
                {t('newsFilter.clearAll')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFilter;