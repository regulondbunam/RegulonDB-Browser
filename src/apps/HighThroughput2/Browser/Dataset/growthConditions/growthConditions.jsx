import React, { useMemo } from 'react';
import Style from './growthC.module.css';

const CONDITION_ORDER = [
    "Experiment ID",
    "Experiment Title",
    "Organism",
    "Genetic Background",
    "Medium",
    "Medium Supplements",
    "Aeration",
    "Temperature",
    "pH",
    "Pressure",
    "Growth Phase",
    "Optical Density",
    "Growth Rate",
    "Vessel Type",
    "Agitation Speed",
    "Other Terms"
];

const TITLE_MAPPING = {
    experimentId: "Experiment ID",
    experimentTitle: "Experiment Title",
    organism: "Organism",
    geneticBackground: "Genetic Background",
    medium: "Medium",
    mediumSupplements: "Medium Supplements",
    aeration: "Aeration",
    temperature: "Temperature",
    pH: "pH",
    pressure: "Pressure",
    growthPhase: "Growth Phase",
    opticalDensity: "Optical Density",
    growthRate: "Growth Rate",
    vesselType: "Vessel Type",
    agitationSpeed: "Agitation Speed",
    otherTerms: "Other Terms"
};

export default function GrowthConditions({ growthCondition }) {
    const informations = useMemo(() => {
        if (!Array.isArray(growthCondition)) return [];

        return growthCondition
            .map(gc => {
                if (!gc || typeof gc !== "object") return null;

                const filteredEntries = Object.entries(gc).filter(
                    ([key, value]) => key !== "__typename" && value !== null
                );

                // Transform keys into titles and sort based on CONDITION_ORDER
                const transformedEntries = filteredEntries.map(([key, value]) => ({
                    title: TITLE_MAPPING[key] || key.toUpperCase().replace(/_/g, ' '),
                    data: value,
                }));

                // Sort entries based on CONDITION_ORDER
                transformedEntries.sort((a, b) => {
                    const indexA = CONDITION_ORDER.indexOf(a.title);
                    const indexB = CONDITION_ORDER.indexOf(b.title);
                    return indexA - indexB;
                });

                return transformedEntries;
            })
            .filter(Boolean); // Remove null or empty rows
    }, [growthCondition]);

    if (!informations || informations.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>EXPERIMENT DETAILS</h2>
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
    const isExperimentID = title === "Experiment ID";

    return (
        <div className={Style.gridItem}>
            <p className={Style.title}>{title}</p>
            <p className={Style.data}>
                {isExperimentID ? (
                    <a
                        href={`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${data}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                        {data}
                    </a>
                ) : (
                    data
                )}
            </p>
        </div>
    );
}