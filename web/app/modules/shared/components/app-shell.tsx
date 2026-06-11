"use client";

import { usePathname } from "next/navigation";
import SidebarNav, { type SidebarNavItem } from "./sidebar/sidebar-nav";

type AppShellProps = {
  publicNavItems: readonly SidebarNavItem[];
  adminNavItems: readonly SidebarNavItem[];
  children: React.ReactNode;
};

export default function AppShell({
  publicNavItems,
  adminNavItems,
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const navItems = isAdmin ? adminNavItems : publicNavItems;

  return (
    <>
      <SidebarNav
        items={navItems}
        ariaLabel={isAdmin ? "Adminnavigation" : undefined}
      />
      <main className="flex-1 min-h-screen overflow-y-auto">{children}</main>
    </>
  );
}
