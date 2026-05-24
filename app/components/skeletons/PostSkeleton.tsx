export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Área de imagen cuadrada */}
      <div className="w-full aspect-square rounded-xl bg-border" />

      {/* Textarea */}
      <div className="h-24 w-full rounded-xl bg-border" />

      {/* Botón publicar */}
      <div className="h-12 w-full rounded-xl bg-border" />
    </div>
  );
}
