"use client";
import {useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

type BackgroundPreset = {
    key: string;
    label: string;
    imageSrc: string;
    isActive: boolean;
};

export default function BackgroundImage() {
    const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const originalKeyRef = useRef<string | null>(null);

    const loadBackgrounds = useCallback(async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        try {
            const res = await fetch(`${apiUrl}/site-themes/backgrounds`);
            const data = await res.json();
            if (data.success && data.data) {
                const activeItem = data.data.backgrounds.find((background: BackgroundPreset) => background.isActive);
                if (activeItem) {
                    setBackgroundUrl(activeItem.imageSrc);
                    if (originalKeyRef.current === null) {
                        originalKeyRef.current = activeItem.key;
                    } else if (originalKeyRef.current !== activeItem.key) {
                        setBackgroundUrl(activeItem.imageSrc);
                    }
                }
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

    return (
        <Image
            src={backgroundUrl || "/example-images/Strand.png"}
            alt="Bild som visar en översikt av byn"
            className="absolute inset-0 object-cover object-center"
            fill
            loading={loading ? "eager" : "lazy"}
        />
    );
}