import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/i18n/I18nProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { Mail } from "lucide-react";

const Contact = () => {
  const { t } = useI18n();
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ description: t("contact.success") });
  };

  return (
    <>
      <SEO
        title={t("contact.title")}
        description={t("contact.metaDescription")}
        canonicalPath="/contact"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{t("contact.h1")}</h1>
              <p className="text-muted-foreground text-lg">{t("contact.metaDescription")}</p>
            </div>

            <div className="bg-card rounded-lg border p-8 shadow-sm">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("contact.emailLabel")}
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder={t("contact.emailPlaceholder")}
                    aria-label={t("contact.emailLabel")} 
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.messageLabel")}
                  </label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    placeholder={t("contact.messagePlaceholder")} 
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t("contact.submit")}
                </Button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;