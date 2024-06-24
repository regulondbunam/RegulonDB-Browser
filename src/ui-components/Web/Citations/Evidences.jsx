/**
 # Component (user guide)

# Evidences
	
## Description  
	
It is used to display evidence information in a specific format and uses the properties provided to customize the content.

## Category   
	
[Visual]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

## Props 

| Attribute              | Type | Default | Description |
| ---------------------  | ---- | ------- | ----------- |
|   _id                  |      |String   |It is expected to be a chain and is required.|
|additiveEvidenceCodeRule|      |  number |It can be a number, but it is not required.|
|       code             |      | String  |It is expected to be a chain, but is not required.|
|          name          |      | String  |It is expected to be a chain, but is not required.|
|additiveEvidenceCodeRule|      | String  |It is expected to be a chain, but is not required.|

## Exception

--

## License

MIT License

## Author 
	
RegulonDB Team


# Component (technical guide)

## Component Type 

[ Visual ]


## Dependencies
PropTypes: It is used to define the expected types and requirements of the props passed to the EvidenceTitle component. 

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 **/


import PropTypes from 'prop-types';
import { useId } from 'react';
import { Typography } from '@mui/material';


/**
 * Description placeholder
 * @constant
 * @type {{ _id: any; additiveEvidenceCodeRule: any; code: any; name: any; type: any; }}
 */
const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    additiveEvidenceCodeRule: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
};


/**
 * Description placeholder
 * @export
 * @param {{ _id: any; additiveEvidenceCodeRule?: number; code?: string; name?: string; type?: string; }} {
    _id,
    additiveEvidenceCodeRule = 0,
    code = "",
    name = "",
    type = "",
}
 * @returns {React.JSX}
 */
export function Evidences({
    evidences
}) {
    const id = useId()
    return (
        <div>
            <Typography variant='relevantB' >
                {evidences.length > 1 ? "Evidences:" : "Evidence:"}
            </Typography>
            <div style={{ marginTop: "10px" }}  >
                {evidences.map((evidence) => {
                    let evidenceType = "", evidenceCode = "";
                    switch (evidence.type) {
                        case "S":
                            evidenceType = <span style={{ fontWeight: "bold", }} >Strong</span>
                            evidenceCode = <span style={{ fontWeight: "bold", }} >{evidence.code}</span>
                            break;
                        case "C":
                            evidenceType = <span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>
                            evidenceCode = <span style={{ fontWeight: "bold", color: "#000000" }} >{evidence.code}</span>
                            break;
                        case "W":
                            evidenceType = <span style={{}} >Weak</span>
                            evidenceCode = <span style={{}} >{evidence.code}</span>
                            break;
                        default:
                            evidenceType = ""
                            break;
                    }
                    return (
                        <div key={`evidence_${evidence._id}_${id}`} style={{ display: "flex" }} >
                            <div>[EV{evidence.index}]</div>
                            <div>
                                <Typography variant='normal' >{evidenceCode}</Typography><br />
                                <Typography variant='normal' >{evidence.name}</Typography><br />
                                <Typography variant='normal' >{evidenceType}</Typography>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

Evidences.propTypes = PROP_TYPES