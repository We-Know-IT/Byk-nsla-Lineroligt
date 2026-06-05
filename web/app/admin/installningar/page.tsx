"use client";

import { useEffect } from "react";
import { AdminSectionPage, adminNavItems } from "../../modules/admin";
import ThemeSelector from "../../modules/admin/components/theme-selector";
import StartPageSectionsSelector from "../../modules/admin/components/start-page-sections-selector";
import BackgroundSelector from "../../modules/admin/components/background-selector";
import PageSelector from "@/app/modules/admin/components/page-selector";
import SectionHeader from "../../shared/ui/section-header";
import { SettingsActionsBar, SettingsProvider } from "../../modules/admin/components/settings-context";

export default function Page() {
    useEffect(() => {
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload();
            }
        };

        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    return (
        <AdminSectionPage activeKey="installningar" navItems={adminNavItems}>
            <div className="relative flex flex-col pt-1">
                <SettingsProvider>
                    <SectionHeader title="Inställningar" as="h1" />
                    <p className="my-2 w-full text-foreground-muted md:mb-6 md:w-3/4">
                        Ändra plattformens innehåll, sidor, bilder och färgtema för att skräddarsy plattformen för din by.
                    </p>
                    <div className="mb-2 flex justify-end">
                        <SettingsActionsBar />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <section className="mb-0">
                            <h2 className="mb-4 text-lg font-semibold">Startsidesektioner</h2>
                            <div className="mt-2">
                                <StartPageSectionsSelector />
                            </div>
                        </section>
                        <section className="mb-0">
                            <h2 className="mb-4 text-lg font-semibold">Sidor</h2>
                            <PageSelector />
                        </section>
                        <section className="mb-0">
                            <h2 className="mb-4 text-lg font-semibold">Design</h2>
                            <div className="mt-2">
                                <ThemeSelector />
                                <BackgroundSelector />
                            </div>
                        </section>
                    </div>
                </SettingsProvider>
            </div>
        </AdminSectionPage>
    );
}
