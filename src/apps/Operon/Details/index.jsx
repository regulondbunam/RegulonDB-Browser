import React from 'react'
import { useGetOperonByID } from 'webServices/queries'
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import Cover from './Cover';
import { Cover as CoverUi } from 'ui-components/Web/Cover';
import { DataVerifier } from 'ui-components/utils';
import { Typography } from '@mui/material';
import DrawTrace from './DrawTrace';



export default function Details({ id }) {
    const { operon, loading, error } = useGetOperonByID(id)
    const references = useGetIndexedReferences(operon?.allCitations)
    console.log(operon);
    if (error) {
        return (
          <div>
            <CoverUi
              state={loading ? "loading" : "error"}
              message={error && "Error to load gene list"}
            >
              <Typography variant="h1" sx={{ ml: "10%" }}>
                ERROR: {id} not found{" "}
              </Typography>
            </CoverUi>
          </div>
        );
      }
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
                {DataVerifier.isValidObjectWith_id(operon?.operon) && <CoverUi><Cover {...operon.operon} /></CoverUi>}
                <DrawTrace operon={operon} />
            </div>
        )
    }

    return null

}