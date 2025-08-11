import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const RealEstate = () => {
  const title = "Real Estate Insights | Harmony";
  const description =
    "Real estate insights: investment flows, REIT structures, and urban development across Thailand and Japan.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/real-estate"
      />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Real Estate Insights</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Navigate cross-border investment, asset management, and mixed-use
          development trends.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Key Themes</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>REITs and cross-listing potentials</li>
                <li>Industrial and logistics assets</li>
                <li>Transit-oriented development (TOD)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">What to Watch</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Foreign ownership regulations</li>
                <li>Green building certifications</li>
                <li>Hospitality recovery and new formats</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <nav className="mt-8 text-sm text-muted-foreground">
          <span className="mr-2">More industries:</span>
          <Link to="/insights/services" className="text-primary mr-3">Services</Link>
          <Link to="/insights/manufacturing" className="text-primary mr-3">Manufacturing</Link>
          <Link to="/insights/wellness-healthcare" className="text-primary mr-3">Wellness/Healthcare</Link>
          <Link to="/insights/agriculture" className="text-primary">Agriculture</Link>
        </nav>
      </main>
    </>
  );
};

export default RealEstate;
