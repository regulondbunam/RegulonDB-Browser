import DataVerifier from "../DataVerifier";
/**
 * Indexes the citations by publications and evidences.
 * @param {Array} allCitations - An array containing all citations.
 * @returns {Object} An object containing publications, evidences, and indexedCitations.
 */
export default function indexedReferences(allCitations) {
    let publications = {};
    let publicationIndex = 1;
    let evidences = {};
    let evidenceIndex = 1;
    let indexedCitations = [];
  
    if (DataVerifier.isValidArray(allCitations)) {
      allCitations.forEach((citation) => {
        let publication = null;
        let evidence = null;
  
        const hasEvidence = DataVerifier.isValidObjectWith_id(citation.evidence)
        const hasPublication = DataVerifier.isValidObjectWith_id(citation.publication)
  
        if (hasPublication) {
          if (!publications.hasOwnProperty(citation.publication._id)) {
            publications[citation.publication._id] = {
              ...citation.publication,
              index: publicationIndex,
              evidences: hasEvidence ? [citation.evidence._id] : [],
            };
            publicationIndex++;
          } else {
            publications[citation.publication._id] = {
              ...publications[citation.publication._id],
              evidences: hasEvidence
                ? [
                    ...publications[citation.publication._id].evidences,
                    citation.evidence._id,
                  ]
                : publications[citation.publication._id].evidences,
            };
          }
          publication = {
            ...citation.publication,
            index: publications[citation.publication._id].index,
            evidences: publications[citation.publication._id].evidences,
          };
        }
  
        if (hasEvidence) {
          if (!evidences.hasOwnProperty(citation.evidence._id)) {
            evidences[citation.evidence._id] = {
              ...citation.evidence,
              index: evidenceIndex,
              publications: hasPublication ? [citation.publication._id] : [],
            };
            evidenceIndex++;
          } else {
            evidences[citation.evidence._id] = {
              ...evidences[citation.evidence._id],
              publications: hasPublication
                ? [
                    ...evidences[citation.evidence._id].publications,
                    citation.publication._id,
                  ]
                : evidences[citation.evidence._id].publications,
            };
          }
          evidence = {
            ...citation.evidence,
            index: evidences[citation.evidence._id].index,
            publications: evidences[citation.evidence._id].evidences,
          };
        }
  
        indexedCitations.push({ publication: publication, evidence: evidence });
      });
    }
  
    return { publications, evidences, indexedCitations };
}