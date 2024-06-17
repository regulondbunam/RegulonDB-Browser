/**
 # Component (user guide)

# Publication
	
## Description  
	
Component showing the reference from which the information was obtained.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| _id       |string|         |It is not in use.|
| citation  |string|         |It refers to a citation or bibliographic reference associated with the publication displayed in the Publication component.|
| pmid      |string|         |It refers to the PubMed ID (PubMed Identifier) associated with the publication displayed in the Publication component.|
| title     |string|         |It is not in use.|
|  url      |string|         |It refers to the URL (Uniform Resource Locator) associated with the publication displayed in the Publication component.|
| year      |number|         |It is not in use.|


## Exception

--

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

[Visual]

## Dependencies
PropTypes: it helps ensure that components receive the correct properties in the correct format, which improves code integrity and robustness.
React: React is a JavaScript library developed by Facebook that is used to build interactive, component-based user interfaces.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/

import PropTypes from "prop-types";
import React from "react";
import { DataVerifier } from "ui-components/utils";
import { Typography } from "@mui/material";

/**
 * Description placeholder
 *
 * @type {{ _id: any; authors: any; citation: any; pmid: any; title: any; url: any; year: any; }}
 */
const PROP_TYPES = {
  _id: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  citation: PropTypes.string,
  pmid: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  year: PropTypes.number,
};

/**
 * Description placeholder
 *
 * @export
 * @param {{ _id: any; authors?: {}; citation?: string; pmid?: string; title?: string; url?: string; year?: number; }} {
    _id,
    authors = [],
    citation = "",
    pmid = "",
    title = "",
    url = "",
    year = 0,
}
 * @returns {React.JSX}
 */
export function Publication({ citation = "", pmid = "", url = "", index }) {
  return (
    <div>
      <Typography variant="relevantB" >Reference:</Typography>
      <div style={{ display: "flex", marginTop: "10px" }} >
        <div>[{index}]</div>
        <div>
          <Typography variant="normal" >
            {citation !== "" ? citation : ""}
          </Typography>
          <br />
          <Typography variant="irrelevant" >
            {DataVerifier.isValidString(pmid) ? ` pmid:${pmid} ` : " "}
          </Typography>
        </div>
      </div>
      <Typography variant="relevant" >
        {DataVerifier.isValidString(url) && (
          <>
            {/GO.references/.test(url) ? (
              <a href="http://current.geneontology.org/metadata/go-refs.json" target="_blank" rel="noopener noreferrer">
                Go to Gene Ontology references
              </a>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer">
                Go to reference
              </a>
            )}
          </>
        )}
      </Typography>
    </div>
  );
}

Publication.propTypes = PROP_TYPES;
