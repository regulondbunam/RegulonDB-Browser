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
