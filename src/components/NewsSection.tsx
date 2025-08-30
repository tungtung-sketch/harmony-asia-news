import { Link } from 'react-router-dom';
import { useState } from 'react';
import NewsCard from './NewsCard';
import NewsFilter, { FilterState } from './NewsFilter';
import { useI18n } from '@/i18n/I18nProvider';
import { newsArticles } from '@/data/newsData';

const NewsSection = () => {
  const { t, lang } = useI18n();
  const [filters, setFilters] = useState<FilterState>({ category: 'all', year: 'all' });

  // Filter articles based on current filters
  const filterArticles = (articles: typeof newsArticles) => {
    return articles.filter(article => {
      const categoryMatch = filters.category === 'all' || 
        article.category[lang].toLowerCase() === filters.category;
      const yearMatch = filters.year === 'all' || 
        new Date(article.date).getFullYear().toString() === filters.year;
      return categoryMatch && yearMatch;
    });
  };

  const allFilteredArticles = filterArticles(newsArticles);
  const featuredNews = allFilteredArticles.filter(article => article.featured);
  const latestNews = allFilteredArticles.filter(article => !article.featured);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Filter Bar */}
      <NewsFilter onFilterChange={handleFilterChange} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Results Summary */}
        {(filters.category !== 'all' || filters.year !== 'all') && (
          <div className="mb-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {t('newsFilter.showingResults').replace('{{count}}', allFilteredArticles.length.toString()).replace('{{total}}', newsArticles.length.toString())}
            </p>
          </div>
        )}

        {/* Featured Stories */}
        {featuredNews.length > 0 && (
          <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">{t('newsSection.featuredStories')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredNews.map((article) => (
            <Link key={article.id} to={`/news/${article.id}`}>
              <NewsCard 
                title={article.title[lang]}
                excerpt={article.excerpt[lang]}
                category={article.category[lang]}
                time={article.time}
                author={article.author}
                location={article.location}
                featured={true}
                image={article.image}
              />
            </Link>
          ))}
          </div>
        </section>
        )}

        {/* Latest News */}
        {latestNews.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">{t('newsSection.latestNews')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((article) => (
            <Link key={article.id} to={`/news/${article.id}`}>
              <NewsCard 
                title={article.title[lang]}
                excerpt={article.excerpt[lang]}
                category={article.category[lang]}
                time={article.time}
                author={article.author}
                location={article.location}
                featured={false}
              />
            </Link>
              ))}
            </div>
          </section>
        )}

        {/* No Results Message */}
        {allFilteredArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">{t('newsFilter.noResults')}</h3>
            <p className="text-muted-foreground mb-4">{t('newsFilter.noResultsDesc')}</p>
            <button
              onClick={() => {
                const resetFilters = { category: 'all', year: 'all' };
                setFilters(resetFilters);
              }}
              className="text-primary hover:text-primary/80 underline"
            >
              {t('newsFilter.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsSection;