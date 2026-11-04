/** 
 # Component (user guide)

# Regulation
	
## Description  
	
It is a React component that is responsible for rendering information related to the regulation of an operon and its regulators.

## Category   
Visual 

## Live demo 
--

## Installation or Implementation
--

## Usage 
--

## Props 

| Attribute | Type | Default | Description                                  |
| --------- | ---- | ------- | ---------------------------------------------------------------------- |
|  operon   |      |         |An object representing the operon information.                          |
|regulators |      |         |A matrix containing information about regulators related to the operon. |
|statistics |      |         |An object containing statistics related to the operon.                  |


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
Operon: This dependency is used to display detailed information about the operon related to the regulation.
Regulators:  This dependency is used to display detailed information on regulators related to the regulation.
DataVerifier: It is use for verification or validation of data within the "Regulation" component.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

 * **/

//import PropTypes from 'prop-types';
import Operon from './operon';
import Regulators from './regulators';
import { DataVerifier } from "../../../ui-components";
//import { ParagraphCitations, NoteCitations } from "../../citations";


/**
 *
 * @export
 * @param {{ operon: any; regulators: any; statistics: any; }} {
    operon,
    regulators,
    statistics,
}
 * @returns {React.JSX}
 */
export function Regulation({
    operon,
    regulators,
    statistics,
    organismId
}) {

    return (
        <div style={{ display: 'flex', justifyContent: "space-around" }} >
            <div>
                <Operon {...operon} organismId={organismId} />
            </div>
            <div>
                <p style={{ fontSize: "18px" }} ><b>{`Regulators`}</b></p>
                <div style={{ marginLeft: "1%" }}>
                    {DataVerifier.isValidArray(regulators) && (
                        <Regulators regulators={regulators} />
                    )}
                </div>
            </div>
            <div>
                <p style={{ fontSize: "18px" }} ><b>{`Statistics`}</b></p>
                <div style={{ marginLeft: "1%" }}>
                    {DataVerifier.isValidObject(statistics) && (
                        <Statistics statistics={statistics} />
                    )}
                </div>
            </div>


        </div>
    )
}


/**
 * Description placeholder
 *
 * @param {{ statistics: any; }} { statistics }
 * @returns {React.JSX}
 */
function Statistics({ statistics }) {
    return (
        <table className="tableAccent" >
            <tbody>
                {Object.keys(statistics).map(
                    
                    /**
                     * Description placeholder
                     *
                     * @param {number} key - Statistics key
                     * @param {number} index - Statistics index
                     * @returns {React.JSX}
                     */
                    (key, index) => {
                    let statistic = statistics[key]
                    if (!statistic || key === "__typename") {
                        return null
                    }
                    return <tr key={"statisticsRow_" + index + "_" + key}>
                        <td>{key}</td>
                        <td>{statistic}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}