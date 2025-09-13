import { useI18n } from '../i18n/I18nProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  const currentDate = new Date().toLocaleDateString(t('privacy.locale'), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <SEO 
        title={t('privacy.title')}
        description={t('privacy.description')}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('privacy.effectiveDate')}: {currentDate}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{t('privacy.introduction.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {t('privacy.introduction.content')}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</span>
                  {t('privacy.informationCollected.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('privacy.informationCollected.personal.title')}</h4>
                  <p className="text-muted-foreground">{t('privacy.informationCollected.personal.content')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('privacy.informationCollected.payment.title')}</h4>
                  <p className="text-muted-foreground">{t('privacy.informationCollected.payment.content')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{t('privacy.informationCollected.usage.title')}</h4>
                  <p className="text-muted-foreground">{t('privacy.informationCollected.usage.content')}</p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</span>
                  {t('privacy.howWeUse.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {t('privacy.howWeUse.provide')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {t('privacy.howWeUse.personalize')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {t('privacy.howWeUse.payments')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    {t('privacy.howWeUse.improve')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
                  {t('privacy.dataSharing.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{t('privacy.dataSharing.noSell')}</p>
                <p className="text-muted-foreground">{t('privacy.dataSharing.thirdParty')}</p>
                <p className="text-muted-foreground">{t('privacy.dataSharing.compliance')}</p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</span>
                  {t('privacy.dataSecurity.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('privacy.dataSecurity.content')}</p>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">5</span>
                  {t('privacy.userRights.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{t('privacy.userRights.access')}</p>
                <p className="text-muted-foreground">{t('privacy.userRights.cancel')}</p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">6</span>
                  {t('privacy.changes.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('privacy.changes.content')}</p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">7</span>
                  {t('privacy.contact.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{t('privacy.contact.content')}</p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  {t('privacy.contact.button')}
                </Link>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />
          
          <div className="text-center text-sm text-muted-foreground">
            <p>{t('privacy.lastUpdated')}: {currentDate}</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}