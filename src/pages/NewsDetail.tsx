import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { newsArticles } from '@/data/newsData';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useI18n();
  
  const article = newsArticles.find(article => article.id === id);

  if (!article) {
    return (
      <>
        <SEO
          title="Article Not Found"
          description="The requested article could not be found"
          canonicalPath={`/news/${id}`}
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <Link to="/news">
              <Button>Back to News</Button>
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const currentTitle = article.title[lang];
  const currentContent = article.content[lang];
  const currentCategory = article.category[lang];

  return (
    <>
      <SEO
        title={currentTitle}
        description={article.excerpt[lang]}
        canonicalPath={`/news/${id}`}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/news">
              <Button variant="ghost" className="pl-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('news.backToNews')}
              </Button>
            </Link>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Hero Image */}
            {article.image && (
              <div className="aspect-[16/9] mb-8 rounded-lg overflow-hidden">
                <img 
                  src={article.image} 
                  alt={currentTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">
                  {currentCategory}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {currentTitle}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{article.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US')}</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {currentContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back to News */}
            <div className="mt-12 pt-8 border-t">
              <Link to="/news">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('news.backToNews')}
                </Button>
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NewsDetail;