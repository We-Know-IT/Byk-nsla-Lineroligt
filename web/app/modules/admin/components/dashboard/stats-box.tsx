

export default function StatsBox({
    title,
    value,
    goal,
    goalText,
    previousValue,
    iconSrc,
}: {
    title: string;
    value: string | number;
    goal?: string | number;
    goalText?: string;
    previousValue?: string | number;
    iconSrc?: string;
}) {

    const percentage = goal ? Math.min((Number(value) / Number(goal)) * 100, 100) : 0;


    const handlePercentageChange = () => {
        const percentageChange = previousValue !== undefined ? ((Number(value) - Number(previousValue)) / Number(previousValue)) * 100 : 0;
        const isPositiveChange = percentageChange > 0;
        const changeTextColor = isPositiveChange ? "text-green-800" : "text-red-800";
        const changeBgColor = isPositiveChange ? "bg-green-200" : "bg-red-200";
        const changeIcon = isPositiveChange ? "+" : "-";

        if (previousValue === undefined) return null;
        return (
            <div className={`rounded-full ${changeTextColor} ${changeBgColor} m-4 py-1 px-2 text-xs`}>
                <p>{changeIcon} {Math.round(Math.abs(percentageChange))}%</p>
            </div>
        );
    };


    return (
        <div className="relative rounded-xl border border-border bg-surface p-4 shadow-sm mb-4 w-full">
            <div className="bg-brand-foreground rounded-2xl p-2 mb-4 w-max">
                {iconSrc && <img src={iconSrc} alt="" className="h-6 w-6" />}
            </div>
            <p className="text-3xl font-bold text-primary mb-2">{value}</p>
            <h3 className="text-sm font-medium text-foreground-muted mb-2">{title}</h3>

            {previousValue !== undefined && (
                <div className="absolute top-0 right-0 items-center">
                    {handlePercentageChange()}
                </div>
            )}

            {goal && (
                <>
                    <div className="flex items-center gap-2">
                        <div className="w-full h-1 rounded-full bg-border">
                            <div className="h-1 rounded-full bg-brand-secondary" style={{ width: `${percentage}%` }} />
                        </div>
                    </div>

                    {goalText ? (
                        <p className="text-xs text-foreground-muted mt-2 mb-1">
                            {goalText}
                        </p>

                    ) : (
                        <p className="text-xs text-foreground-muted mt-2 mb-1">
                            {Math.round(percentage)}% av målets {goal}
                        </p>
                    )}
                </>
            )}

        </div >

    );
};