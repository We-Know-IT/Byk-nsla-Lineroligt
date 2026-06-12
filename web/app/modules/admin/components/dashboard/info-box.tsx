
export default function InfoBox({
    title,
    text,
    iconSrc,
    data,
    showCounter,
}: {
    title: string;
    text?: string;
    iconSrc?: string;
    data?: { label: string; text: string; borderColor: string; bgColor: string }[];
    showCounter?: boolean;
}) {
    return (
        <div className="flex flex-col h-full w-full rounded-xl bg-surface p-4 border border-border shadow-sm">
            <div className="flex flex-row justify-between items-center gap-2 mb-4">
                <div className="flex flex-row gap-2">
                {iconSrc && <img src={iconSrc} alt="" className="h-6 w-6" />}
                {title && <h2 className="text-md font-medium text-foreground">{title}</h2>}
                </div>

                {showCounter && data &&
                 
                <div className="size-5 bg-brand-secondary rounded-full flex items-center justify-center text-xs text-white">{data.length}</div>}

            </div>
            {text && <p className="text-sm text-foreground-muted mb-2">{text}</p>}

            {data && data.length > 0 ? (
                <div className="flex flex-col gap-2 my-2">
                    {data.map((item, index) => (
                        <div key={index} className={`flex border-l-4 ${item.borderColor} flex-col py-2 px-4 items-start rounded-xl ${item.bgColor} gap-2 shadow-sm`}>
                            <div className="">
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                            </div>
                            <p className="text-xs text-foreground-muted">{item.text}</p>
                        </div>
                    ))}
                </div>

            ):( null )}

        </div>
    )
}