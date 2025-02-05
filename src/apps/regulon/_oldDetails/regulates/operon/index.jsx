import React from 'react';
import FilterTable from '../../../../../components/ui-components/filterTable2';
import { Link } from 'react-router-dom';

const COLUMNS = [
    { label: "Operon",  width: 50 },
    { label: "Function",  width: 50 },
    { label: "First Gene",  width: 50 }
]

function formatTable(operons = []) {
    let data = []
    
    operons.forEach((operon) => {
        //console.log(operon.firstGene.name)
        data.push({
            "Operon": <div value={operon.name}>
                <Link to={"/operon/" + operon._id}>
                    <p>{`${operon.name}`}</p>
                </Link>
            </div>,
            "Function": operon.function,
            "First Gene": <div value={operon.firstGene.name}>
                <Link to={"/gene/" + operon.firstGene._id}>
                    <p>{`${operon.firstGene.name}`}</p>
                </Link>
            </div>
        })

    })
    return data
}

function Operon({ operons, idPanel = "regulates_operon" }) {
    const operonList = React.useMemo(() => { return formatTable(operons) }, [operons])

    return (
        <div>
            <br />
            <h3>{`Regulated operons: ${operons.length}`}</h3>
            <div id={idPanel} style={{ overflow: "auto" }} >
                {
                    !operonList
                        ? (<p>Loading...</p>)
                        : <FilterTable columns={COLUMNS} data={operonList} />
                }
            </div>
        </div>
    );
}

export default Operon;