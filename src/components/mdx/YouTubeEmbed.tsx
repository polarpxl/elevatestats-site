export function YouTubeEmbed({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-card ring-1 ring-black/10">
      <div className="relative pb-[56.25%]">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title ?? 'YouTube video'}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
