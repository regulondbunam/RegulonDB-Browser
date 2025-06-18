import DrawingTracesTool from "../../../DrawingTracesTool";
import Genes from "./genes";
import Promoter from "./promotor";
import Divider from "@mui/material/Divider";
import Terminators from "./terminators";
import { useGetPhraseByObjectId } from "../../../webservices";
import { Accordion, DataVerifier } from "../../../ui-components";
import RegulatorBindingSites from "./regulatorBindingSites";

export default function TranscriptionUnit({
  _id,
  allCitations,
  relatedIds,
  regulationPositions,
  strand,
  additiveEvidences = [],
  citations = [],
  confidenceLevel,
  firstGene,
  genes = [],
  name,
  note,
  promoter,
  regulatorBindingSites = [],
  statistics,
  synonyms = [],
  terminators = [],
}) {
  const { propertiesPhrase } = useGetPhraseByObjectId(_id);
  let isPromoterRi = false;
  if (DataVerifier.isValidObject(promoter)) {
    if (DataVerifier.isValidArray(promoter.regulatorBindingSites)) {
      isPromoterRi = true;
    }
  }
  let isGeneRi = false;
  if (DataVerifier.isValidArray(genes)) {
    for (let i = 0; i < genes.length; i++) {
      const gene = genes[i];
      if (DataVerifier.isValidArray(gene.regulatorBindingSites)) {
        isGeneRi = true;
        i = genes.length;
      }
    }
  }
  let isTuRi = DataVerifier.isValidArray(regulatorBindingSites);
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "58px",
          zIndex: "80",
          boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.43)",
          WebkitBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
          MozBoxShadow: " 0px 2px 2px 0px rgba(0,0,0,0.43)",
        }}
      >
        <DrawingTracesTool
          variant="outlined"
          relatedIds={relatedIds}
          context="tu"
          height={200}
          id={_id}
          leftEndPosition={regulationPositions.leftEndPosition}
          rightEndPosition={regulationPositions.rightEndPosition}
          strand={strand}
        />
      </div>
      <div>
        <Accordion>
          {DataVerifier.isValidObject(firstGene) && (
            <Genes
              tuId={_id}
              allCitations={allCitations}
              synonyms={synonyms}
              firstGene={firstGene}
              genes={genes}
              strand={strand}
              confidenceLevel={confidenceLevel}
              note={note}
              citations={citations}
              propertiesPhrase={propertiesPhrase}
            />
          )}
        </Accordion>
        <Divider />
        {DataVerifier.isValidObject(promoter) && (
          <Promoter
            _id={_id}
            promoter={promoter}
            allCitations={allCitations}
            strand={strand}
            firstGene= {firstGene}
          />
        )}
        <Divider />
        {(isGeneRi || isPromoterRi || isTuRi) && (
          <Accordion
            title={<h2 style={{ margin: 0 }}>{`Regulatory Interactions`}</h2>}
          >
            <div style={{ overflow: "auto" }}>
              {DataVerifier.isValidObject(promoter) && (
                <>
                  <h4>
                    Regulation identified by {" "}
                    {" " + promoter.name + " "}promoter
                  </h4>
                  {DataVerifier.isValidArray(
                    promoter.regulatorBindingSites
                  ) && (
                    <RegulatorBindingSites
                      regulatorBindingSites={promoter.regulatorBindingSites}
                      allCitations={allCitations}
                    />
                  )}
                </>
              )}
              {DataVerifier.isValidArray(genes) && (
                <div>
                  {genes.map((gene) => {
                    //console.log(gene.regulatorBindingSites);
                    return (
                      <div>
                        {DataVerifier.isValidArray(
                          gene.regulatorBindingSites
                        ) && (
                          <>
                            <h4>
                              Regulation identified only at gene {gene.name}{" "}
                              level
                            </h4>
                            <RegulatorBindingSites
                              regulatorBindingSites={gene.regulatorBindingSites}
                              allCitations={allCitations}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {DataVerifier.isValidArray(regulatorBindingSites) && (
                <>
                  <h4>Regulation identified only at TU level</h4>
                  <RegulatorBindingSites
                    regulatorBindingSites={regulatorBindingSites}
                    allCitations={allCitations}
                  />
                </>
              )}
            </div>
          </Accordion>
        )}
        <div>
          <Divider />
          {DataVerifier.isValidArray(terminators) && (
            <Terminators
              terminators={terminators}
              tuID={_id}
              allCitations={allCitations}
            />
          )}
          <Divider />
        </div>
      </div>
    </div>
  );
}
