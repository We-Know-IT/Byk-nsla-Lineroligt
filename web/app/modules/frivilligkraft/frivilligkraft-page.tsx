import { siteConfig } from "../../shared/config/site.config";
import SectionHeader from "../../shared/ui/section-header";
import FrivilligkraftMissionList from "../../frivilligkraft/components/frivilligkraft-mission-list";
import FrivilligkraftMap from "../../frivilligkraft/components/frivilligkraft-map";
import { getFrivilligkraftMissions } from "../../frivilligkraft/frivilligkraft-api";
import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";

export default async function FrivilligkraftPage() {
  const isEnabled = await checkModuleEnabled("hjalptill");
  if (!isEnabled) {
    notFound();
  }

  const { geoLocationIds, pageSize, mapMaxMissions } = siteConfig.frivilligkraft;
  const [{ missions, totalCount, error }, mapResult] = await Promise.all([
    getFrivilligkraftMissions({ geoLocationIds, skip: 0, take: pageSize }),
    getFrivilligkraftMissions({ geoLocationIds, skip: 0, take: mapMaxMissions }),
  ]);
  const mapMissions = mapResult.error ? [] : mapResult.missions;

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

          {mapMissions.length > 0 ? <FrivilligkraftMap missions={mapMissions} /> : null}

          {error ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>{error}</p>
            </div>
          ) : null}

          {!error && missions.length === 0 ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>Inga frivilliguppdrag finns tillgängliga just nu.</p>
            </div>
          ) : null}

          {!error && missions.length > 0 ? (
            <FrivilligkraftMissionList
              initialMissions={missions}
              totalCount={totalCount}
              geoLocationIds={geoLocationIds}
              pageSize={pageSize}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}
