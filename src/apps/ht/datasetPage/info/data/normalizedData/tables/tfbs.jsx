import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TableI } from "../../../../../components/ui-components_old/ui_components"
import { MKSequenceClass } from '../mkSequence'

export default function TFBS({
    data
}) {

    const dataTable = useMemo(() => {
        let formatTable = {
            columns: [],
            rows: []
        };
        if (Array.isArray(data) && !data.length) {
            return null
        }
        for (const property in data[0]) {
            //console.log(property)
            let dis = false
            let name = property
            switch (property) {
                case "chrLeftPosition":
                    name = "START"
                    break;
                case "chrRightPosition":
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
        if (Array.isArray(data)) {
            data.forEach(tfbs => {
                let row = []
                for (const key in tfbs) {
                    if (Object.hasOwnProperty.call(tfbs, key)) {
                        let tfbs_prop = tfbs[key];
                        if (key === "closestGenes") {
                            tfbs_prop = linkGenes(tfbs_prop)
                        }
                        if (key === "sequence") {
                            tfbs_prop = <MKSequenceClass
                                id_drawPlace={`${tfbs?.chrLeftPosition}_${tfbs?.chrRightPosition}_${tfbs?.sequence}_${toStrand(tfbs?.strand)}`}
                                sequence={tfbs?.sequence} />
                        }
                        row.push({
                            data: tfbs_prop,
                            value: key
                        })
                    }
                }
                formatTable.rows.push(row)
            });
        }
        return formatTable
    }, [data])
    //console.log(dataTable)
    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{overflow: "auto"}} >
            <h3>TFBS DATA</h3>
            <TableI dataTable={dataTable} />
        </div>
    )
}


function linkGenes(genes = []) {
    //console.log(window.finder);
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

function toStrand(strand) {
    if (strand === "+") {
        return strand.replace("+", "forward")
    }
    if (strand === "-") {
        return strand.replace("-", "reverse")
    }
    return strand.replace(strand, "wtf")
}
/*


function ViewData({ data }) {
   // console.log(data[0])

    if (Array.isArray(data) && !data.length) {
        console.warn("getDatasetAllTus array data is empty")
        return null
    }
    return (
        <div style={{overflow: "auto"}} >
            <TableI dataTable={dataTable} />
        </div>
    )
}


*/