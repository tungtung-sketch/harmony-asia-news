import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Clock } from "lucide-react";
import { searchContent, SearchResult } from '@/data/searchData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t, lang } = useI18n();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate search delay for better UX
    const timer = setTimeout(() => {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'article':
        return lang === 'ja' ? 'ニュース記事' : 'News Article';
      case 'tip':
        return lang === 'ja' ? 'ビジネスチップ' : 'Business Tip';
      case 'insight':
        return lang === 'ja' ? 'インサイト' : 'Industry Insight';
      default:
        return type;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'tip':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'insight':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <>
      <SEO
        title={`${t('search.results')} "${query}" - HARMONY`}
        description={`Search results for "${query}" on Harmony Asia News`}
        canonicalPath={`/search?q=${encodeURIComponent(query)}`}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 text-primary mr-3" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('search.results')}
              </h1>
            </div>
            
            {query && (
              <div className="mb-6">
                <p className="text-muted-foreground text-lg">
                  {t('search.queryLabel')}: <span className="font-semibold text-foreground">"{query}"</span>
                </p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">{t('search.loading')}</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && (
            <>
              {results.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      {results.length === 1 
                        ? t('search.resultsCountSingle') 
                        : t('search.resultsCountPlural').replace('{count}', results.length.toString())
                      }
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {results.map((result) => (
                      <Card key={result.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            {/* Type and Category */}
                            <div className="flex items-center space-x-2">
                              <Badge className={`text-xs font-medium ${getTypeColor(result.type)}`}>
                                {getTypeLabel(result.type)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {lang === 'ja' ? result.categoryJa : result.category}
                              </span>
                              {result.readTime && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{result.readTime}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            {/* Title */}
                            <h2 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                              <Link to={result.url}>
                                {lang === 'ja' ? result.titleJa : result.title}
                              </Link>
                            </h2>
                            
                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed">
                              {lang === 'ja' ? result.descriptionJa : result.description}
                            </p>
                            
                            {/* Read More Button */}
                            <div className="flex justify-between items-center pt-2">
                              <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
                                <Link to={result.url} className="flex items-center">
                                  {t('search.readMore')}
                                  <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {t('search.noResults')}
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {t('search.noResultsDescription')}
                  </p>
                  <Button asChild>
                    <Link to="/">
                      {t('search.backToHome')}
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SearchResults;