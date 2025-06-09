import { useMemo } from "react";
import { AnchorNav, DataVerifier } from "../../../components/ui-components";
import { AllCitations, useIndexedCitation } from "../../../components/datamartSchema";
import Genes from "./components/genes";
import Regulators from "../../../components/datamartSchema/gene/regulation/regulators";
import TranscribedPromoters from "./components/promoters";

const cardOptions = {
  showTitle: true,
};

export default function Document({ sigmulonData }) {
  const {publications, evidences} = useIndexedCitation(sigmulonData.allCitations)

  const sections = useMemo(() => {
    let _sections = [];
    const { allCitations, sigmaFactor, transcribedPromoters, _id } =
      sigmulonData;
    if (DataVerifier.isValidArray(sigmaFactor.sigmulonGenes)) {
      _sections.push({
        id: "SigmaSection_01",
        label: "Genes",
        title: "Sigmulon Genes",
        component: (
          <div style={{ overflow: "auto" }}>
            <Genes genes={sigmaFactor.sigmulonGenes} sigmulonId={_id} />
          </div>
        ),
      });
    }
    if (DataVerifier.isValidArray(sigmaFactor.sigmulonGenes)) {
      _sections.push({
        id: "SigmaSection_02",
        label: "Regulators",
        title: "Sigmulon Regulators",
        component: (
          <div style={{ overflow: "auto", maxHeight: "100vh", marginLeft: "5%" }}>
            <Regulators
              regulators={sigmaFactor.sigmulonRegulators}
              sigmulonId={_id}
            />
          </div>
        ),
      });
    }
    if (DataVerifier.isValidArray(transcribedPromoters)) {
      _sections.push({
        id: "SigmaSection_03",
        label: "Promoters",
        title: "Activated Promoters",
        component: (
          <div style={{ overflow: "auto" }}>
            <TranscribedPromoters
              promoters={transcribedPromoters}
              sigmulonId={_id}
            />
          </div>
        ),
      });
    }
    if (DataVerifier.isValidArray(allCitations)) {
      _sections.push({
        id: "sigmaSections_allCitations",
        label: "Citations",
        title: "Citations",
        component: (
          <div style={{ overflow: "auto" }}>
            <AllCitations publications={publications} evidences={evidences} />
          </div>
        ),
      });
    }
    return _sections;
  }, [sigmulonData, publications, evidences]);
  return (
    <div>
      <AnchorNav
        sections={sections}
        cardOptions={cardOptions}
        title={`Sigmulon ${sigmulonData.sigmaFactor.name}`}
      />
    </div>
  );
}
