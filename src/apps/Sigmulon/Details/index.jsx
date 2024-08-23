import React from 'react'
import { useGetSigmulonDataById } from 'webServices/queries'
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import { Cover } from 'ui-components/Web/Cover';
import { Typography } from '@mui/material';
import UiCover from './Cover';

export default function Details({sigmulonId}) {

    const {sigmulon, loading, error}= useGetSigmulonDataById(sigmulonId)
    const references = useGetIndexedReferences(sigmulon?.allCitations)
    console.log(sigmulon);

    if (loading) {
        return <Cover state={"loading"} >
            <Typography>
                {`Loading Sigmulon data... (${sigmulonId})`}
            </Typography>
        </Cover>
    }

    if (error) {
        return <Cover state={"loading"} >
            <Typography>
                {`Error sigmulon (${sigmulonId})`}
            </Typography>
        </Cover>
    }
    

    if (sigmulon) {
        console.log(sigmulon);
        return(
            <div>
                <UiCover id={sigmulonId} sigmaFactor={sigmulon?.sigmaFactor} statistics={sigmulon?.statistics} />
            </div>
        )
    }
    
  return (
    <div>error...</div>
  )
}
