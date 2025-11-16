import { useI18n } from "@/i18n/I18nProvider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  { title: "Thailand-Japan Investment Dialog Kicks Off", tag: "tags.breaking" },
  { title: "Thai Baht Outlook: What Exporters Should Watch", tag: "tags.analysis" },
  { title: "Opinion: Why 2025 Is Pivotal for Supply Chains", tag: "tags.opinion" },
];

const FeaturedCarousel = () => {
  const { t } = useI18n();
  return (
    <section className="container mx-auto py-8 md:py-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t("home.featured")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 md:p-5 space-y-3">
              <Badge variant="secondary" className="text-xs">
                {t(s.tag)}
              </Badge>
              <h3 className="font-semibold leading-snug text-sm md:text-base">{s.title}</h3>
              <div className="aspect-[16/10] rounded-md bg-muted" aria-label="Slide image placeholder" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
