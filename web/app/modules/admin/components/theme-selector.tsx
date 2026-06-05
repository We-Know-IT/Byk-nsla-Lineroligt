"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSettings } from "./settings-context";
import { cn } from "../../../shared/utils/cn";

type ThemePreset = {
  key: string;
  label: string;
  description: string;
  isActive: boolean;
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    foreground: string;
    foregroundMuted: string;
    brandPrimary: string;
    brandSecondary: string;
    brandThird: string;
    brandForeground: string;
  };
};

export default function ThemeSelector() {
  const [themes, setThemes] = useState<ThemePreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const originalKeyRef = useRef<string | null>(null);
  const { registerSaveAction, unregisterSaveAction, registerResetAction, unregisterResetAction, setHasChanges } = useSettings();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    fetch(`${apiUrl}/site-themes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setThemes(data.data.themes);
          const activeItem = data.data.themes.find((t: ThemePreset) => t.isActive);
          const key = activeItem ? activeItem.key : (data.data.themes[0]?.key || null);
          originalKeyRef.current = key;
          setSelectedKey(key);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load themes:", err);
        setLoading(false);
      });
  }, []);

  const handleSave = useCallback(async () => {
    if (!selectedKey || selectedKey === originalKeyRef.current) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const res = await fetch(`${apiUrl}/site-themes/active`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: selectedKey }),
    });
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error?.message || "Failed to save theme");
    }
    originalKeyRef.current = selectedKey;
    setHasChanges("theme", false);
  }, [selectedKey, setHasChanges]);

  const handleReset = useCallback(() => {
    setSelectedKey(originalKeyRef.current);
    setHasChanges("theme", false);
  }, [setHasChanges]);

  useEffect(() => {
    registerSaveAction("theme", handleSave);
    registerResetAction("theme", handleReset);
    return () => {
      unregisterSaveAction("theme");
      unregisterResetAction("theme");
    };
  }, [handleReset, registerResetAction, registerSaveAction, unregisterResetAction, unregisterSaveAction, handleSave]);

  const handleChange = (key: string) => {
    setSelectedKey(key);
    setHasChanges("theme", true);
    setIsOpen(false);
  };

  if (loading) {
    return <div className="text-sm p-4">Laddar teman...</div>;
  }

  const active = themes.find((t) => t.key === selectedKey) || themes[0];

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm mb-4">
        <div className="mb-2 flex flex-col gap-1">
          <h3 className="text-base font-semibold">Färgpalett</h3>
          <p className="text-sm text-foreground-muted">
            Välj en färgpalett som beskriver er stad och visar er känsla.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background p-3">
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1 text-left transition-colors hover:bg-brand-third/20"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="min-w-0 text-sm font-semibold text-foreground">{active?.label || "Välj tema"}</div>
              <div className="flex items-center gap-1.5">
                <span
                  className="size-4 rounded-full border border-border"
                  style={{ backgroundColor: active?.colors?.brandSecondary || "#ccc" }}
                  aria-hidden="true"
                />
                <span
                  className="size-4 rounded-full border border-border"
                  style={{ backgroundColor: active?.colors?.brandThird || "#ccc" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <img
              src="/icons/nav-arrow-right.svg"
              alt=""
              aria-hidden="true"
              className={cn("size-5 shrink-0 transition-transform", isOpen && "rotate-90")}
            />
          </button>

          <div
            aria-hidden={!isOpen}
            className={cn(
              "overflow-hidden transition-all duration-200 ease-out",
              isOpen ? "max-h-96 opacity-100 pointer-events-auto space-y-2" : "max-h-0 opacity-0 pointer-events-none"
            )}
          >
            {themes.map((theme) => {
              const isSelected = theme.key === selectedKey;

              return (
                <button
                  key={theme.key}
                  type="button"
                  onClick={() => handleChange(theme.key)}
                  className={cn(
                    "mt-3 flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors hover:bg-brand-third/15",
                    isSelected ? "border-brand-secondary bg-brand-third/10" : "border-border bg-background",
                  )}
                >
                  <span className="min-w-0 truncate text-sm font-medium text-foreground">{theme.label}</span>
                  <span className="ml-3 flex shrink-0 items-center gap-1.5" aria-hidden="true">
                    <span
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: theme.colors.brandSecondary }}
                    />
                    <span
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: theme.colors.brandThird }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}