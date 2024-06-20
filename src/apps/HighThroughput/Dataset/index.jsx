import React, { useMemo } from "react";
import Info from "./Info";
import TFBINDING from "./List/TFBINDING";
import TUS from "./List/TUS";
import GENeEXPRESSION from "./List/GENE_EXPRESSION";
import RNAP from "./List/RNAP";

export default function Dataset({
  datasetId,
  datasetType,
  experimentType,
  tfName,
}) {
  const propList = useMemo(() => {
    let properties = [
      {
        query: "[datasetType]",
        term: datasetType,
      },
      {
        query: "[sourceSerie.strategy]",
        term: experimentType,
      },
      {
        query: "[objectsTested.name]",
        term: tfName,
      },
    ];
    let advancedSearch = "";
    let ind = 0;
    properties.forEach((pro) => {
      if (pro?.term) {
        if (ind > 0) {
          if (ind > 1) {
            advancedSearch = `(${advancedSearch}) AND '${pro.term}'${pro.query}`;
          } else {
            advancedSearch += ` AND '${pro.term}'${pro.query}`;
            ind++;
          }
        } else {
          advancedSearch = `'${pro.term}'${pro.query}`;
          ind++;
        }
      }
    });
    let title = datasetType;

    return { advancedSearch: advancedSearch, title: title };
  }, [datasetType, tfName, experimentType]);

  if (datasetId) {
    return <Info datasetId={datasetId} />;
  }

  switch (datasetType) {
    case "TFBINDING":
      return (
        <TFBINDING
          experimentType={experimentType}
          tfName={tfName}
          datasetType={datasetType}
        />
      );
    case "TTS":
    case "TSS":
    case "TUS":
      return (
        <TUS
          experimentType={experimentType}
          tfName={tfName}
          datasetType={datasetType}
        />
      );
    case "GENE_EXPRESSION":
      return <GENeEXPRESSION experimentType={experimentType} tfName={tfName} datasetType={datasetType} />
    case "RNAP_BINDING_SITES":
      return <RNAP experimentType={experimentType} tfName={tfName} />
    default:
      return (
        <div>
          Url Error check:
          <br />
          id:{datasetId}
          <br />
          datasetType: {datasetType}
          <br />
          experimentType: {experimentType}
        </div>
      );
  }

  /*
  if (experimentType || datasetType || tfName) {
    return <List datasetType={datasetType.toLocaleUpperCase()} title={propList.title} advancedSearch={propList.advancedSearch} />
  }*/
}
