import React, { useMemo } from 'react'
import FilterTable from '../FilterTable'
//import { schema_regulatorySite, schema_regulator } from './static'
import { DataVerifier } from 'ui-components/utils'
import { HeaderLabel } from './components'
import { Link } from 'react-router-dom'

export default function RegulatoryInteractions({
    isRegulators = false,
    regulatoryInteractions = []
}) {

    const table = useMemo(() => {
        let columns = []
        let data = []
        if (isRegulators) {
            columns.push({ key: "regulatorName", label: <HeaderLabel label="RegulonName" subLabel="function: repressor(-), activator(+), dual(+-))" /> })
        }
        if (DataVerifier.isValidArray(regulatoryInteractions)) {
            regulatoryInteractions.forEach(regulatoryInteraction => {
                let row = {}
                if (DataVerifier.isValidObjectWith_id(regulatoryInteraction?.regulator)) {
                    const regulator = regulatoryInteraction?.regulator
                    row["regulatorName"] = <Link to={"/regulon/" + regulator._id} value={`${regulator.name}${rFun(regulator.function)}`} ><RegulatorFunction name={regulator.name} regFunction={regulator.function} /></Link>
                }
                data.push(row)
            });
        }
        return { data: data, columns }
    }, [regulatoryInteractions, isRegulators])
    console.log(regulatoryInteractions);
    console.log(table);
    return (<FilterTable {...table} tableName={`${regulatoryInteractions.length} regulatory interactions`} titleVariant='relevant' />)
}


export const rFun = (f) => {
    const rf = {
        repressor: "-",
        activator: "+",
        dual: "+-"
    }
    return rf[f] ? rf[f] : ""
}

export const spanColor = (f) => {
    const rf = {
        repressor: "#FF0000",
        activator: "#14A054",
        dual: "#0000FF"
    }
    return rf[f] ? rf[f] : ""
}


function RegulatorFunction({ name = "", regFunction }) {
    return (
        <span style={{ color: spanColor(regFunction) }}>
            {name}
            {rFun(regFunction)}
        </span>
    );
}

export function getRISbyRBS(regulatorBindingSites = []) {
    if (!DataVerifier.isValidArray(regulatorBindingSites)) {
        return []
    }
    let regulatoryInteractions = []
    regulatorBindingSites.forEach(rbs => {
        if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
            rbs.regulatoryInteractions.forEach(ri => {
                regulatoryInteractions.push({
                    regulator: { ...rbs.regulator, function: rbs.function },
                    ...ri
                })
            });
        }
    });
    return regulatoryInteractions
}