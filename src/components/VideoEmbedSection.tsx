export default function VideoEmbedSection({ videoId }: { videoId: string }) {
  return (
    <figure className="mt-6">
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="size-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Dokumentasi proses pencacahan, peleburan, dan pencetakan paving block oleh Mahasiswa KKN 33 UMC"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Dokumentasi proses pencacahan, peleburan, dan pencetakan paving block oleh Mahasiswa KKN 33
        UMC.
      </figcaption>
    </figure>
  );
}
