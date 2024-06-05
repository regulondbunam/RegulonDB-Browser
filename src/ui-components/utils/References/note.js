import { CITATION_SIZE } from ".";
import label from "./label";

/**
 * Replaces citations in the text with clickable links.
 * @date 2023-06-05
 * @export
 * @param {string} text - The input text containing citations.
 * @param {Object} references - The references object containing publication data.
 * @param {Object} references.publications - The publications object keyed by publication ID.
 * @returns {string} - The text with citations replaced by links.
 */
export default function insertCitations(text, references) {
    console.log(references);

    // Replace new line characters with <br></br>
    text = text.replace(/\n/g, "<br></br>");

    // Replace citation placeholders with links
    return text.replace(/\|CITS: ((\[[^\]]+\])+)\|/g, (match, sel) => {
        const publications = sel.replace(/\[([^\]]+)\]/g, (match, id) => {
            const publication = references.publications[id];
            if (publication) {
                const citation = label({
                    publication: publication,
                    evidence: publication.evidence,
                    citationSize: CITATION_SIZE.SMALL
                });
                // Return the clickable link for the publication
                return `<a class='citation' target="_blank" rel="noopener noreferrer" href="${publication?.url}">${citation}</a>&nbsp;`;
            }
            console.warn("Publication not found:", id, match);
            return "";
        });
        return publications;
    });
}