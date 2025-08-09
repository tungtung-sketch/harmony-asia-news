const AdvertisementSection = () => {
  return (
    <aside aria-label="Advertisement" className="container mx-auto px-4 py-12">
      <div className="rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
        <div className="px-6 py-3 border-b text-xs uppercase tracking-wider">Advertisement</div>
        <div className="flex items-center justify-center h-32 sm:h-36 md:h-40 lg:h-48">
          <span className="text-sm">Your Ad Here (Responsive 728x90 / 970x90)</span>
        </div>
      </div>
    </aside>
  )
}

export default AdvertisementSection
