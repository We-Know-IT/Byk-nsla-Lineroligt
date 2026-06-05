import type { SidebarNavItem } from "../../../modules/start/components/sidebar-nav";

export const adminNavItems = [
  { key: "dashboard", label: "Dashboard", href: "/admin", iconSrc: "/icons/home.svg" },
  { key: "installningar", label: "Inställningar", href: "/admin/installningar", iconSrc: "/icons/settings.svg" },
  { key: "statistik", label: "Statistik", href: "/admin/statistik", iconSrc: "/icons/stats-up-square.svg" },
  { key: "notiser", label: "Notiser", href: "/admin/notiser", iconSrc: "/icons/bell-notification.svg" },
] as const satisfies readonly SidebarNavItem[];
