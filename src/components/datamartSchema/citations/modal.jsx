/**
 # Component (user guide)

# Modal
	
## Description  
	
This component is responsible for displaying a modal citation containing information about an evidence and a publication.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

{evidence = {}, publication = {}, index, small= true}
## Props 

| Attribute | Type | Default | Description                  |
| --------- | ---- | ------- | ---------------------------- |
| evidence  |Object|         |It's a type Evidence of datamart|
|publication|Object|         |is a type Publication of datamart|
| index     |Object|         |Track the position of the citation in the citation list or matrix.|
| small     |Object|         |Decide whether the size of the citation is small or not.|


## Exception
---

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

[Visual]

## Dependencies
React:  Imports the main React library, which is used to create components and manage state.
PropTypes: Imports the main React library, which is used to create components and manage state.
Box: The Box component is a versatile container used to wrap and design other components and content.
Modal: The Modal component creates an overlay pop-up window that is used to display additional content or information in response to a user action.
Publication: The Publication component shows the reference of the information consulted.
EvidenceTitle: The EvidenceTitle component is used to display evidence information in a specific format and uses the properties provided to customize the content.
labelCitation: The LabelCitation provides information about the citation label in specific format.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|open      |false  | A Boolean state that controls whether the modal is open (true) or closed (false).
|

## Hooks
|  Name  | Description                                                                                                                 |  Syntax                                               | Additional Notes or References | 
| ------ | ----------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------| ------------------------------ |
|useState|It is one of the fundamental hooks provided by React that allows functional components to maintain and manage internal state.|const [state, setState] = React.useState(initialState);|                                |


 **/

import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Publication } from "./publication";
import { EvidenceTitle } from "./evidence";
import { Evidences } from "./evidences";
import { labelCitation } from "./label";
import { CITATION_SIZE } from ".";
import { DataVerifier } from "../../ui-components";
/**
 * Description placeholder
 *
 * @type {{ position: string; top: string; left: string; transform: string; width: number; bgcolor: string; border: string; boxShadow: number; p: number; }}
 */
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/**
 * Description placeholder
 *
 * @type {{ evidence: any; publication: any; }}
 */
const PROP_TYPES = {
  evidence: PropTypes.object,
  publication: PropTypes.object,
};

/**
 * Description placeholder
 * @export
 * @param {{ evidence?: {}; publication?: {}; index: any; small?: boolean; }} {evidence = {}, publication = {}, index, small= true}
 * @returns {React.JSX}
 */
export function ModalCitation({
  evidence = {},
  evidences = {},
  publication = {},
  isEvidence = false,
  showIndex = true,
  citationSize = CITATION_SIZE.LARGE,
}) {
  const [open, setOpen] = React.useState(false);

  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const handleOpen = () => setOpen(true);

  /**
   * Description placeholder
   *
   * @returns {void}
   */
  const handleClose = () => setOpen(false);
  return (
    <>
      <p
        style={{
          fontWeight: open ? "bold" : "normal",
          fontSize: open ? "13px" : "13px"
        }}
        className="aBase citation"
        onClick={handleOpen}
        dangerouslySetInnerHTML={{
          __html: labelCitation({
            citationSize: citationSize,
            isEvidence: isEvidence,
            publication: publication,
            evidence: evidence,
            evidences: evidences,
            showIndex: showIndex,
          }),
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {publication?._id && <Publication {...publication} />}
          {DataVerifier.isValidArray(publication.evidences) && (
            <Evidences evidences={publication.evidences} />
          )}
          {evidence?._id && <EvidenceTitle {...evidence} />}
        </Box>
      </Modal>
    </>
  );
}

ModalCitation.propTypes = PROP_TYPES;
