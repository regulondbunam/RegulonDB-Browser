import formatTFBS from "./TFBINDING"
import formatTUS from "./TUS"
import formatRNAP from "./RNAP"
import formatGE from "./GENE_EXPRESSION"

export default function formatDatasetFilterTable(datasets, datasetType, experimentType, source, tfName, experimentTitle) {
   let table
   switch (datasetType) {
    case "TFBINDING":
        console.log("EXP_TITLE: ",experimentTitle);
        table = formatTFBS(datasets, experimentType, tfName, experimentTitle)
        break;
    case "TSS":
    case "TTS":
    case "TUS":
        table = formatTUS(datasets, datasetType)
        break;
    case "GENE_EXPRESSION":
        table = formatGE(datasets,[])
        break;
    case "RNAP_BINDING_SITES":
        table = formatRNAP(datasets, experimentType)
        break;
    default:
        table = {columns: [], data: []}
  }
    return table
}