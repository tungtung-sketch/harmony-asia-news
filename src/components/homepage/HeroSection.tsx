import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-executive.jpg';
import { useI18n } from '@/i18n/I18nProvider';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    navigate(`/signup?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background image with dark overlay */}
      <img
        src={heroImage}
        alt="Executive boardroom with global market intelligence dashboards"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        width={1920}
        height={960}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,6%,0.92)] via-[hsl(222,47%,6%,0.85)] to-[hsl(222,47%,6%,0.7)]" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl py-16 sm:py-20 md:py-28">

          {/* Main Headline */}
          <h1
            className="font-bold tracking-tight text-[hsl(0,0%,100%)] mb-4 text-xl sm:text-2xl md:text-3xl leading-[1.45]"
            style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
          >
            {t('hero.home.headline')}
          </h1>

          {/* Subtitle */}
          <p className="text-[hsl(210,40%,72%)] text-base sm:text-lg md:text-xl mb-4 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
            {t('hero.home.subtitle')}
          </p>

          {/* Sub-copy */}
          <p
            className="text-[hsl(210,40%,80%)] text-sm sm:text-base leading-relaxed mb-8"
            style={{ wordBreak: 'keep-all' }}
          >
            {t('hero.home.subcopy')}
          </p>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSubmit} className="mb-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <Input
                type="email"
                required
                placeholder={t('hero.home.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-base flex-1 focus-visible:ring-[hsl(210,100%,60%)]"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 bg-[hsl(210,100%,60%)] hover:bg-[hsl(210,100%,55%)] text-[hsl(222,47%,6%)] font-semibold whitespace-nowrap text-base"
              >
                {t('hero.home.emailSubmit')}
              </Button>
            </div>
            <p className="text-xs text-[hsl(210,40%,58%)]">
              {t('hero.home.emailDisclaimer')}
            </p>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-10">
            <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-6 font-semibold bg-[hsl(210,100%,60%)] hover:bg-[hsl(210,100%,55%)] text-[hsl(222,47%,6%)]">
              <Link to="/subscribe">
                {t('hero.home.cta.primary')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-6 font-medium border-[hsl(210,40%,40%)] text-[hsl(210,40%,90%)] bg-transparent hover:bg-[hsl(210,40%,20%,0.3)]"
            >
              <Link to="/corporate">{t('hero.home.cta.corporate')}</Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap gap-5 sm:gap-8">
            <div className="flex items-center gap-2 text-sm text-[hsl(210,40%,80%)]">
              <span className="text-base">📧</span>
              <span>{t('hero.home.trust.delivery')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[hsl(210,40%,80%)]">
              <span className="text-base">🌐</span>
              <span>{t('hero.home.trust.bilingual')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[hsl(210,40%,80%)]">
              <span className="text-base">👤</span>
              <span>{t('hero.home.trust.advisor')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
