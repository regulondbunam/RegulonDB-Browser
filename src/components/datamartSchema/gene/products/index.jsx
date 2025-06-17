/** 
# Component (user guide)

# Product
	
## Description  
It is used to display detailed information about a biological product in a structured and foldable format.

## Category   
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute             | Type  | Default | Description                                                                         |
| ----------------------| ----  | ------- | ----------------------------------------------------------------------------------- |
|    _id                |string |         |It represents the unique identifier of the product.                                  |
| anticodon             |string |         |Represents the anticodon associated with the product, if present.                    |
|cellularLocations      |array  |         |Represents the cellular locations associated with the product.                       |  
|citations              |array  |         |Represents the citations or references associated with the product.                  |
|externalCrossReferences|array  |         |Represents the external cross-references associated with the product.                |
|geneOntologyTerms      |object |         |It represents the Gene Ontology (GO) terms associated with the product.              |
| isRegulator           |boolean|         |Indicates whether the product acts as a regulator.                                   |
|isoelectricPoint       |number |         |Represents the isoelectric point of the product, if present.                         |
|  molecularWeight      |string |         |It represents the molecular weight of the product, if present.                       |
|  motifs               |array  |         |It represents the motifs associated with the product.                                |
|  name                 |string |         |Represents the name of the product.                                                  |
| note                  |string |         |Represents a note associated with the product.                                       |
|  regulonId            |string |         |Represents the identifier of the regulon to which the product belongs, if present.   |
| sequence              |string |         |Represents the sequence of data associated with the product.                         |
| synonyms              |array  |         |Represents the synonyms or aliases of the product.                                   |
| type                  |string |         |Represents the type or category of the product.                                      |
| allCitations          |array  |         |Contains all available quotations.                                                   |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

Visual

## Dependencies
ViewSequence: it displays sequences in a specific format.
PropTypes: it is a library commonly used in React applications to verify and document the types of properties (props) that are passed to components.
DataVerifier: it is used to perform checks and validations on the data before rendering or processing information in the component.
Accordion: it is used to organize and display information in an orderly and compact manner, especially when there is detailed content that can be initially hidden.
ParagraphCitations: its role could be to take the quotes and format them for presentation in the component properly.
NoteCitations: to format and display citations in a specific way, possibly in a footnote or similar format.
GeneOntologyTerms: component related to the presentation of Gene Ontology (GO) terms.
Motif: highlight or display information about specific patterns within a given sequence.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

**/

import ViewSequence from "./viewSequence";
import PropTypes from "prop-types";
import { DataVerifier, Accordion } from "../../../ui-components";
import { ParagraphCitations, NoteCitations } from "../../citations";
import GeneOntologyTerms from "./geneOntologyTerms";
import Motif from "./motif";
import { Link } from "react-router-dom";

/**
 * Description placeholder
 *
 * @type {{ _id: any; anticodon: any; cellularLocations: any; citations: any; externalCrossReferences: any; geneOntologyTerms: any; isRegulator: any; isoelectricPoint: any; molecularWeight: any; motifs: any; ... 5 more ...; type: any; }}
 */
const PROP_TYPES = {
  _id: PropTypes.string.isRequired,
  anticodon: PropTypes.string,
  cellularLocations: PropTypes.arrayOf(PropTypes.string),
  citations: PropTypes.array,
  externalCrossReferences: PropTypes.array,
  geneOntologyTerms: PropTypes.object,
  isRegulator: PropTypes.bool,
  isoelectricPoint: PropTypes.number,
  molecularWeight: PropTypes.string,
  motifs: PropTypes.array,
  name: PropTypes.string,
  note: PropTypes.string,
  regulonId: PropTypes.string,
  sequence: PropTypes.string,
  synonyms: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
};


/*
function to get Phrases
* */

/**
 * Description placeholder
 *
 * @export
 * @param {{ _id: any; anticodon: any; cellularLocations: any; citations: any; externalCrossReferences: any; geneOntologyTerms: any; isRegulator: any; isoelectricPoint: any; molecularWeight: any; motifs: any; ... 6 more ...; allCitations: any; }} {
    _id,
    anticodon,
    cellularLocations,
    citations,
    externalCrossReferences,
    geneOntologyTerms,
    isRegulator,
    isoelectricPoint,
    molecularWeight,
    motifs,
    name,
    note,
    regulonId,
    sequence,
    synonyms,
    type,
    allCitations
}
 * @returns {React.JSX}
 */
