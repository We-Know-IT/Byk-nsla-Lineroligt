import { getEnabledModuleNavItems } from "../../shared/config/modules";
import { siteConfig } from "../../shared/config/site.config";
import SidebarNav from "../start/components/sidebar-nav";
import EventListingClient from "./components/event-listing-client";
import type { EventGridCardData } from "./model/data";

import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";


type EventPageProps = {
  cards: EventGridCardData[];
  listError: string | null;
};

export default async function EventPage({ cards, listError }: EventPageProps) {
  const isEnabled = await checkModuleEnabled("pagang");
  if (!isEnabled) {
    notFound();
  }
  const navItems = await getEnabledModuleNavItems();
  return (
    <main className="min-h-screen bg-background">

      <div className="flex md:min-h-[calc(100vh-66px)] flex-col md:flex-row">
        <SidebarNav items={navItems} activeKey="pagang" />

        <section
          className="flex flex-1 flex-col gap-2.5 px-4 pb-8 pt-4"
          aria-label="På gång i {siteConfig.areaName}"
        >
          <h1 className="m-0 text-[34px] font-semibold leading-tight text-foreground">
            På gång i {siteConfig.areaName}
          </h1>
          <p className="m-0 text-sm leading-snug text-foreground-muted">
            Visar demo-evenemang tills en extern eventplattform är ansluten.
          </p>

          {listError ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>{listError}</p>
              <p>Visar exempeldata tills tjänsten är tillgänglig.</p>
            </div>
          ) : null}

          {!listError && cards.length === 0 ? (
            <div
              className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
              role="status"
            >
              <p>Inga evenemang finns tillgängliga just nu.</p>
            </div>
          ) : null}

          <EventListingClient cards={cards} />
        </section>
      </div>
    </main>
  );
}
