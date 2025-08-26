import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Globe, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const { t } = useI18n();

  return (
    <>
      <SEO
        title="About Harmony - Business Intelligence for Thailand"
        description="We deliver trusted business intelligence for leaders shaping Thailand's future. Learn about Harmony Asia News mission and vision."
        canonicalPath="/about"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-12 md:py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                About Harmony
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We deliver trusted business intelligence for leaders shaping Thailand's future.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                Our Mission
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-primary leading-relaxed">
                Harmonize the global business.
              </p>
            </div>
          </section>

          {/* Vision Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
                Our Vision
              </h2>
              <Card className="bg-muted/30 border-primary/10">
                <CardContent className="p-6 md:p-8 text-center">
                  <p className="text-lg md:text-xl text-foreground leading-relaxed">
                    Becoming the top trusted business news platform for international business leaders in Thailand.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="container mx-auto py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
                Who We Serve
              </h2>
              
              <div className="text-center mb-8 md:mb-12">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Harmony Asia News is designed for international business leaders in Thailand who need trusted, practical, and timely business insights.
                </p>
              </div>

              {/* Icons and Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Global Leadership</h3>
                  <p className="text-sm text-muted-foreground">
                    Serving international executives and business leaders operating across borders.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Thailand Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep expertise in Thailand's business landscape and market dynamics.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Practical Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Actionable intelligence that drives informed business decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-muted/30 border-y">
            <div className="container mx-auto py-12 md:py-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Connect?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the conversation with Thailand's business community. Reach out to learn more about our insights and coverage.
              </p>
              <Button asChild size="lg" className="px-8 py-3">
                <Link to="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;