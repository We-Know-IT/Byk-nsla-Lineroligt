import { siteConfig } from "../../shared/config/site.config";
import SectionHeader from "../../shared/ui/section-header";
import SamhallsbyggeCard from "../../samhallsbygge/components/samhallsbygge-card";
import SamhallsbyggeMap from "../../samhallsbygge/components/samhallsbygge-map";
import { getSamhallsbyggeItems } from "../../samhallsbygge/samhallsbygge-api";
import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";

export default async function SamhallsbyggePage() {
  const isEnabled = await checkModuleEnabled("bygg");
  if (!isEnabled) {
    notFound();
  }

  const { items, error } = await getSamhallsbyggeItems({ area: siteConfig.areaName });

  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-[calc(100vh-66px)] flex-col md:flex-row">
        <section className="flex flex-1 flex-col gap-3 px-4 pb-8 pt-4" aria-label="Bygg och utveckling">
          <div className="flex flex-col gap-2">
            <SectionHeader title={`Bygg & utveckling i ${siteConfig.areaName}`} as="h1" />
            <p className="m-0 text-sm leading-snug text-foreground-muted">
              Visar aktuella ärenden från Lunds geoportal filtrerat på området {siteConfig.areaName}.
            </p>
          </div>

          <SamhallsbyggeMap items={items} />

          {error ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>{error}</p>
            </div>
          ) : null}

          {!error && items.length === 0 ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>Inga samhällsbyggnadsärenden hittades just nu.</p>
            </div>
          ) : null}

          {!error && items.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <SamhallsbyggeCard key={item.id} item={item} />
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
