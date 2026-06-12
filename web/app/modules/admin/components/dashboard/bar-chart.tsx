
import React from "react";
import { cn } from "../../../../shared/utils/cn";

export default function BarChart({
    data,
    title,
    text,
    dataTitle,
}: {
    data?: { label: string; value: number }[];
    title?: string;
    text?: string;
    dataTitle?: string;
}

) {
    const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);

    return (
        <div className="flex flex-col h-64 md:h-80 w-full rounded-xl bg-surface p-4 border border-border shadow-md">
            <div className="flex flex-row items-center justify-between mb-4">
                <div>
                    <h2 className="text-md font-medium text-foreground">{title || "Data"}</h2>
                    {text && <p className="text-sm text-foreground-muted">{text}</p>}

                    {hoveredBar !== null && data && (
                        <div className="bg-surface border border-border rounded-md p-1 text-xs text-foreground shadow-sm absolute mt-1">
                            <p>{data[hoveredBar].label}: {data[hoveredBar].value} {dataTitle}</p>
                        </div>
                    )}

                </div>

                <div className="flex items-center gap-2">
                    <div className="size-3 bg-brand-secondary rounded-sm" />
                    {dataTitle && <p className="text-sm text-foreground-muted">{dataTitle}</p>}
                </div>
            </div>


            {data && data.length > 0 ? (
                <div className="flex flex-row items-end justify-around w-full h-full gap-2 overflow-x-scroll">
                    {data.map((item, index) => {
                        const maxVal = Math.max(...data.map(d => d.value)) || 1;
                        const barHeight = (item.value / maxVal) * 80;
                        return (


                            <div className="flex flex-1 flex-col justify-end h-full min-w-15 max-w- gap-1" key={index} >
                                <div
                                    style={{ height: `${barHeight}%` }}
                                    className={cn("bg-brand-secondary rounded-t-xl min-h-1",
                                        hoveredBar === index && "scale-105 border-3 border-brand-third transition-transform duration-200"
                                    )}
                                    onMouseEnter={(e) => {
                                        setHoveredBar(index);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredBar(null);
                                    }}
                                    onClick={() => { setHoveredBar(index); }}

                                />
                                <p className="text-xs text-foreground-muted text-center">{item.label}</p>

                            </div>





                        );
                    })}


                </div>


            ) : (
                <div className="flex items-center justify-center w-full h-full rounded-xl bg-gray-200 p-4">
                    <h2 className="text-lg font-medium text-foreground-muted mb-4">Ingen data tillgänglig</h2>
                </div>
            )}
        </div>

    );
}
