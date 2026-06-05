"use client";
import Link from "next/link";
import { cn } from "../../../shared/utils/cn";
import React, { useState, useEffect, useRef } from "react";

export type SidebarNavItem = {
  key: string;
  label: string;
  href: string;
  iconSrc?: string | null;
};

type SidebarNavProps = {
  items: readonly SidebarNavItem[];
  activeKey: string;
  ariaLabel?: string;
};

export default function SidebarNav({ items, activeKey, ariaLabel }: SidebarNavProps) {
  const [onMobile, setOnMobile] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;

    const saved = localStorage.getItem("sidebar-open");
    return saved ? JSON.parse(saved) : true;
  });

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setOnMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when sidebar is open on mobile
  useEffect(() => {
    if (onMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onMobile]);

  return (
    <>
      {onMobile && (
        <div className="h-14 w-full border-b border-border bg-surface md:hidden" />
      )}

      {/* Backdrop for mobile menu, handling close when clicked */}
      {onMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          // Mobile
          "fixed inset-y-0 left-0 z-40 h-screen w-64 border-r border-border bg-surface p-4 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",

          // Desktop
          "md:sticky md:top-0 md:h-screen md:translate-x-0 md:transition-all md:duration-200",
          isOpen
            ? "md:w-55 md:min-w-55 md:basis-55"
            : "md:w-18 md:min-w-18 md:basis-18"
        )}
        aria-label={ariaLabel ?? "Vänstermeny"}
        ref={sidebarRef}
      >
        <nav className="flex h-full flex-col gap-1.5 overflow-y-auto pb-0 md:gap-6">
          <div className="relative flex w-full flex-row items-center justify-between">
            <div
              className={cn(
                "grid min-h-9.5 w-auto shrink-0 grid-cols-[1fr_auto_1fr] items-center whitespace-nowrap rounded-full border border-border bg-surface text-sm leading-snug text-foreground no-underline md:w-full md:shrink md:whitespace-normal",
                !isOpen && "w-9.5 grid-cols-1 justify-items-center md:w-9.5"
              )}
            >
              <span className={cn("flex min-w-0 items-center gap-2 justify-self-start", !isOpen && "justify-self-center gap-0")}>
                <img
                  src="/icons/Frame.svg"
                  alt=""
                  className={cn(
                    "m-0.5 rounded-full bg-brand-secondary object-contain p-1",
                    !isOpen && "m-0"
                  )}
                  width={28}
                  height={28}
                  aria-hidden
                />
              </span>
              <span className={cn("my-2 justify-self-center text-center", !isOpen && "hidden")}>Förnamn</span>
              <img
                src="/icons/nav-arrow-right.svg"
                alt=""
                className={cn(
                  "mr-2.5 size-3 shrink-0 justify-self-end object-contain",
                  !isOpen && "hidden"
                )}
                width={12}
                height={12}
                aria-hidden
              />
            </div>
          </div>

          <button
            className={cn(
              "cursor-pointer rounded-md bg-surface shadow-sm flex shrink-0 items-center justify-center z-5",
              onMobile
                ? `absolute top-3.5 left-0 ${isOpen ? "translate-x-52" : "translate-x-68"}`
                : "absolute right-0 translate-x-4 translate-y-1"
            )}
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <img
              src={isOpen ? "/icons/arrow-left-tag.svg" : "/icons/arrow-right-tag.svg"}
              alt="MenuFold"
              className="size-7 object-fill transition-transform hover:scale-110"
            />
          </button>

          {items.map((item) => {
            const isActive = item.key === activeKey;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex min-h-9.5 w-auto shrink-0 items-center justify-between whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:w-full md:shrink md:whitespace-normal md:px-3 md:py-2.5",
                  isActive && "bg-brand-secondary text-background hover:bg-brand-secondary",
                  !isOpen && "justify-center md:px-2"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex min-w-0 items-center gap-2">
                  {item.iconSrc ? (
                    <img
                      src={item.iconSrc}
                      alt=""
                      className={cn(
                        "size-4.5 object-contain shrink-0",
                        isActive && "brightness-0 invert"
                      )}
                      aria-hidden
                    />
                  ) : null}
                  <span className={cn("text-left", !isOpen && "hidden")}>{item.label}</span>
                </span>
                <img
                  src="/icons/nav-arrow-right.svg"
                  alt=""
                  className={cn(
                    "size-3 shrink-0 object-contain",
                    isActive && "brightness-0 invert",
                    !isOpen && "hidden"
                  )}
                  width={12}
                  height={12}
                  aria-hidden
                />
              </Link>
            );
          })}

          <Link
            href={"/"}
            className={cn(
              "mt-auto flex min-h-9.5 w-auto shrink-0 items-center justify-between whitespace-nowrap rounded-full border-none bg-surface px-4 py-2 text-sm leading-snug text-foreground no-underline hover:bg-brand-third md:w-full md:shrink md:whitespace-normal md:px-3 md:py-2.5",
              !isOpen && "justify-center md:px-2"
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <img
                src={"/icons/question-mark.svg"}
                alt=""
                className="size-4.5 shrink-0 object-contain"
                width={18}
                height={18}
                aria-hidden
              />
              <span className={cn("text-left", !isOpen && "hidden")}>{"Hjälp"}</span>
            </span>
            <img
              src="/icons/nav-arrow-right.svg"
              alt=""
              className={cn(
                "size-3 shrink-0 object-contain",
                !isOpen && "hidden"
              )}
              width={12}
              height={12}
              aria-hidden
            />
          </Link>
        </nav>
      </aside>
    </>
  );
}