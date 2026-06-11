"use client";

import { AdminSectionPage } from "../../modules/admin";
import SectionHeader from "../../shared/ui/section-header";

export default function Page() {
  return (
    <AdminSectionPage>
      <div className="relative flex flex-col pt-1">
        <SectionHeader title="Dashboard" as="h1" />
        <p className="my-2 w-full text-foreground-muted md:mb-6 md:w-3/4">
          Välkommen till adminpanelen! Här kan du hantera och anpassa din plattform för att bäst passa din bys behov.
        </p>

      </div>
    </AdminSectionPage>
  );
}
