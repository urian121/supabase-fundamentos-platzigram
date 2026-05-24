type HearderProps = {
  title: string;
}

function Hearder({ title }: HearderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card-bg">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-center">
          <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
      </header>
  )
}

export default Hearder
