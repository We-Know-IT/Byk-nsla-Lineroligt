import type { StartCoverData } from "../model/data";

type StartCoverProps = {
  cover: StartCoverData;
};

export default function StartCover({ cover }: StartCoverProps) {
  return (
    <section
      aria-label={cover.title}
      className="relative h-[220px] overflow-hidden rounded-3xl border border-border bg-surface md:h-[250px]"
    >
      <img
        src={cover.imageSrc}
        alt={cover.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <h1 className="m-0 text-3xl font-bold leading-tight">{cover.title}</h1>
        <p className="m-0 mt-2 max-w-3xl text-sm leading-relaxed text-white/90">{cover.text}</p>
      </div>
    </section>
  );
}
