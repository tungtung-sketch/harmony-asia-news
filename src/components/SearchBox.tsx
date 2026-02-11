import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const SearchBox = ({ mobile = false }: { mobile?: boolean }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center w-full ${mobile ? 'min-w-0 max-w-full' : 'min-w-[280px] max-w-[400px]'}`}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 h-9 text-sm border-border/50 focus:border-primary/50 bg-background/50 w-full"
        />
        <Button
          type="submit"
          size="sm"
          variant="ghost"
          className="absolute right-0 top-0 h-9 w-9 p-0 hover:bg-transparent"
        >
          <Search className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          <span className="sr-only">{t('search.submit')}</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBox;