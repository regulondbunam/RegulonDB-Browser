import React, {useMemo} from 'react'
import Info from './info/Info'
import TFBINDING from './new/List/TFBINDING'
import RNAP from './new/List/RNAP'
import TUS from './new/List/TUS'
import GENeEXPRESSION from './new/List/GENE_EXPRESSION'

export default function Dataset({datasetId, datasetType, experimentType, tfName}) {

  if (datasetId) {
    return <Info datasetId={datasetId} />
  }

  switch (datasetType) {
    case "TFBINDING":
      return <TFBINDING experimentType={experimentType} tfName={tfName} />
    case "TTS":
    case "TSS":
    case "TUS":
      return <TUS experimentType={experimentType} tfName={tfName} datasetType={datasetType} />
    case "GENE_EXPRESSION":
      return <GENeEXPRESSION experimentType={experimentType} tfName={tfName} datasetType={datasetType} />
    case "RNAP_BINDING_SITES":
      //console.log(datasetType);
      return <RNAP experimentType={experimentType} tfName={tfName} />
    default:
      return (
        <div>Url Error check:
          <br />
          id:{datasetId}
          <br />
          datasetType: {datasetType}
          <br />
          experimentType: {experimentType}
        </div>
      )
  }
}
