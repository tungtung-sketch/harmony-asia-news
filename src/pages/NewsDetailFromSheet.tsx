import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useI18n } from '@/i18n/I18nProvider';
import { useEffect, useState } from 'react';
import { fetchWalensNews, type WalensNews } from '@/sheetNews';

const NewsDetailFromSheet = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const [article, setArticle] = useState<WalensNews | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const articles = await fetchWalensNews();
        const found = articles.find(a => a.slug === slug);
        setArticle(found || null);
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <>
        <SEO
          title="Loading..."
          description="Loading article"
          canonicalPath={`/news/sheet/${slug}`}
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-16 text-center">
            <p className="text-muted-foreground">Loading article...</p>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <SEO
          title="Article Not Found"
          description="The requested article could not be found"
          canonicalPath={`/news/sheet/${slug}`}
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

  const currentTitle = lang === 'ja' ? article.title_jp : article.title_en;
  const currentContent = lang === 'ja' ? article.content_jp : article.content_en;

  // Format date based on language
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    
    if (lang === 'ja') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日`;
    } else {
      return date.toLocaleDateString('en-US', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  // Extract company name from URL
  const getSourceName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace('www.', '');
      
      // Map common domains to proper names
      const sourceMap: Record<string, string> = {
        'bangkokpost.com': 'Bangkok Post',
        'thaipbsworld.com': 'Thai PBS World',
        'nationthailand.com': 'The Nation Thailand',
        'thaiexaminer.com': 'Thai Examiner',
        'prachachat.net': 'Prachachat',
        'reuters.com': 'Reuters',
        'bangkokbiznews.com': 'Bangkok Biz News'
      };
      
      return sourceMap[hostname] || hostname
        .split('.')[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch {
      return url;
    }
  };

  return (
    <>
      <SEO
        title={currentTitle}
        description={currentContent.substring(0, 160)}
        canonicalPath={`/news/sheet/${slug}`}
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
                  {article.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {currentTitle}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
                {article.time && (
                  <span>・{article.time}</span>
                )}
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

            {/* Source Link */}
            {article.url && (
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  {lang === 'ja' ? '情報源:' : 'Source:'}
                </p>
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  {getSourceName(article.url)}
                </a>
              </div>
            )}

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

export default NewsDetailFromSheet;
