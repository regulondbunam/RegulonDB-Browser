import { useMemo } from "react";
import { Stack } from "@mui/system";
import { PARAGRAPH_VARIANTS, CITATION_SIZE, verifiedEvidence, verifiedPublication } from "./static";
import { ModalCitation } from "./Modal";
import { DataVerifier } from "ui-components/utils";

export default function ParagraphCitations({
    citations,
    references,
    variant = PARAGRAPH_VARIANTS.paragraph,
    citationSize = CITATION_SIZE.LARGE,
  }) {
    const publications = useMemo(() => {
      return formatParagraph(citations, references.indexedCitations);
    }, [references, citations]);

    return (
      <Stack direction="row" useFlexGap flexWrap="wrap">
        {Object.keys(publications).map(
          /**
           * Description placeholder
           *
           * @param {object} cit
           * @param {string} indx
           * @returns {React.JSX}
           */
          (publicationId, indx) => {
            const publication = publications[publicationId];
            return (
              <div>
                <ModalCitation
                  key={`publication_${publication.index}_${indx}_${publicationId}`}
                  publication={publication}
                  citationSize={citationSize}
                />
              </div>
            );
          }
        )}
      </Stack>
    );
  }


  function formatParagraph(citations, indexedCitations) {
    //console.log(citations, indexedCitations);
    let publications = {};
    if (DataVerifier.isValidArray(citations)) {
        citations.forEach((citation) => {
        const publicationId = verifiedPublication(citation);
        const evidenceId = verifiedEvidence(citation);

        let indexedCitation = indexedCitations.find(
          (_indexedCitation) => {
            const indxPublicationId = verifiedPublication(_indexedCitation);
            const indxEvidenceId = verifiedEvidence(_indexedCitation);
            return (
              publicationId === indxPublicationId && evidenceId === indxEvidenceId
            );
          }
        );
        if (indexedCitation) {
          const indxPublicationId = verifiedPublication(indexedCitation)
            ? indexedCitation.publication._id
            : "noPub";
          const evidence = verifiedEvidence(indexedCitation)
            ? indexedCitation.evidence
            : undefined;
          if (!publications.hasOwnProperty(indxPublicationId)) {
            publications[indxPublicationId] = {
              ...indexedCitation.publication,
              evidences: evidence ? [evidence] : [],
            };
          } else {
            publications[indxPublicationId] = {
              ...publications[indxPublicationId],
              evidences: evidence
                ? [...publications[indxPublicationId].evidences, evidence]
                : publications[indxPublicationId].evidences,
            };
          }
        }
      });
    }
    return publications;
  }