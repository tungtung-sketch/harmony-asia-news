import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessTips } from '@/data/businessTips';

const BusinessTipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useI18n();
  
  const tip = businessTips.find(tip => tip.id === id);

  if (!tip) {
    return (
      <>
        <SEO
          title="Business Tip Not Found"
          description="The requested business tip could not be found"
          canonicalPath={`/business-tips/${id}`}
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Business Tip Not Found</h1>
              <Link to="/business-tips">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Business Tips
                </Button>
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const title = lang === 'ja' ? tip.titleJa : tip.title;
  const content = lang === 'ja' ? tip.contentJa : tip.content;

  return (
    <>
      <SEO
        title={title}
        description={lang === 'ja' ? tip.descriptionJa : tip.description}
        canonicalPath={`/business-tips/${tip.id}`}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link to="/business-tips">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("tips.backToTips")}
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Business Tip</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
                {title}
              </h1>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{tip.readTime}</span>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-muted/30 rounded-lg p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6 text-foreground">
                  {lang === 'ja' ? '主要なポイント：' : 'Key Points:'}
                </h2>
                
                <ol className="space-y-4">
                  {content.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-border pt-8 mt-12">
                <div className="flex items-center justify-between">
                  <Link to="/business-tips">
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t("tips.backToTips")}
                    </Button>
                  </Link>
                  
                  <div className="text-sm text-muted-foreground">
                    {lang === 'ja' ? 'その他のビジネスチップ' : 'More Business Tips'} →
                  </div>
                </div>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BusinessTipDetail;