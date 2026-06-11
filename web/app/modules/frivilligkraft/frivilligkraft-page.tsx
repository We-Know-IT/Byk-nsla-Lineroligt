import { siteConfig } from "../../shared/config/site.config";
import SectionHeader from "../../shared/ui/section-header";
import FrivilligkraftCard from "../../frivilligkraft/components/frivilligkraft-card";
import { getFrivilligkraftTeasers } from "../../frivilligkraft/frivilligkraft-api";
import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";

const formatDate = (isoDate: string | null): string | null => {
  if (!isoDate) {
    return null;
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

export default async function FrivilligkraftPage() {
  const isEnabled = await checkModuleEnabled("hjalptill");
  if (!isEnabled) {
    notFound();
  }

  const { teasers, error } = await getFrivilligkraftTeasers();

  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-[calc(100vh-66px)] flex-col md:flex-row">
        <section className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4" aria-label="Hjälp till">
          <div className="flex flex-col gap-2">
            <SectionHeader title={`Hjälp till i ${siteConfig.areaName}`} as="h1" />
            <p className="m-0 text-sm leading-snug text-foreground-muted">
              Hitta aktuella volontäruppdrag i ditt närområde.
            </p>
          </div>

          {error ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>{error}</p>
            </div>
          ) : null}

          {!error && teasers.length === 0 ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>Inga frivilliguppdrag finns tillgängliga just nu.</p>
            </div>
          ) : null}

          {!error && teasers.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {teasers.map((teaser) => (
                <FrivilligkraftCard key={teaser.id} teaser={teaser} dateLabel={formatDate(teaser.startDate)} />
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
