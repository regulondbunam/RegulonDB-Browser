import React from "react";
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
  geneName,
  gc,
}) {

  if (datasetId) {
    return <Info datasetId={datasetId} />;
  }

  switch (datasetType) {
    case "TFBINDING":
      return (
        <TFBINDING
          experimentType={experimentType}
          datasetType={datasetType}
          tfName={tfName} strategy={experimentType} gene={geneName} gc={gc}
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
      return <GENeEXPRESSION experimentType={experimentType} tfName={tfName} datasetType={datasetType} gene={geneName} />
    case "RNAP_BINDING_SITES":
      return <RNAP experimentType={experimentType} tfName={tfName} strategy={experimentType} gene={geneName} gc={gc} />
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
