import { siteConfig } from "../../shared/config/site.config";
import { getEvents } from "../event/event-api";
import FrivilligkraftCard from "../../frivilligkraft/components/frivilligkraft-card";
import { getFrivilligkraftMissions } from "../../frivilligkraft/frivilligkraft-api";
import SamhallsbyggeMap from "../../samhallsbygge/components/samhallsbygge-map";
import { getSamhallsbyggeItems } from "../../samhallsbygge/samhallsbygge-api";
import EventCard from "../event/components/event-card";
import SectionHeader from "../../shared/ui/section-header";
import { cityCards, sectionDescription } from "./model/data";
import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";
import Hero from "../shared/components/hero/hero";

const formatStartEventDate = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const hasTime = value.includes("T") && /\d{2}:\d{2}/.test(value);
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    ...(hasTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(parsed);
};

const formatFrivilligkraftDate = (isoDate: string | null): string | null => {
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

export default async function StartPage() {
  const isEnabled = await checkModuleEnabled("start");
  if (!isEnabled) {
    notFound();
  }

  const [
    { events, error: eventError },
    { missions: frivilligkraftMissions, error: frivilligkraftError },
    { items: samhallsbyggeItems, error: samhallsbyggeError },
  ] = await Promise.all([
    getEvents(),
    getFrivilligkraftMissions({
      geoLocationIds: siteConfig.frivilligkraft.geoLocationIds,
      skip: 0,
      take: siteConfig.frivilligkraft.startTeaserCount,
    }),
    getSamhallsbyggeItems({ area: siteConfig.areaName }),
  ]);

  const eventCards =
    !eventError && events.length > 0
      ? events.slice(0, 6).map((event) => ({
          id: event.id,
          title: event.title,
          date: formatStartEventDate(event.date),
          text: event.description,
          cta: event.url ? "Mer info" : "Knapp",
          imageSrc: event.imageUrl,
          eventUrl: event.url,
        }))
      : cityCards;
  const startTeasers = frivilligkraftMissions;
  const startSamhallsbygge = samhallsbyggeItems.slice(0, 3);

  return (
    <main className="min-h-screen min-w-0 bg-background">
      <div className="flex min-h-[calc(100vh-66px)] min-w-0 flex-col md:flex-row">
        <section
          className="flex min-w-0 flex-1 flex-col gap-5.5 px-4 pb-8 pt-4"
          aria-label="Startsida"
        >
          <Hero
            description={`Tillsammans skapar vi ett tryggt, levande och inkludernade ${siteConfig.areaName} - varje dag`}
            greeting={true}
            infoBar={true}
            weatherInfo={true}
          />

          <div className="flex flex-col gap-2">
            <SectionHeader title={`Vad händer i ${siteConfig.areaName}?`} withAction />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            <SamhallsbyggeMap items={startSamhallsbygge} />
            {samhallsbyggeError ? (
              <div
                className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
                role="status"
              >
                <p>{samhallsbyggeError}</p>
              </div>
            ) : null}
            {!samhallsbyggeError && startSamhallsbygge.length === 0 ? (
              <div
                className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
                role="status"
              >
                <p>Inga samhällsbyggnadsärenden hittades just nu.</p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader title={`På gång i ${siteConfig.areaName}`} withAction />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            {eventError ? (
              <div
                className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
                role="status"
              >
                <p>{eventError}</p>
                <p>Visar exempeldata tills tjänsten är tillgänglig.</p>
              </div>
            ) : null}
            <div className="min-w-0 w-full overflow-x-auto pb-0.5">
              <div className="flex w-max gap-2">
                {eventCards.map((card) => (
                  <div key={card.id} className="w-[188px] shrink-0">
                    <EventCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SectionHeader title="Hjälp till nära dig" withAction />
            <p className="m-0 text-sm leading-tight text-foreground-muted">{sectionDescription}</p>
            {frivilligkraftError ? (
              <div
                className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
                role="status"
              >
                <p>{frivilligkraftError}</p>
              </div>
            ) : null}
            {!frivilligkraftError && startTeasers.length === 0 ? (
              <div
                className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
                role="status"
              >
                <p>Inga frivilliguppdrag finns tillgängliga just nu.</p>
              </div>
            ) : null}
            {!frivilligkraftError && startTeasers.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {startTeasers.map((teaser) => (
                  <FrivilligkraftCard
                    key={teaser.id}
                    teaser={teaser}
                    dateLabel={formatFrivilligkraftDate(teaser.startDate)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
