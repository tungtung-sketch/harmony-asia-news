import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const Manufacturing = () => {
  const title = "Manufacturing Insights | Harmony";
  const description =
    "Manufacturing insights for Thailand–Japan supply chains: incentives, localization, and Tier-2 suppliers.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/manufacturing"
      />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Manufacturing Insights</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          From EV ecosystems to precision parts: incentives, BOI pathways, and
          localization strategies for resilient supply chains.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Key Themes</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Thailand+1 diversification across ASEAN</li>
                <li>Tier-2/3 supplier upgrade programs</li>
                <li>Industrial estates and special economic zones</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">What to Watch</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>EV and battery supply chain incentives</li>
                <li>Customs modernization and trade facilitation</li>
                <li>Regional standards harmonization</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <nav className="mt-8 text-sm text-muted-foreground">
          <span className="mr-2">More industries:</span>
          <Link to="/insights/services" className="text-primary mr-3">Services</Link>
          <Link to="/insights/wellness-healthcare" className="text-primary mr-3">Wellness/Healthcare</Link>
          <Link to="/insights/agriculture" className="text-primary mr-3">Agriculture</Link>
          <Link to="/insights/real-estate" className="text-primary">Real Estate</Link>
        </nav>
      </main>
    </>
  );
};

export default Manufacturing;
