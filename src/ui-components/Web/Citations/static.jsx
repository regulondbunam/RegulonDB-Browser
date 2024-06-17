import { DataVerifier } from "ui-components/utils";

export const PARAGRAPH_VARIANTS = {
    list: "list",
    paragraph: "paragraph",
  };

export const CITATION_SIZE = {
    LARGE: "large",
    SMALL: "small",
    ONLY_INDEX: "index"
  }

export const verifiedPublication = (citation) => {
    if (DataVerifier.isValidObject(citation?.publication)) {
      return DataVerifier.isValidString(citation.publication._id)
        ? citation.publication._id
        : undefined;
    }
    return undefined;
  };
  
export const verifiedEvidence = (citation) => {
    if (DataVerifier.isValidObject(citation?.evidence)) {
      return DataVerifier.isValidString(citation.evidence._id)
        ? citation.evidence._id
        : undefined;
    }
    return undefined;
  };