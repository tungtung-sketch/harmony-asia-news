import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/i18n/I18nProvider";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill message from URL query parameter
  useEffect(() => {
    const prefillMessage = searchParams.get('message');
    if (prefillMessage) {
      setMessage(prefillMessage);
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast({ 
        description: t("contact.errorRequired") || "Email and message are required",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("contact-form", {
        body: { email, message }
      });

      if (error) throw error;

      toast({ description: t("contact.success") });
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast({ 
        description: t("contact.error") || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <p className="text-muted-foreground text-sm mt-3">
                📞 <a href="tel:+66953256631" className="hover:text-primary transition-colors">(+66) 95-325-6631</a>
              </p>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("contact.emailPlaceholder")}
                    aria-label={t("contact.emailLabel")} 
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.messageLabel")}
                  </label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.messagePlaceholder")} 
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("contact.sending") || "Sending..."}
                    </>
                  ) : (
                    t("contact.submit")
                  )}
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