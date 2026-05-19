import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

const SEO = ({ title, description, canonicalPath, noIndex }: SEOProps) => {
  const canonicalHref = canonicalPath
    ? `${window.location.origin}${canonicalPath}`
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow" />
      }
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
    </Helmet>
  );
};

export default SEO;
