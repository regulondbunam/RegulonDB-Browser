import Table from "./Table"
import { useMemo, useState } from 'react';

//Valida si el objeto entrante tiene un valor valido
function validObject(obj) {
    if (!obj) {
        return false
    }
    if (obj === null) {
        return false
    }
    return true
}

/**
 * Description placeholder
 * @date 6/5/2023 - 6:31:53 PM
 *
 * @export
 * @param {{ arraySummary?: {}; }} {arraySummary = []}
 * @returns {*}
 */
export default function TableView({ arraySummary = [] }) {
    const [showAll, setShowAll] = useState(false);
    const [mode, setMode] = useState("latest"); // latest | first
    const [search, setSearch] = useState("");

    const tableData = useMemo(() => {
        return formatTable(arraySummary);
    }, [arraySummary]);

    // 🔹 Filtrar filas por búsqueda
    const filteredRows = useMemo(() => {
        if (!search) return tableData.rows;

        return tableData.rows.filter(row =>
            row.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [tableData.rows, search]);

    // 🔹 Control de columnas visibles
    const visibleTableData = useMemo(() => {
        if (!tableData?.columns || !tableData?.rows) {
            return { columns: [], rows: [] };
        }

        const totalColumns = tableData.columns.length;

        if (showAll || totalColumns <= 11) {
            return {
                columns: tableData.columns,
                rows: filteredRows
            };
        }

        let visibleColumns;
        let visibleRows;

        if (mode === "latest") {
            const end = Math.min(11, totalColumns);

            visibleColumns = tableData.columns.slice(0, end);

            visibleRows = filteredRows.map(row => ({
                ...row,
                data: (row.data || []).slice(0, end - 1)
            }));
        } else {
            const start = totalColumns - 10;

            visibleColumns = [
                tableData.columns[0],
                ...tableData.columns.slice(start)
            ];

            visibleRows = filteredRows.map(row => ({
                ...row,
                data: (row.data || []).slice(start - 1)
            }));
        }

        return {
            columns: visibleColumns,
            rows: visibleRows
        };
    }, [tableData, showAll, mode, filteredRows]);

    return (
        <div>
            {/* 🔥 CONTROL BAR */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
                gap: "10px",
                flexWrap: "wrap"
            }}>
                {/* 🔍 Buscador */}
                <input
                    type="text"
                    placeholder="Search Item..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        minWidth: "200px",
                        marginLeft: "15px",
                        padding: "10px"
                    }}
                />

                {/* 🎛️ Controles derecha */}
                <div style={{ display: "flex", gap: "10px" }}>
                    {/* Selector de modo */}
                    <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        style={{ padding: "6px" }}
                    >
                        <option value="latest">Last 10 versions</option>
                        <option value="first">First 10 versions</option>
                    </select>

                    {/* Toggle */}
                    <button onClick={() => setShowAll(prev => !prev)}>
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                </div>
            </div>

            {/* 📊 Tabla */}
            <Table tableData={visibleTableData} />
        </div>
    );
}


function formatTable(data = []) {
    const result = {
        columns: ["Object"],
        rows: []
    };

    if (!Array.isArray(data) || data.length === 0) {
        return result;
    }

    const validData = data.filter(d => validObject(d.statistics));
    if (validData.length === 0) return result;

    const genomicObjects = {};
    const columnLabels = validData.map(
        row => `${row.regulonDBVersion} ${row.releaseDate}`
    );

    result.columns = ["Object", ...columnLabels];

    const totalColumns = validData.length;

    const ensureObject = (key, isChild = false) => {
        if (!genomicObjects[key]) {
            genomicObjects[key] = {
                values: Array(totalColumns).fill(null),
                isChild
            };
        }
    };

    const isLeaf = (obj) =>
        validObject(obj) && typeof obj.total === "number";

    validData.forEach((summary, colIndex) => {
        const stats = summary.statistics;

        Object.entries(stats).forEach(([statKey, stat]) => {
            if (!validObject(stat)) return;

            const type = stat.__typename;

            // ✅ 1. CASOS SIMPLES
            if (
                type === "detailedStatistics" // || type === "dbInfoExternalReferencesType"
            ) {
                ensureObject(statKey, false);
                genomicObjects[statKey].values[colIndex] = stat.total ?? null;
                return;
            }

            // ✅ 2. PRODUCTS
            if (type === "productsDBInfoType") {
                ensureObject(statKey, false);

                genomicObjects[statKey].values[colIndex] =
                    stat.total != null ? <strong>{stat.total}</strong> : null;

                Object.entries(stat).forEach(([subKey, subValue]) => {
                    if (subKey === "__typename") return;
                    if (!isLeaf(subValue)) return;

                    const childKey = `${statKey}.${subKey}`;
                    ensureObject(childKey, true);

                    genomicObjects[childKey].values[colIndex] = subValue.total;
                });

                return;
            }

            // ✅ 3. REGULONS
            if (type === "dbInfoRegulons") {
                ensureObject(statKey, false);

                genomicObjects[statKey].values[colIndex] =
                    stat.total != null ? <strong>{stat.total}</strong> : null;

                Object.entries(stat).forEach(([subKey, subValue]) => {
                    if (subKey === "__typename") return;
                    if (!isLeaf(subValue)) return;

                    const childKey = `${statKey}.${subKey}`;
                    ensureObject(childKey, true);

                    genomicObjects[childKey].values[colIndex] = subValue.total;
                });

                return;
            }

            // ✅ 4. externalDBSources
            if (type === "dbInfoExternalDBReferencesType") {
                ensureObject(statKey, false);

                genomicObjects[statKey].values[colIndex] =
                    stat.total != null ? <strong>{stat.total}</strong> : null;

                if (stat.origin && typeof stat.origin === "object") {
                    Object.entries(stat.origin).forEach(([subKey, value]) => {
                        if (subKey === "__typename") return;

                        const childKey = `${statKey}.${subKey}`;;
                        ensureObject(childKey, true);

                        genomicObjects[childKey].values[colIndex] = value;
                    });
                }

                return;
            }

            // ✅ 5. externalDBSources
            if (type === "dbInfoExternalReferencesType") {
                ensureObject(statKey, false);

                genomicObjects[statKey].values[colIndex] =
                    stat.total != null ? <strong>{stat.total}</strong> : null;

                if (stat.origin && typeof stat.origin === "object") {
                    Object.entries(stat.origin).forEach(([subKey, value]) => {
                        if (subKey === "__typename") return;

                        const childKey = `${statKey}.${subKey}`;;
                        ensureObject(childKey, true);

                        genomicObjects[childKey].values[colIndex] = value;
                    });
                }

                return;
            }

            // ✅ Extra. FALLBACK (por si agregan nuevos tipos)
            if (!type) {
                if (isLeaf(stat)) {
                    ensureObject(statKey, false);
                    genomicObjects[statKey].values[colIndex] = stat.total;
                    return;
                }

                Object.entries(stat).forEach(([subKey, subValue]) => {
                    if (!isLeaf(subValue)) return;

                    const childKey = `${statKey}.${subKey}`;
                    ensureObject(childKey, true);

                    genomicObjects[childKey].values[colIndex] = subValue.total;
                });
            }
        });
    });

    Object.entries(genomicObjects).forEach(([key, entry]) => {
        result.rows.push({
            label: key,
            isChild: entry.isChild,
            data: entry.values
        });
    });

    return result;
}