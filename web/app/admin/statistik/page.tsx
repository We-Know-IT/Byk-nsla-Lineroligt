"use client";

import { AdminSectionPage } from "../../modules/admin";
import SectionHeader from "../../shared/ui/section-header";

export default function Page() {
  return (
    <AdminSectionPage>
      <div className="relative flex flex-col pt-1">
        <SectionHeader title="Statistik" as="h1" />
        <p className="my-2 w-full text-foreground-muted md:mb-6 md:w-3/4">
          Se statistik och prestandamått för din plattform.
        </p>

      </div>
    </AdminSectionPage>
  );
}
