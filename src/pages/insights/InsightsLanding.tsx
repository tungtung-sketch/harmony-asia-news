import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const InsightsLanding = () => {
  const title = "Insights | Harmony";
  const description =
    "Explore industry insights for Thailand–Japan business: services, manufacturing, wellness/healthcare, agriculture, and real estate.";

  const items = [
    { to: "/insights/services", label: "Services" },
    { to: "/insights/manufacturing", label: "Manufacturing" },
    { to: "/insights/wellness-healthcare", label: "Wellness / Healthcare" },
    { to: "/insights/agriculture", label: "Agriculture" },
    { to: "/insights/real-estate", label: "Real Estate" },
  ];

  return (
    <>
      <SEO title={title} description={description} canonicalPath="/insights" />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Curated industry intelligence connecting Thailand and Japan—trends,
            regulations, opportunities, and playbooks for expansion.
          </p>
        </header>

        <section aria-labelledby="industries-heading">
          <h2 id="industries-heading" className="sr-only">
            Industries
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link key={item.to} to={item.to} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold">{item.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      View market trends, policy updates, and strategic guidance
                      for the {item.label.toLowerCase()} sector.
                    </p>
                    <span className="mt-4 inline-block text-primary font-medium">
                      Explore →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default InsightsLanding;
