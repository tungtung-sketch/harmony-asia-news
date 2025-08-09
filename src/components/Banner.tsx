import { Megaphone } from 'lucide-react'

const Banner = () => {
  return (
    <div role="region" aria-label="Site banner" className="w-full bg-primary/10 text-foreground">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
        <Megaphone className="h-4 w-4 text-primary" aria-hidden="true" />
        <p className="text-center">
          Welcome to HARMONY — Insightful news, reports, and Thailand 101. <a href="#pricing" className="underline hover:text-primary">Subscribe for full access</a>.
        </p>
      </div>
    </div>
  )
}

export default Banner
