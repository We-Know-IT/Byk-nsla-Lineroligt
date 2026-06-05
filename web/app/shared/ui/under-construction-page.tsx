import type { ModuleKey } from "../config/modules";
import { getEnabledModuleNavItems } from "../config/modules";
import { siteConfig } from "../config/site.config";
import SidebarNav from "../../modules/start/components/sidebar-nav";

import { notFound } from "next/navigation";
import { checkModuleEnabled } from "../../api/site-navigation/routeGuard";

type UnderConstructionPageProps = {
  activeKey: ModuleKey;
  title: string;
};

export default async function UnderConstructionPage({
  activeKey,
  title,
}: UnderConstructionPageProps) {
  const isEnabled = await checkModuleEnabled(activeKey);
  if (!isEnabled) {
    notFound();
  }
  const navItems = await getEnabledModuleNavItems();
  return (
    <main className="min-h-screen bg-background">

      <div className="flex md:min-h-[calc(100vh-66px)] flex-col md:flex-row">
        <SidebarNav items={navItems} activeKey={activeKey} />

        <section className="flex flex-1 flex-col gap-5.5 px-4 pb-8 pt-4" aria-label={`${title} sida`}>
          <div className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_h1]:mb-2 [&_h1]:mt-0 [&_h1]:text-[28px] [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-foreground [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted">
            <h1>{title}</h1>
            <p>{siteConfig.labels.underConstruction}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
