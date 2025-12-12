// src/components/NewsSectionFromSheet.tsx

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NewsCard from './NewsCard';
import { useI18n } from '@/i18n/I18nProvider';
import { fetchWalensNews, WalensNews } from '@/sheetNews';

const NewsSectionFromSheet = () => {
  const { t, lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<WalensNews[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get category from URL, default to 'all'
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl);

  // Sync activeCategory with URL changes
  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Update URL when category changes via button click
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      const data = await fetchWalensNews();
      if (!cancelled) {
        setArticles(data.filter((n) => n.approved));
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  // Filter articles by category
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "secondary"}
            size="sm"
            onClick={() => handleCategoryChange(cat)}
            className="whitespace-nowrap"
          >
            {cat === 'all' ? t('newsFilter.allCategories') || 'All Categories' : cat}
          </Button>
        ))}
      </div>

      {/* Results Summary */}
      {activeCategory !== 'all' && (
        <div className="mb-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {t('newsFilter.showingResults')?.replace('{{count}}', filteredArticles.length.toString()).replace('{{total}}', articles.length.toString()) || 
              `Showing ${filteredArticles.length} of ${articles.length} articles`}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">{t('home.featured.loading') || 'Loading news...'}</p>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">{t('newsFilter.noResults') || 'No articles found'}</h3>
          <p className="text-muted-foreground mb-4">{t('newsFilter.noResultsDesc') || 'Try adjusting your filters'}</p>
          <button
            onClick={() => handleCategoryChange('all')}
            className="text-primary hover:text-primary/80 underline"
          >
            {t('newsFilter.clearFilters') || 'Clear filters'}
          </button>
        </div>
      )}

      {/* News Grid */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsCard 
              key={article.slug || article.url} 
              article={article} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSectionFromSheet;
