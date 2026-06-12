interface ColumnConfig {
    key: string;
    label: string;
}

export default function StatsList({
    title,
    text,
    columns,
    data,

}: {
    title: string;
    text?: string;
    columns?: ColumnConfig[];
    data: Record<string, any>[]; // Accepts any object structure
}

) {
    return (
        <div className="flex flex-col max-h-64 md:max-h-80 w-full rounded-xl bg-surface border border-border shadow-md">
            <div className="px-4 pt-4 border-b-3 border-border">
                <h2 className="text-md font-medium text-foreground">{title}</h2>
                {text && <p className="text-sm text-foreground-muted mb-2">{text}</p>}
            </div>

            <div className="overflow-x-auto md:mr-2">
                <table className=" w-full text-left border-collapse">
                    {/*Dynamic Headers */}
                    {columns && columns.length > 0 ? (
                        <thead>
                            <tr className="border-b border-border">
                                {columns.map((col) => (
                                    <th key={col.key} className="p-3 text-sm font-medium text-foreground">
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    ) : null}

                    {/*Dynamic Rows */}
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-border last:border-0 hover:bg-brand-third/20">

                                {columns && columns.length > 0 ? (
                                    columns.map((col) => (
                                        <td key={col.key} className="p-3 text-sm text-foreground-muted">
                                            {row[col.key] ?? '—'}
                                        </td>
                                    ))
                                ) : (
                                    <td className="p-3 text-sm text-foreground-muted">
                                        —
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};