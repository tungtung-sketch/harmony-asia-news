// src/components/NewsCardLocal.tsx
// Local news card for newsData.ts structure

type Props = {
  title: string;
  excerpt: string;
  category: string;
  time: string;
  author: string;
  location: string;
  featured?: boolean;
  image?: string;
};

const NewsCardLocal = ({ title, excerpt, category, time, author, location, featured, image }: Props) => {
  return (
    <article className={`flex flex-col justify-between border rounded-2xl p-4 md:p-5 bg-card hover:shadow-md transition-shadow h-full ${featured ? 'md:col-span-1' : ''}`}>
      {/* Image if featured */}
      {featured && image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
      )}

      {/* meta */}
      <p className="text-xs text-muted-foreground mb-1">
        {time} {category && `・${category}`} {author && `・${author}`} {location && `・${location}`}
      </p>

      {/* title */}
      <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>

      {/* excerpt */}
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
        {excerpt}
      </p>
    </article>
  );
};

export default NewsCardLocal;
