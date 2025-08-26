import { useState } from 'react';
import { Button } from '@/components/ui/button';
import NewsCard from '@/components/NewsCard';
import { useI18n } from '@/i18n/I18nProvider';

const allArticles = [
  { title: 'BOI Approvals Rise in Q3', excerpt: 'Foreign direct investment sees a surge...', category: 'News', time: '1d', author: 'Team', location: 'Bangkok' },
  { title: 'Entering Thai E-commerce', excerpt: 'Key steps for Japanese SMEs...', category: 'Tips', time: '2d', author: 'Team', location: 'Bangkok' },
  { title: '2025 GDP Outlook', excerpt: 'Market analysts expect...', category: 'Analysis', time: '3d', author: 'Team', location: 'Tokyo' },
];

const categories = ['News', 'Analysis', 'Tips'] as const;

type Cat = typeof categories[number];

const LatestArticles = () => {
  const { t } = useI18n();
  const [active, setActive] = useState<Cat>('News');
  const filtered = allArticles.filter(a => a.category === active);

  return (
    <section className="container mx-auto py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">{t('home.latest')}</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((c) => (
            <Button 
              key={c} 
              variant={active === c ? 'default' : 'secondary'} 
              size="sm" 
              onClick={() => setActive(c)}
              className="whitespace-nowrap"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filtered.map((a, i) => (
          <NewsCard key={i} featured={false} {...a} />
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
