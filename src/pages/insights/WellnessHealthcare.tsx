import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const WellnessHealthcare = () => {
  const title = "Wellness & Healthcare Insights | Harmony";
  const description =
    "Wellness and healthcare insights: medical tourism, aging society solutions, and digital health interoperability.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonicalPath="/insights/wellness-healthcare"
      />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Wellness & Healthcare Insights</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Opportunities across medical tourism, eldercare services, and
          cross-border digital health platforms.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Key Themes</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Accreditation and clinical partnerships</li>
                <li>Remote care and telemedicine frameworks</li>
                <li>Health data standards and privacy</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">What to Watch</h2>
              <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-1">
                <li>Insurance reimbursements and portability</li>
                <li>Workforce training and credentialing</li>
                <li>Public–private partnerships (PPP)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <nav className="mt-8 text-sm text-muted-foreground">
          <span className="mr-2">More industries:</span>
          <Link to="/insights/services" className="text-primary mr-3">Services</Link>
          <Link to="/insights/manufacturing" className="text-primary mr-3">Manufacturing</Link>
          <Link to="/insights/agriculture" className="text-primary mr-3">Agriculture</Link>
          <Link to="/insights/real-estate" className="text-primary">Real Estate</Link>
        </nav>
      </main>
    </>
  );
};

export default WellnessHealthcare;
