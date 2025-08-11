import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
}

const SEO = ({ title, description, canonicalPath }: SEOProps) => {
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
  }, [title, description, canonicalPath]);

  return null;
};

export default SEO;
