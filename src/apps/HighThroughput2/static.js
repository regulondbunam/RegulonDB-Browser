export const DATASET_TYPE_NAME = (datasetType) => {
  switch (datasetType) {
    case "TFBINDING":
        return "TF Binding Sites"
    case "TSS":
        return "Transcription Start Sites"
    case "TTS":
        return "Transcription Termination Sites"
    case "TUS":
        return "Transcription Units"
    case "GENE_EXPRESSION":
        return "Gene Expression"
    case "RNAP_BINDING_SITES":
        return "RNAP Binding Sites"
    default:
      return datasetType;
  }
};

const sources = {
    "MULTIPLE_AUTHORS": "ChIP-seq",
    "BAUMGART": "DAP",
    "PALSSON": "ChIP-exo",
    "ISHIHAMA": "gSELEX-chip",
    "GALAGAN": "ChIP-seq",
    "REGULONDB": "REGULONDB",
    "RNAP_BINDING_SITES": "RNAP B. Sites"
};

export const SOURCE_NAMES = (source, datasetType) =>{
    switch (datasetType) {
        case "TFBINDING":
            if (!source) {
                return datasetType;
            }
            return source+" "+sources[source];
        case "TSS":
            return DATASET_TYPE_NAME(datasetType)
        case "TTS":
            return DATASET_TYPE_NAME(datasetType)
        case "TUS":
            return DATASET_TYPE_NAME(datasetType)
        case "GENE_EXPRESSION":
            return DATASET_TYPE_NAME(datasetType)
        case "RNAP_BINDING_SITES":
            return DATASET_TYPE_NAME(datasetType)
        default:
            return datasetType;
    }

}

// TODO: These paths are just temporary, the info in the md files must be in the DB.
export const DATASET_DESCRIPTIONS_PATHS = (datasetType) => {
    switch (datasetType) {
        case "TFBINDING":
            return "media/raw/ht_collections_meta/TFBS_description.md"
        case "TSS":
            return "media/raw/ht_collections_meta/TSS_description.md"
        case "TTS":
            return "media/raw/ht_collections_meta/TTS_description.md"
        case "TUS":
            return "media/raw/ht_collections_meta/TU_description.md"
        case "GENE_EXPRESSION":
            return "media/raw/ht_collections_meta/GE_description.md"
        case "RNAP_BINDING_SITES":
            return "media/raw/ht_collections_meta/TFBS_description.md"
        default:
            return datasetType;
    }
};