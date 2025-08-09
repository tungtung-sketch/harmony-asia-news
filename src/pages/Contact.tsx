import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/i18n/I18nProvider";

const Contact = () => {
  const { t } = useI18n();
  const { toast } = useToast();

  useEffect(() => {
    document.title = t("contact.title");
    const metaDescId = "meta-desc-contact";
    let meta = document.querySelector<HTMLMetaElement>(`meta[name='description']`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = t("contact.metaDescription");

    // Canonical
    const existingCanonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    const canonical = existingCanonical || document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", window.location.origin + "/contact");
    if (!existingCanonical) document.head.appendChild(canonical);

    return () => {
      // Optionally reset title on unmount
    };
  }, [t]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ description: t("contact.success") });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{t("contact.h1")}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{t("contact.metaDescription")}</p>
        </header>

        <article className="max-w-xl">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t("contact.emailLabel")}
              </label>
              <Input id="email" type="email" required placeholder={t("contact.emailPlaceholder")}
                aria-label={t("contact.emailLabel")} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t("contact.messageLabel")}
              </label>
              <Textarea id="message" rows={5} placeholder={t("contact.messagePlaceholder")} />
            </div>
            <Button type="submit">{t("contact.submit")}</Button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contact;
