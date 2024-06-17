/**
 # Component (user guide)

GeneOntologyTerms
	
## Description  
	
This is the main component and is responsible for rendering the information related to the Gene Ontology terms.

## Category   
	
Visual 

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute       | Type | Default | Description                                                                                                                                                 |
| --------------- | ---- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
|geneOntologyTerms|object|         |It is used to provide data to the React component so that it can render and display relevant information about the Gene Ontology terms in the user interface.|
|allCitations     |array |         |Provides information on the sources or bibliographic references that support the Gene Ontology terms.                                                        |

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
React: Imports the main React library, which is used to create components and manage state.
ParagraphCitations: It is used to display and format citations or references to bibliographic sources in a paragraph format within the context of information related to Gene Ontology (GO) terms in the user interface.
CellularComponent: It is a function of the React component that is used to represent and display information about the "cell location" category of Gene Ontology terms.
MolecularFunction: It is a function within a React component that is used to display information about the "molecular function" category of Gene Ontology terms.
BiologicalProcess: It aims to present in a structured and readable way details about the biological processes in which specific genes or proteins are involved.
GeneOntologyItem: Its main function is to represent and display detailed information about a specific Gene Ontology term along with its corresponding citations or references to sources.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

 
**/

import React, { useMemo } from "react";
import { indexedReferences } from "ui-components/utils/References";
import { ParagraphCitations, CITATION_SIZE } from "ui-components/Web/Citations";

/**
 * Description placeholder
 *
 * @type {{ fontWeight: string; textAlign: string; }}
 */
const thStyle = {
  fontWeight: "bold",
  textAlign: "inherit",
};

/**
 * Description placeholder
 *
 * @type {{ textAlign: string; }}
 */
const trStyle = {
  textAlign: "inherit",
};

/**
 * Description placeholder
 *
 * @export
 * @param {{ geneOntologyTerms: any; allCitations: any; }} {
  geneOntologyTerms,
  allCitations
}
 * @returns {React.JSX}
 */
export default function GeneOntologyTerms({ geneOntologyTerms, allCitations, pageReferences }) {
  const references = useMemo(() => {
    return pageReferences ? pageReferences : indexedReferences(allCitations);
  }, [allCitations, pageReferences]);
  //console.log(references);
  if (!geneOntologyTerms) {
    return null;
  }
  return (
    <div>
      {CellularComponent(geneOntologyTerms?.cellularComponent, references)}
      {MolecularFunction(geneOntologyTerms?.molecularFunction, references)}
      {BiologicalProcess(geneOntologyTerms?.biologicalProcess, references)}
    </div>
  );
}


function CellularComponent(cc, references) {
  //console.log(cc)
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 1%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Cellular Component</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>{GeneOntologyItem(cc, references)}</table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function MolecularFunction(cc, references) {
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 1%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Molecular Function</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>{GeneOntologyItem(cc, references)}</table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function BiologicalProcess(cc, references) {
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 1%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Biological Process</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>{GeneOntologyItem(cc, references)}</table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function GeneOntologyItem(components, references) {
  //console.log(genes)
  return (
    <tbody>
      {components.map(
        (component) => {
          return (
            <tr
              className={"trShadow"}
              style={trStyle}
              key={`ccT_${component._id}`}
            >
              <td>
                <div style={{display: "flex"}} >
                  <div>{component.name}</div>
                  <div style={{marginLeft: "10px"}} >
                    <ParagraphCitations
                      citationSize={CITATION_SIZE.ONLY_INDEX}
                      citations={component.citations}
                      references={references}
                    />
                  </div>
                </div>
              </td>
            </tr>
          );
        }
      )}
    </tbody>
  );
}
