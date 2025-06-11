/**
 # Component (user guide)

# AllCitations
	
## Description  
	
AllCitations takes a list of citations, presents them in a table and displays them using the ModalCitation component.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <AllCitationsDeprecated allCitations = {[]} small = {isSmall}/> ]

## Props 

| Attribute  | Type  | Default | Description                                             |
| ---------  | ----  | ------- | ------------------------------------------------------- |
|allCitations|array  |         | Citations'  list to show in the component AllCitations. |
|   small    |boolean|         | Decide whether the size of the citation is small or not.|

## Exception

__Category: [Error]__
If there is an error while rendering, it is caught in the catch block and the function returns null.


## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

[Visual]

## Dependencies
ModalCitation: The list of citations is rendered inside the "ModalCitation" component, evidence, publication, index and small are passed as props to create the modal citation.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/

import { ModalCitation } from "./modal";
import { DataVerifier, Accordion } from "../../ui-components";
import { useMemo } from "react";

/**
 * Description placeholder
 * @export
 * @param {{ allCitations: any; small?: boolean; }} { allCitations, small = false }
 * @returns {React.JSX}
 */

export function AllCitationsDeprecated({ allCitations, small = false }) {
  if (!allCitations) {
    return null;
  }
  return (
    <>
      <table>
        <tbody>
          {allCitations.map(
            /** 
              @param {Object} cit - Citation object to be rendered
              @param {number} index - Index of the citation in the list.
              @returns {JSX.Element|null} JSX element representing the table row with the rendered citation or null in case of error.
            **/
            (cit, index) => {
              try {
                return (
                  <tr key={`citation_no_000${index}`}>
                    <td>
                      <ModalCitation
                        evidence={cit.evidence}
                        publication={cit.publication}
                        index={index + 1}
                        small={small}
                      />
                    </td>
                  </tr>
                );
              } catch (error) {
                return null;
              }
            }
          )}
        </tbody>
      </table>
      <br />
      <br />
    </>
  );
}

export default function useIndexedCitation(allCitations, OrderProperties) {
  const { publications, evidences, indexedCitations } = useMemo(() => {
    return getUniquePublication(allCitations);
  }, [allCitations]);
  //console.log(allCitations);
  return { publications, evidences, indexedCitations };
}

export function AllCitations({ publications, evidences }) {
  return (
    <div>
        <Publications evidences={evidences} publications={publications} />
        <br />
        <Evidences evidences={evidences} publications={publications} />
      </div>
  );
}

function getUniquePublication(allCitations = []) {
  let publications = {};
  let publicationIndex = 1;
  let evidences = {};
  let evidenceIndex = 1;
  let indexedCitations = [];
  if (DataVerifier.isValidArray(allCitations)) {
    allCitations.forEach((citation) => {
      let publication = null;
      let evidence = null;
      const verifiedPublication = ()=>{
        if (DataVerifier.isValidObject(citation.publication)) {
          return DataVerifier.isValidString(citation.publication._id)
        }
        return false
      }
      const verifiedEvidence = ()=>{
        if (DataVerifier.isValidObject(citation.evidence)) {
          return DataVerifier.isValidString(citation.evidence._id)
        }
        return false
      }
      const hasEvidence = verifiedEvidence();
      const hasPublication = verifiedPublication();
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

export function Evidences({ evidences, publications, small = false }) {
  //console.log(evidences);
  return (
    <Accordion title={<h3>Evidence</h3>} backgroundColor="#cadce7" >
      <table>
        <tbody>
          {Object.keys(evidences).map((evidenceId) => {
            const evidence = evidences[evidenceId];
            return (
              <tr key={`citation_no_000${evidence.index}`}>
                <td>
                  <ModalCitation
                    evidence={evidence}
                    publications={publications}
                    evidences={evidences}
                    small={small}
                    isEvidence
                    showIndex={true}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </Accordion>
  );
}

export function Publications({ evidences, publications, small = false }) {
  //console.log(publications);
  return (
    <Accordion  title={<h3>References</h3>} backgroundColor="#cadce7" >
      
      <table>
        <tbody>
          {Object.keys(publications).map((publicationId) => {
            const publication = publications[publicationId];
            return (
              <tr key={`citation_no_000${publication.index}`}>
                <td>
                  <ModalCitation
                    publication={publication}
                    evidences={evidences}
                    small={small}
                    showIndex={false}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </Accordion>
  );
}
