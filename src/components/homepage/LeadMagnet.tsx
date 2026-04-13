import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useI18n } from '@/i18n/I18nProvider';
import { Mail, ArrowRight } from 'lucide-react';

const LeadMagnet = () => {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    navigate(`/signup?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-sm mb-5">
              <Mail className="w-4 h-4" />
              {t('leadMagnet.badge')}
            </div>
            <h2 className={`font-bold mb-4 ${
              lang === 'ja' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
            }`}>
              {t('leadMagnet.title')}
            </h2>
            <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed mb-4">
              {t('leadMagnet.description')}
            </p>
            {/* Deliverables list */}
            <ul className="space-y-2 text-sm sm:text-base text-primary-foreground/75">
              {['leadMagnet.item1', 'leadMagnet.item2', 'leadMagnet.item3'].map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50 flex-shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-auto lg:min-w-[360px]">
            <form onSubmit={handleSubmit} className="bg-primary-foreground/10 rounded-xl p-6 md:p-8 space-y-4">
              <p className="text-sm font-semibold text-primary-foreground/90 mb-2">{t('leadMagnet.formTitle')}</p>
              <Input
                type="email"
                required
                placeholder={t('leadMagnet.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
              />
              <Button
                type="submit"
                className="w-full h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base"
              >
                {t('leadMagnet.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-primary-foreground/50 text-center">
                {t('leadMagnet.privacy')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
