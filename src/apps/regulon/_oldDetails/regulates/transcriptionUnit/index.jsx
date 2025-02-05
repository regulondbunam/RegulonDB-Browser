import React from 'react';
import FilterTable from '../../../../../components/ui-components/filterTable2';
import { Link } from 'react-router-dom';

const COLUMNS = [
    { label: "TU",  width: 50 },
    { label: "Function",  width: 50 },
    { label: "First Gene",  width: 50 }
]

function formatTable(transcriptionUnits = []) {
    let data = []

    transcriptionUnits.forEach((tu) => {
        //console.log(tu.firstGene.name)
        data.push({
                    "TU": <div value={tu.name}>
                        <Link to={"/tu/" + tu._id}>
                            <p>{`${tu.name}`}</p>
                        </Link>
                    </div>,
                    "Function": tu.function,
                    "First Gene": <div value={tu.firstGene.name}>
                        <Link to={"/gene/" + tu.firstGene._id}>
                            <p>{`${tu.firstGene.name}`}</p>
                        </Link>
                    </div>
                })
    })
    return data
}

function TranscriptionUnit({ transcriptionUnits, idPanel = "regulates_tu" }) {
    const tuList = React.useMemo(() => { return formatTable(transcriptionUnits) }, [transcriptionUnits])
    return (
        <div>
            <h3>{`Regulated transcription units: ${transcriptionUnits.length}`}</h3>
            <div id={idPanel} style={{overflow: "auto"}} >
                {
                    !tuList
                        ? (<p>Loading...</p>)
                        : <FilterTable columns={COLUMNS} data={tuList} tableName='' />
                }
            </div>
        </div>
    );
}

export default TranscriptionUnit;