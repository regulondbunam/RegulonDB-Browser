import React, {useMemo} from 'react'
import Info from './Info'
import TFBINDING from './List/TFBINDING'

export default function Dataset({datasetId, datasetType, experimentType, tfName}) {

  const propList = useMemo(() => {
    let properties = [
      {
        query: "[datasetType]",
        term: datasetType
      },
      {
        query: "[sourceSerie.strategy]",
        term: experimentType
      },
      {
        query: "[objectsTested.name]",
        term: tfName
      }
    ]
    let advancedSearch = ""
    let ind = 0
    properties.forEach((pro) => {
      if (pro?.term) {
        if (ind > 0) {
          if (ind > 1) {
            advancedSearch = `(${advancedSearch}) AND '${pro.term}'${pro.query}`
          } else {
            advancedSearch += ` AND '${pro.term}'${pro.query}`
            ind++
          }
        } else {
          advancedSearch = `'${pro.term}'${pro.query}`
          ind++
        }
      }
    });
    let title = datasetType
    
    return {advancedSearch: advancedSearch, title: title}
  }, [datasetType, tfName, experimentType])

  if (datasetId) {
    return <Info datasetId={datasetId} />
  }

  switch (datasetType) {
    case "TFBINDING":
      return <TFBINDING experimentType={experimentType} tfName={tfName} />
    case "TUS":
      return null
    case "TTS":
      return null
    case "TSS":
      return null
    case "GENE_EXPRESSION":
      return null
    case "RNAP_BINDING_SITES":
      return null
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
      break;
  }

  /*
  if (experimentType || datasetType || tfName) {
    return <List datasetType={datasetType.toLocaleUpperCase()} title={propList.title} advancedSearch={propList.advancedSearch} />
  }*/
  
}
