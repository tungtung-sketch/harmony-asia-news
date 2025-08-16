import { Badge } from '@/components/ui/badge';

interface InsightHeroProps {
  title: string;
  description: string;
  category?: string;
  backgroundImage?: string;
}

const InsightHero = ({ title, description, category, backgroundImage }: InsightHeroProps) => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          loading="eager"
        />
      )}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl space-y-6">
          {category && (
            <Badge variant="outline" className="text-sm font-medium">
              {category}
            </Badge>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightHero;