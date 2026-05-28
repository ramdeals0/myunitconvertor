export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="relative w-full max-w-[728px] min-h-[90px] bg-muted/30 border border-border rounded-lg flex flex-col items-center justify-center overflow-hidden">
        <span className="absolute top-1.5 left-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          Advertisement
        </span>
        <div className="text-sm text-muted-foreground font-medium">
          Ad Space — 728 × 90
        </div>
      </div>
    </div>
  );
}

export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="relative w-full max-w-[300px] min-h-[250px] bg-muted/30 border border-border rounded-lg flex flex-col items-center justify-center overflow-hidden">
        <span className="absolute top-1.5 left-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          Advertisement
        </span>
        <div className="text-sm text-muted-foreground font-medium">
          Ad Space — 300 × 250
        </div>
      </div>
    </div>
  );
}
