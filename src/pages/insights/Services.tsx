import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const Services = () => {
  const title = "Services Industry Insights | Harmony";
  const description =
    "Services industry insights for Thailand–Japan business: market demand, regulations, and opportunities.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/services"
      />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Services Industry Insights</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Explore cross-border service models, licensing requirements, and B2B
          opportunities from fintech to professional services.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Key Themes</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Localization of service delivery and compliance</li>
                <li>Partnerships with Japanese conglomerates (sogo shosha)</li>
                <li>Digital onboarding and eKYC interoperability</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">What to Watch</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Data residency and cross-border data flows</li>
                <li>Professional licensing equivalence</li>
                <li>Service export incentives</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <nav className="mt-8 text-sm text-muted-foreground">
          <span className="mr-2">More industries:</span>
          <Link to="/insights/manufacturing" className="text-primary mr-3">Manufacturing</Link>
          <Link to="/insights/wellness-healthcare" className="text-primary mr-3">Wellness/Healthcare</Link>
          <Link to="/insights/agriculture" className="text-primary mr-3">Agriculture</Link>
          <Link to="/insights/real-estate" className="text-primary">Real Estate</Link>
        </nav>
      </main>
    </>
  );
};

export default Services;
