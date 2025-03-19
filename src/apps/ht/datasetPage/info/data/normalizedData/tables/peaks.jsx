import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import { TableI } from "../../../../../components/ui-components_old/ui_components"


export default function PEAKS({
    data
}) {

    const dataTable = useMemo(() => {
        let formatTable = {
            columns: [],
            rows: []
        };
        if (Array.isArray(data) && !data.length) {
            return formatTable
        }
        try {
            for (const property in data[0]) {
                //console.log(property)
                let dis = false
                let name = property
                switch (property) {
                    case "peakLeftPosition":
                        name = "START"
                        break;
                    case "peakRightPosition":
                        name = "END"
                        break;
                    case "score":
                        name = "SCORE"
                        break;
                    case "strand":
                        name = "STRAND"
                        break;
                    case "sequence":
                        name = "SEQUENCE"
                        break;
                    case "closestGenes":
                        name = "Closest Genes"
                        break;
                    default:
                        dis = true
                        break;
                }

                formatTable.columns.push({
                    name: name,
                    value: property,
                    disabled: dis
                });
            }
            data.forEach(tfbs => {
                let row = []
                for (const key in tfbs) {
                    if (Object.hasOwnProperty.call(tfbs, key)) {
                        let tfbs_prop = tfbs[key];
                        if (key === "closestGenes") {
                            tfbs_prop = linkGenes(tfbs_prop)
                        }
                        row.push({
                            data: tfbs_prop,
                            value: key
                        })
                    }
                }
                formatTable.rows.push(row)
            });
            return formatTable
        } catch (error) {
            return {
                columns: [],
                rows: []
            }
        }
    }, [data])
    //console.log(dataTable)
    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{ overflow: "auto" }} >
            <h3>PEAKS DATA</h3>
            <TableI dataTable={dataTable} />
        </div>
    )
}


function linkGenes(genes = []) {
    if(window.IN_URL?.isEmbed){
        return (
            <div >
                {
                    genes.map((gen) => {
                        return <p key={gen._id} style={{ marginLeft: "5px" }}>{gen.name}</p>
                    })
                }
            </div>
        )
    }
    return (
        <div >
            {
                genes.map((gen) => {
                    return <Link key={gen._id} style={{ marginLeft: "5px" }} to={`/gene/${gen._id}`} >{gen.name}</Link>
                })
            }
        </div>
    )
}
