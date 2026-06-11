import { cn } from "../../../../shared/utils/cn";
import React, { useState } from "react";

type MyAccountProps = {
    userName?: string;
};

export default function MyAccount({ userName }: MyAccountProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (

        <div className="relative flex w-full flex-col overflow-hidden" onClick={() => setIsOpen(!isOpen)}>
            <div
                className={cn(
                    "flex w-full items-center justify-between p-1 border border-border bg-surface leading-snug",
                    isOpen ? "rounded-t-3xl" : "rounded-3xl hover:bg-brand-third",
                )}
            >
                {/*Profile Image */}
                <div className="flex shrink-0">
                    <img
                        src="/icons/profile-circle.svg"
                        alt=""
                        className={cn(
                            "rounded-full object-cover bg-surface",
                            "size-10"
                        )}
                        aria-hidden
                    />
                </div>

                {/*Text Block */}
                <div className="flex flex-col items-center justify-center flex-1 min-w-0 px-2">
                    <span className={cn(
                        "text-center text-sm font-medium block truncate w-full max-w-40",
                    )}>{userName || "Förnamn"}</span>

                    <span className={cn(
                        "text-center text-xs text-foreground-muted block truncate w-full",
                    )}>Mitt konto</span>
                </div>

                {/*Arrow*/}
                <div className="flex shrink-0 px-4 md:px-3">
                    <img
                        src="/icons/nav-arrow-right.svg"
                        alt=""
                        className={cn(
                            "size-3 object-contain transition-transform duration-200 ease-in-out",
                            isOpen ? "rotate-90" : "rotate-0",
                        )}
                        width={12}
                        height={12}
                        aria-hidden
                    />
                </div>
            </div>

            {/* Dropdown Menu*/}
            <div className={cn(
                "flex flex-col border-x border-b border-border bg-surface rounded-b-3xl overflow-hidden transition-all duration-400 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none",
            )}>
                <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-brand-third">Profil</a>
                <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-brand-third">Inställningar</a>
                <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-brand-third">Hjälp</a>
                <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-brand-third">Logga ut</a>
            </div>
        </div>
    );
}
