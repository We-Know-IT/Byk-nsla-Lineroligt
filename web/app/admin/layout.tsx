import type { ReactNode } from "react";
import AppTopbar from "../shared/ui/app-topbar";

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AppTopbar />
      {children}
    </>
  );
}
