import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

const SEO = ({ title, description, canonicalPath, noIndex }: SEOProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    if (description) descTag.setAttribute('content', description);

    // Robots (noindex for 404 and other non-indexable pages)
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (noIndex) {
      if (!robotsTag) {
        robotsTag = document.createElement('meta');
        robotsTag.setAttribute('name', 'robots');
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute('content', 'noindex, nofollow');
    } else if (robotsTag) {
      robotsTag.remove();
    }

    // Canonical
    const href = canonicalPath
      ? `${window.location.origin}${canonicalPath}`
      : window.location.href;
    let linkTag = document.querySelector('link[rel="canonical"]');
    if (!linkTag) {
      linkTag = document.createElement('link');
      linkTag.setAttribute('rel', 'canonical');
      document.head.appendChild(linkTag);
    }
    linkTag.setAttribute('href', href);
  }, [title, description, canonicalPath, noIndex]);

  return null;
};

export default SEO;
