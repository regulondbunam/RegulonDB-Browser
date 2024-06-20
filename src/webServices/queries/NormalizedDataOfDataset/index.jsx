import { useLazyQuery } from "@apollo/client";
import { query_GetAllTFBindingOfDataset, query_GetAllPeaksOfDataset } from "./queries";
import { DataVerifier } from "ui-components/utils";

export default function useGetNormalizedData(datasetId, datasetType) {
    const [getTFBindingOfDataset, { data: TFBSdata, error: TFBSerror, loading: TFBSloading }] = useLazyQuery(query_GetAllTFBindingOfDataset)
    const [getPeaksOfDataset, { data: PeaksData, error: PeaksError, loading: PeaksLoading }] = useLazyQuery(query_GetAllPeaksOfDataset)
    let normalizedData
    let loading = TFBSloading || PeaksData
    switch (datasetType) {
        case "TFBINDING":
            if (!TFBSdata && !TFBSloading && !TFBSerror) {
                getTFBindingOfDataset({ variables: { datasetId: datasetId } })
            }
            if (!PeaksData && !PeaksLoading && !PeaksError) {
                getPeaksOfDataset({ variables: { datasetId: datasetId } })
            }
            /// Load Data
            if ((TFBSdata && !TFBSerror && !TFBSloading) && (PeaksData && !PeaksLoading && !PeaksError)) {
                let TFBINDING = {}
                if (DataVerifier.isValidArray(TFBSdata.getAllTFBindingOfDataset)) {
                    TFBINDING.tfbs = TFBSdata.getAllTFBindingOfDataset;
                }
                if (DataVerifier.isValidArray(PeaksData.getAllPeaksOfDataset)) {
                    TFBINDING.peaks = PeaksData.getAllPeaksOfDataset  
                }
                if (Object.keys(TFBINDING).length > 0) {
                    normalizedData = {TFBINDING}
                }
                loading = false
            }
            break;
        default:
            break;
    }
    return { normalizedData, loading }
}
