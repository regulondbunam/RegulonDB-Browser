import React from 'react'
import { useGetOperonByID } from 'webServices/queries'
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import Cover from './Cover';
import { Cover as CoverUi } from 'ui-components/Web/Cover';
import { DataVerifier } from 'ui-components/utils';
import { Typography } from '@mui/material';


export default function Details({ id }) {
    const { operon, loading, error } = useGetOperonByID(id)
    const references = useGetIndexedReferences(operon?.allCitations)
    if (loading) {
        return (
            <CoverUi>
                <Typography variant="h1">
                    Loading...
                </Typography>
            </CoverUi>
        )
    }
    if (operon) {
        return (
            <div>
                {DataVerifier.isValidObjectWith_id(operon?.operon) && <Cover {...operon.operon} />}
            </div>
        )
    }

    return null

}