export function Product({
  _id,
  anticodon,
  cellularLocations,
  citations,
  externalCrossReferences,
  geneOntologyTerms,
  isRegulator,
  isoelectricPoint,
  molecularWeight,
  motifs,
  name,
  note,
  regulonId,
  sequence,
  synonyms,
  type,
  allCitations,
}) {

  return (
    <div>
      {DataVerifier.isValidString(regulonId) ? (
        <Link to={"/regulon/" + regulonId}>
          <p style={{ fontSize: "18px" }}>
            <b dangerouslySetInnerHTML={{ __html: name }} />
          </p>
        </Link>
      ) : (
        <tr style={{ fontSize: "18px" }}>
          <td style={{ fontWeight: "bold" }}>Name: <b dangerouslySetInnerHTML={{ __html: name }} /> </td>
        </tr>
      )}

      <table className="table_auto table_content">
        <tbody>
          {DataVerifier.isValidArray(synonyms) && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Synonyms: </td>
              <td>
                <p dangerouslySetInnerHTML={{ __html: synonyms.join(", ") }} />
              </td>
            </tr>
          )}
          {DataVerifier.isValidString(sequence) && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Sequence:</td>
              <td>
                <ViewSequence sequence={sequence} title={`product: ${name}`} />
              </td>
            </tr>
          )}
          {DataVerifier.isValidString(molecularWeight) && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Molecular Weight: </td>
              <td>{molecularWeight}</td>
            </tr>
          )}
          {DataVerifier.isValidString(anticodon) && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Anticodon: </td>
              <td>{anticodon}</td>
            </tr>
          )}
          {isRegulator && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Is regulator?:</td>
              <td>{isRegulator}</td>
            </tr>
          )}
          {DataVerifier.isValidNumber(isoelectricPoint) && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Isoelectric Point: </td>
              <td>{isoelectricPoint}</td>
            </tr>
          )}
          {DataVerifier.isValidArray(cellularLocations) && (
            <tr>
              <td style={{ fontWeight: "bold" }}>Cellular Location:</td>
              <td>{cellularLocations.join(", ")}</td>
            </tr>
          )}
        </tbody>
      </table>
      {DataVerifier.isValidString(note) && (
        <Accordion title={<p style={{ fontWeight: "bold" }}>Note</p>}>
          <p
            dangerouslySetInnerHTML={{
              __html: NoteCitations(allCitations, note),
            }}
          />
        </Accordion>
      )}
      {DataVerifier.isValidObject(geneOntologyTerms) && (
        <GOT
          geneOntologyTerms={geneOntologyTerms}
          allCitations={allCitations}
        />
      )}
      {DataVerifier.isValidArray(motifs) && (
        <Motifs motifs={motifs} sequence={sequence} />
      )}
      {DataVerifier.isValidArray(externalCrossReferences) && (
        <ExternalCrossReferences references={externalCrossReferences} />
      )}

      {DataVerifier.isValidArray(citations) && (
        <Citations citations={citations} allCitations={allCitations} />
      )}
    </div>
  );
}

Product.propTypes = PROP_TYPES;

/**
 * Description placeholder
 *
 * @param {{ motifs?: {}; sequence: any; }} { motifs = [], sequence }
 * @returns {React.JSX}
 */
function Motifs({ motifs = [], sequence }) {
  return (
    <Accordion title={<p style={{ fontWeight: "bold" }}>Motifs</p>}>
      <div>
        <Motif motifs={motifs} sequence={sequence} />
      </div>
    </Accordion>
  );
}

/**
 * Description placeholder
 *
 * @param {{ geneOntologyTerms: any; allCitations: any; }} {
    geneOntologyTerms,
    allCitations
}
 * @returns {React.JSX}
 */
function GOT({ geneOntologyTerms, allCitations }) {
  return (
    <Accordion
      title={<p style={{ fontWeight: "bold" }}>Gene Ontology Terms</p>}
    >
      <div>
        <GeneOntologyTerms
          geneOntologyTerms={geneOntologyTerms}
          allCitations={allCitations}
        />
      </div>
    </Accordion>
  );
}

/**
 * Description placeholder
 *
 * @param {{ citations: any; allCitations: any; }} { citations, allCitations }
 * @returns {React.JSX}
 */
function Citations({ citations, allCitations }) {
  return (
    <Accordion title={<p style={{ fontWeight: "bold" }}>Evidences and References</p>}>
      <div>
        <ParagraphCitations citations={citations} allCitations={allCitations} />
      </div>
    </Accordion>
  );
}

/**
 * Description placeholder
 *
 * @param {{ references: any; }} { references }
 * @returns {React.JSX}
 */
function ExternalCrossReferences({ references }) {
  return (
    <Accordion title={<p style={{ fontWeight: "bold" }}>External Cross References</p>}>
      <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}>
        {references.map((reference) => {
          return (
            <a
              style={{ marginLeft: "5px" }}
              key={"reference_" + reference.externalCrossReferenceId}
              href={`${reference.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >{`${reference.externalCrossReferenceName}: ${reference.objectId}`}</a>
          );
        })}
      </div>
    </Accordion>
  );
}
