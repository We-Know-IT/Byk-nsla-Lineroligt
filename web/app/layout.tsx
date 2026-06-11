import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig, siteThemeCssVars } from "./shared/config/site.config";
import "./globals.css";
import { getEnabledModuleNavItems } from "./shared/config/modules";
import { adminNavItems } from "./modules/admin/model/navigation";
import AppShell from "./modules/shared/components/app-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme = siteConfig.theme;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/site-themes/active`, {
      cache: "no-store",
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.data && result.data.colors) {
        theme = result.data.colors;
      }
    }
  } catch (error) {
    console.error("Failed to fetch active theme for layout", error);
  }

  const navItems = await getEnabledModuleNavItems();


  return (
    <html
      lang={siteConfig.htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={siteThemeCssVars(theme) as CSSProperties}
    >
      <body className="m-0 min-h-full flex flex-row bg-surface font-sans text-foreground">
        <AppShell publicNavItems={navItems} adminNavItems={adminNavItems}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
