import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const Agriculture = () => {
  const title = "Agriculture Insights | Harmony";
  const description =
    "Agriculture insights: sustainable farming, agri-tech adoption, and export market access between Thailand and Japan.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/agriculture"
      />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Agriculture Insights</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Strategies for high-value crops, cold-chain logistics, and traceability
          to reach discerning Japanese consumers.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Key Themes</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Post-harvest quality and certifications</li>
                <li>Agri-tech and precision agriculture</li>
                <li>Export financing and risk management</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">What to Watch</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Climate resilience programs</li>
                <li>Biosecurity and import regulations</li>
                <li>Digital marketplaces for farmers</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <nav className="mt-8 text-sm text-muted-foreground">
          <span className="mr-2">More industries:</span>
          <Link to="/insights/services" className="text-primary mr-3">Services</Link>
          <Link to="/insights/manufacturing" className="text-primary mr-3">Manufacturing</Link>
          <Link to="/insights/wellness-healthcare" className="text-primary mr-3">Wellness/Healthcare</Link>
          <Link to="/insights/real-estate" className="text-primary">Real Estate</Link>
        </nav>
      </main>
    </>
  );
};

export default Agriculture;
