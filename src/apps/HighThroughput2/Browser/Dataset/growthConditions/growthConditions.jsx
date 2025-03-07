import React, { useMemo } from 'react';
import Style from './growthC.module.css';

export default function GrowthConditions({ growthCondition }) {
    const informations = useMemo(() => {
        if (!Array.isArray(growthCondition)) return [];

        return growthCondition
            .map(gc => {
                if (!gc || typeof gc !== "object") return null;

                const filteredEntries = Object.entries(gc).filter(
                    ([key, value]) => key !== "__typename" && value !== null
                );

                return filteredEntries.map(([key, value]) => ({
                    title: key.toUpperCase().replace(/_/g, ' '),
                    data: value,
                }));
            })
            .filter(Boolean);
    }, [growthCondition]);

    if (!informations || informations.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>GROWTH CONDITIONS</h2>
            <div className={Style.gridContainer}>
                {informations.map((row, rowIndex) => (
                    <div key={`row_${rowIndex}`} className={Style.row}>
                        {row.map((gc, i) => (
                            <BitInfo key={`bgrowth_${rowIndex}_${i}`} title={gc.title} data={gc.data} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function BitInfo({ title, data }) {
    return (
        <div className={Style.gridItem}>
            <p className={Style.title}>{title}</p>
            <p className={Style.data}>{data}</p>
        </div>
    );
}