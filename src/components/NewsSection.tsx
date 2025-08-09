import NewsCard from './NewsCard';
import { useI18n } from '@/i18n/I18nProvider';

const NewsSection = () => {
  const { t } = useI18n();

  const featuredNews = [
    {
      title: "Japan's Central Bank Announces New Digital Currency Initiative",
      excerpt: "The Bank of Japan reveals plans for a comprehensive digital yen pilot program, marking a significant step toward modernizing the country's financial infrastructure.",
      category: "Finance",
      time: "4 hours ago",
      author: "Hiroshi Tanaka",
      location: "Tokyo",
      featured: true
    },
    {
      title: "Southeast Asian Nations Form New Climate Alliance",
      excerpt: "Five ASEAN countries pledge $2 billion toward renewable energy projects as part of ambitious 2030 carbon neutrality goals.",
      category: "Environment",
      time: "6 hours ago",
      author: "Maria Santos",
      location: "Jakarta",
      featured: true
    }
  ];

  const latestNews = [
    {
      title: "South Korea's Tech Giants Invest in AI Research",
      excerpt: "Major Korean technology companies announce joint investment in artificial intelligence research facilities, aiming to compete with global tech leaders.",
      category: "Technology",
      time: "8 hours ago",
      author: "Kim Min-jun",
      location: "Seoul"
    },
    {
      title: "Taiwan Semiconductor Reports Record Quarterly Earnings",
      excerpt: "TSMC announces exceptional financial results driven by increased demand for advanced chips in automotive and AI applications.",
      category: "Business",
      time: "10 hours ago",
      author: "Lin Wei-ming",
      location: "Taipei"
    },
    {
      title: "Cultural Festival Celebrates Asian Heritage",
      excerpt: "Cities across Asia host synchronized cultural events highlighting traditional arts, cuisine, and music in a month-long celebration.",
      category: "Culture",
      time: "12 hours ago",
      author: "Priya Sharma",
      location: "New Delhi"
    },
    {
      title: "Regional Trade Agreement Shows Positive Results",
      excerpt: "New data reveals significant growth in intra-Asian trade following the implementation of the Comprehensive Regional Economic Partnership.",
      category: "Economics",
      time: "14 hours ago",
      author: "David Wong",
      location: "Hong Kong"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Featured Stories */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">{t('newsSection.featuredStories')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredNews.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section>
        <h2 className="text-3xl font-bold mb-8">{t('newsSection.latestNews')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((news, index) => (
            <NewsCard key={index} {...news} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsSection;