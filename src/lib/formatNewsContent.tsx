import React from 'react';

/**
 * Formats news content:
 * 1. Bolds text inside 【】 and []
 * 2. Adds a line break before 【日系企業向けの示唆】 and [Insight for Japanese executives]
 */
export function formatNewsContent(text: string): React.ReactNode[] {
  if (!text) return [];

  // First, insert line breaks before insight sections
  const withBreaks = text
    .replace(/\s*【日系企業向けの示唆】/g, '\n\n【日系企業向けの示唆】')
    .replace(/\s*\[Insight for Japanese executives\]/gi, '\n\n[Insight for Japanese executives]');

  // Split by bracket patterns and bold them
  const parts = withBreaks.split(/(【[^】]*】|\[[^\]]*\])/g);

  return parts.map((part, i) => {
    if (/^【[^】]*】$/.test(part) || /^\[[^\]]*\]$/.test(part)) {
      return <strong key={i}>{part}</strong>;
    }
    // Handle line breaks
    if (part.includes('\n\n')) {
      const segments = part.split('\n\n');
      return segments.map((seg, j) => (
        <React.Fragment key={`${i}-${j}`}>
          {j > 0 && <><br /><br /></>}
          {seg}
        </React.Fragment>
      ));
    }
    return part;
  });
}
