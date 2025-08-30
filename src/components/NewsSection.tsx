import { Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import { useI18n } from '@/i18n/I18nProvider';
import { newsArticles } from '@/data/newsData';

const NewsSection = () => {
  const { t, lang } = useI18n();

  const featuredNews = newsArticles.filter(article => article.featured);
  const latestNews = newsArticles.filter(article => !article.featured);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Featured Stories */}
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

      {/* Latest News */}
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
    </div>
  );
};

export default NewsSection;