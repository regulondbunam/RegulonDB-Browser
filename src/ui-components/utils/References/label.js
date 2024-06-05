import DataVerifier from "../DataVerifier";
import { CITATION_SIZE } from ".";

/**
 * Generates a citation label in a specific format.
 * @param {Object} options - Options object.
 * @param {Object} options.publication - Publication object.
 * @param {Object} options.evidence - Evidence object.
 * @param {number} options.citationSize - Size of the citation.
 * @param {boolean} options.isEvidence - Indicates if the citation is an evidence.
 * @param {boolean} options.showIndex - Indicates whether to show index in the citation.
 * @returns {String} The generated citation label.
 */
export default function label({
  publication = {},
  evidence = {},
  citationSize = CITATION_SIZE.LARGE,
  isEvidence = false,
  showIndex = true,
}) {
  // Generate citation label for evidence
  if (isEvidence && DataVerifier.isValidObject(evidence)) {
    // Code for evidence
    let code = evidence?.code ? (evidence.type === "S" ? `<b>[${evidence.code}]</b>` : `[${evidence.code}]`) : "";

    switch (citationSize) {
      case CITATION_SIZE.LARGE:
        return `${showIndex ? "EV" + evidence.index + "." : ""}${evidence?.name ? evidence.name : ""} ${code}`;
      case CITATION_SIZE.SMALL:
        return `${showIndex ? "EV" + evidence.index + "." : ""}${code}`;
      case CITATION_SIZE.ONLY_INDEX:
        return `[e${evidence.index}]`;
      default:
        return `${showIndex ? "EV" + evidence.index + "." : ""}${evidence?.name ? evidence.name : ""} ${code}`;
    }
  }

  // Generate citation label for publication
  if (!DataVerifier.isValidObject(publication)) {
    return "_";
  }

  let publicationLabel = "";
  if (DataVerifier.isValidObjectWith_id(publication)) {
    const { index, authors, citation, year } = publication;
    if (DataVerifier.isValidString(citation)) {
      switch (citationSize) {
        case CITATION_SIZE.LARGE:
          publicationLabel = `[${index}] ${citation}`;
          break;
        case CITATION_SIZE.SMALL:
          publicationLabel = `${authors[0]}., et al. ${year ? year : ""}<sup>${index}</sup>`;
          break;
        case CITATION_SIZE.ONLY_INDEX:
          publicationLabel = `${index}`;
          break;
        default:
          publicationLabel = " ";
          break;
      }
    }
  }

  // Generate citation label for evidences
  let evidenceLabel = "";
  if (DataVerifier.isValidArray(publication.evidences)) {
    let evidencesCodes = [];
    let evidencesIndex = [];
    publication.evidences.forEach((evidence) => {
      if (DataVerifier.isValidObjectWith_id(evidence)) {
        if (evidence?.code) {
          evidencesCodes.push(evidence.type === "S" ? `<b>[EV${evidence.index}]${evidence.code}</b>` : `[EV${evidence.index}]${evidence.code}`);
          evidencesIndex.push(evidence.type === "S" ? `<b>${evidence.index}</b>` : `${evidence.index}`);
        }
      }
    });

    if (DataVerifier.isValidArray(evidencesCodes)) {
      switch (citationSize) {
        case CITATION_SIZE.LARGE:
          evidenceLabel = `${evidencesCodes.length > 1 ? "Evidences: " : "Evidence: "}${evidencesCodes.join(", ")}`;
          break;
        case CITATION_SIZE.SMALL:
          evidenceLabel = evidencesCodes.join(",");
          break;
        case CITATION_SIZE.ONLY_INDEX:
          evidenceLabel = `EV:${evidencesIndex.join(",")}`;
          break;
        default:
          evidenceLabel = "";
          break;
      }
    }
  }

  // Generate combined citation label
  switch (citationSize) {
    case CITATION_SIZE.LARGE:
    case CITATION_SIZE.SMALL:
      return `${publicationLabel}, ${evidenceLabel}`;
    case CITATION_SIZE.ONLY_INDEX:
      return `[${publicationLabel}|${evidenceLabel}]`;
    default:
      return "";
  }
}