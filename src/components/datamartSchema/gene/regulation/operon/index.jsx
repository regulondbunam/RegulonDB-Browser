/**
 # Component (user guide)

# Operon
	
## Description  	
It is used to display basic information about an operon and, if available, details about the organization of that operon. Each row in the organization table contains information about a transcription unit, its associated promoters and related regulators.

## Category   
Visual  

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description                                                                                       |
| --------- | ---- | ------- | ------------------------------------------------------------------------------------------------- |
|    _id    |string|         |A text string used to uniquely identify the object to which it refers.                             |
|arrangement|array |         |It use to represent the organization of transcription units, promoters and regulators in an operon.|
|   name    |string|         |Operon's name                                                                                      |


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
Link: it  is a component provided by the "react-router-dom" library, which is used to create links (hyperlinks) in a React application that uses routing provided by React Router.
DataVerifier: it is use for verification or validation of data in the application.


## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

 * **/

import { Link } from "react-router-dom";
import { DataVerifier } from "../../../../ui-components";

/**
 * Description placeholder
 *
 * @export
 * @param {{ _id: any; arrangement: any; name: any; }} {
    _id,
    arrangement,
    name,
}
 * @returns {React.JSX}
 */
export default function Operon({ _id, arrangement, name, organismId }) {
  return (
    <div>
      <div style={{display: "flex"}}>
      <p><b>Operon: </b></p>
      <Link to={"/operon/" + _id + "?organism=" + encodeURIComponent(organismId)}>
        <p style={{marginLeft: "5px"}} >
          <b>{`${name}`}</b>
        </p>
      </Link>
      </div>
      
      {DataVerifier.isValidArray(arrangement) && (
        <div>
          <p style={{ fontSize: "14px" }}>
            <b>Arrangement: </b>
          </p>
          <table className="tableAccent">
            <thead>
              <th>Transcription Unit</th>
              <th>Promoter</th>
              <th>Regulators</th>
            </thead>
            <tbody>
              {arrangement.map(
                /**
                 * Description placeholder
                 *
                 * @param {object} arr - object that contains the promoters and regulators.
                 * @param {string} indx - The unique identifier of the  object that contains the promoters and regulators.
                 * @returns {React.JSX}
                 */
                (arr, indx) => (
                  <tr key={`arrOperon${_id}_${indx}`}>
                    <Arrangement {...arr} />
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/**
 * Description placeholder
 *
 * @param {{ promoters: any; regulators: any; transcriptionUnit: any; }} {
    promoters,
    regulators,
    transcriptionUnit,
}
 * @returns {React.JSX}
 */
function Arrangement({ promoters, regulators, transcriptionUnit }) {
  //console.log(transcriptionUnit);
  return (
    <>
      <td>{transcriptionUnit.name}</td>
      <td>{promoters.map((pro) => pro.name).join(", ")}</td>
      <td>
        {regulators.map(
          /**
           * Description placeholder
           *
           * @param {string} regulator - The object representing the regulator.
           * @param {number} index - The index of the regulator in the list.
           * @returns {React.JSX} - Returns an element (in this case, a JSX link).
           */
          (regulator, index) => {
            let fun = "";
            switch (regulator.function) {
              case "repressor":
                fun = "-";
                break;
              case "activator":
                fun = "+";
                break;
              case "dual":
                fun = "+-";
                break;
              default:
                fun = "";
                break;
            }
            return (
              <Link
                to={"/regulon/" + regulator._id}
                key={`${regulator.name}_${regulator._id}_${index}`}
                style={{marginLeft: "10px"}}
              >{`${regulator.name}${fun}`}</Link>
            );
          }
        )}
      </td>
    </>
  );
}
