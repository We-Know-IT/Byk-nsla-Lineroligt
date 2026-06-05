import SidebarNav, { type SidebarNavItem } from "../../../modules/start/components/sidebar-nav";

type AdminSectionPageProps = {
  activeKey: string;
  navItems: readonly SidebarNavItem[];
  children?: React.ReactNode;
};

export default function AdminSectionPage({ activeKey, navItems, children }: AdminSectionPageProps) {
  return (
    <main className="min-h-screen bg-background">

      <div className="flex md:min-h-[calc(100vh-66px)] flex-col md:flex-row">
        <SidebarNav items={navItems} activeKey={activeKey} ariaLabel="Adminnavigation" />

        <section className="flex flex-1 flex-col px-4 pb-8 pt-4" aria-label="Admin">
          {children}
        </section>
      </div>
    </main>
  );
}
