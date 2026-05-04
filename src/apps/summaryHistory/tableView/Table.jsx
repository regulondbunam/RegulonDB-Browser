import Style from "./table.module.css";

export default function Table({ tableData }) {
    const columns = tableData?.columns || [];
    const rows = tableData?.rows || [];

    return (
        <table className={Style.shTable}>
            <thead className={Style.thead}>
                <tr>
                    {columns.map((column, i) => (
                        <th key={i} className={Style.th}>
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className={Style.body}>
            {
                rows.map((row, i) => {
                    const displayLabel = row.label.includes(".")
                        ? row.label.split(".")[1]
                        : row.label;

                    return (
                        <tr key={i}>
                            <td className={`${Style.td} ${row.isChild ? Style.child : Style.parent}`}>
                                {row.isChild && <span className={Style.arrow}>↳</span>}
                                {displayLabel}
                            </td>

                            {row.data.map((cell, j) => (
                                <td key={j} className={Style.td}>
                                    {cell ?? "-"}
                                </td>
                            ))}
                        </tr>
                    );
                })
            }
        </tbody>
        </table>
    );
}