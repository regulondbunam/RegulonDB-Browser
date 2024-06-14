import React from 'react'
import { Cover } from 'ui-components/Web/Cover'
import { Typography } from '@mui/material'
import { useGetGuById } from 'webServices/queries'
import { DataVerifier } from 'ui-components/utils';
import Tabs from 'ui-components/Web/Tabs';
import Summary from './Summary';
import Map from './Map';

export default function GensorUnitDetails({ guId }) {
    const { guData, loading, error } = useGetGuById(guId);
    if (loading) {
        return <Cover state={"loading"} >
            <Typography variant='h1'>guID</Typography>
        </Cover>
    }
    if (error) {
        <Cover state={"error"} >
            <div style={{ margin: "5%" }} >
                <Typography variant='h1'>error to load {guId} id gu data</Typography>
            </div>
        </Cover>
    }
    if (DataVerifier.isValidObjectWith_id(guData)) {
        const { gensorUnit } = guData
        return (
            <div>
                <Cover>
                    <div style={{ padding: "1% 0 1% 10%" }} >
                        <div>
                            <div>
                                <Typography variant="irrelevant" >Gensor Unit</Typography>
                            </div>
                            <Typography variant='h1'>{gensorUnit?.name}</Typography>
                        </div>
                        {DataVerifier.isValidArray(gensorUnit.groups)&&(
                            <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="relevantB" sx={{ mr: 1 }}>
                                Functional Groups:
                            </Typography>
                            <Typography variant="relevant">{gensorUnit.groups.join(", ")}</Typography>
                        </div>
                        )}
                        {DataVerifier.isValidArray(gensorUnit.signalName)&&(
                            <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="relevantB" sx={{ mr: 1 }}>
                                Signals:
                            </Typography>
                            <Typography variant="relevant">{gensorUnit.signalName.join(", ")}</Typography>
                        </div>
                        )}
                    </div>
                </Cover>
                <Tabs 
                tabSelect='guTab01'
                tabs={[
                    {id: "guTab01",
                        name:"Reaction Map",
                        component: <div id="guContainer" style={{width:"100%", height: "90vh"}} >
                            <Map {...guData} idContainer={"guContainer"}/>
                        </div>
                    },
                    {id: "guTab02",
                        name:"Summary",
                        component: <Summary reactions={guData.reactions} {...guData.gensorUnit} />
                    }
                ]} />
            </div>
        )
    }
    return (
        <div>
            <Cover>
                <Typography variant='h1'>GU no found</Typography>
            </Cover>
        </div>
    )
}
