export function PostCardSkeleton() {
  return (
    <article className="bg-card-bg overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-border shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3 w-28 rounded-full bg-border" />
          <div className="h-2 w-16 rounded-full bg-border" />
        </div>
      </div>
      <div className="w-full aspect-square bg-border" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-20 rounded-full bg-border" />
        <div className="h-3 w-full rounded-full bg-border" />
        <div className="h-3 w-3/4 rounded-full bg-border" />
      </div>
    </article>
  );
}

export default function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  );
}
