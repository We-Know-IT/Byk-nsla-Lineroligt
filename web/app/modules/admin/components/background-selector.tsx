"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSettings } from "./settings-context";
import { cn } from "../../../shared/utils/cn";

type BackgroundPreset = {
    key: string;
    label: string;
    imageSrc: string;
    isActive: boolean;
};

export default function BackgroundSelector() {
    const [loading, setLoading] = useState(true);
    const [backgrounds, setBackgrounds] = useState<BackgroundPreset[]>([]);
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const originalKeyRef = useRef<string | null>(null);
    const { registerSaveAction, unregisterSaveAction, registerResetAction, unregisterResetAction, setHasChanges } = useSettings();

    const loadBackgrounds = useCallback(async () => {
        try {
            const res = await fetch("/api/site-themes/backgrounds");
            if (!res.ok) {
                return;
            }

            const data = await res.json();
            if (data.success && data.data) {
                setBackgrounds(data.data.backgrounds);
                const activeItem = data.data.backgrounds.find((background: BackgroundPreset) => background.isActive);
                const key = activeItem?.key ?? data.data.activeBackgroundKey ?? data.data.backgrounds[0]?.key ?? null;
                originalKeyRef.current = key;
                setSelectedKey(key);
            }
        } catch (err) {
            console.error("Failed to load backgrounds:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadBackgrounds();
    }, [loadBackgrounds]);

    const handleSave = useCallback(async () => {
        if (!selectedKey || selectedKey === originalKeyRef.current) return;

        const res = await fetch("/api/site-themes/backgrounds/active", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: selectedKey }),
        });
        const result = await res.json();
        if (!result.success) {
            throw new Error(result.error?.message || "Failed to save background");
        }
        originalKeyRef.current = selectedKey;
        setHasChanges("background", false);
    }, [selectedKey, setHasChanges]);

    const handleReset = useCallback(() => {
        setSelectedKey(originalKeyRef.current);
        setHasChanges("background", false);
        setIsOpen(false);
    }, [setHasChanges]);

    useEffect(() => {
        registerSaveAction("background", handleSave);
        registerResetAction("background", handleReset);
        return () => {
            unregisterSaveAction("background");
            unregisterResetAction("background");
        };
    }, [handleReset, registerResetAction, registerSaveAction, unregisterResetAction, unregisterSaveAction, handleSave]);

    const handleChange = (key: string) => {
        setSelectedKey(key);
        setHasChanges("background", key !== originalKeyRef.current);
    };

    const handleUpload = () => {
        //TODO: Upload functionality
    };

    if (loading) {
        return <div className="p-4 text-sm">Laddar bilder...</div>;
    }

    const active = backgrounds.find((b) => b.key === selectedKey) || backgrounds.find((b) => b.isActive) || backgrounds[0] || null;

    return (
        <div className="w-full">
            <div className="mb-4 rounded-2xl border border-border bg-surface p-3 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-1">
                        <h3 className="text-base font-semibold">Bakgrundsbild</h3>
                        <p className="text-sm text-foreground-muted">
                            Välj en bild som visar er stad, by eller stadsdel.
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                    <div className="relative aspect-21/8 overflow-hidden bg-surface">
                        {active ? (
                            <>
                                <img
                                    src={active.imageSrc}
                                    alt={active.label}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                                    <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                                        Aktiv bakgrund
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex h-full items-center justify-center bg-brand-third/5 text-sm font-medium text-foreground-muted">
                                Ingen bakgrundsbild vald
                            </div>
                        )}
                    </div>

                    <div className="border-t border-border p-3">
                        <button
                            type="button"
                            onClick={() => setIsOpen((current) => !current)}
                            aria-expanded={isOpen}
                            className="flex w-full items-center justify-between gap-3 rounded-xl px-1 py-1 text-left transition-colors hover:bg-brand-third/10"
                        >
                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-foreground">
                                    {active?.key || "Välj bakgrund"}
                                </div>
                                <div className="text-xs text-foreground-muted">
                                    {backgrounds.length} tillgängliga bilder
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
                                isOpen ? "max-h-128 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
                            )}
                        >
                            <div className={cn("mt-3 grid gap-3", backgrounds.length > 0 ? "sm:grid-cols-2" : "sm:grid-cols-1")}>
                                {backgrounds.length > 0 ? (
                                    backgrounds.map((background) => {
                                        const isSelected = background.key === selectedKey;

                                        return (
                                            <button
                                                key={background.key}
                                                type="button"
                                                onClick={() => handleChange(background.key)}
                                                className={cn(
                                                    "group overflow-hidden rounded-2xl border bg-background text-left transition-all hover:-translate-y-0.5 hover:shadow-sm",
                                                    isSelected ? "border-brand-secondary border-2 ring-1 ring-brand-secondary/30" : "border-border"
                                                )}
                                            >
                                                <div className="relative aspect-21/8 overflow-hidden bg-surface">
                                                    <img
                                                        src={background.imageSrc}
                                                        alt={background.label}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between gap-3 p-2">
                                                    <div className="min-w-0">
                                                        <div className="truncate text-sm font-medium text-foreground">
                                                            {background.key}
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={cn(
                                                            "size-2.5 shrink-0 rounded-full",
                                                            isSelected ? "border-brand-secondary bg-brand-secondary" : "border-border bg-transparent"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={() => handleUpload()}
                                        className="col-span-full overflow-hidden rounded-2xl border border-dashed border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-sm"
                                        >
                                        <div className="flex aspect-21/8 flex-col items-center justify-center gap-2 bg-brand-third/5 p-4 text-center">
                                            <p className="text-sm font-medium text-foreground">Ladda upp bild</p>
                                            <p className="max-w-xs text-xs leading-5 text-foreground-muted">
                                                Lägg till minst en bakgrund för att visa valbara bilder här.
                                            </p>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
