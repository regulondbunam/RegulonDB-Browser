/**
 # Component (user guide)

# Evidence
	
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
export function EvidenceTitle({
    _id,
    additiveEvidenceCodeRule = 0,
    code = "",
    name = "",
    type = "",
}) {

    
    /**
     * Description placeholder
     * @type {HTMLElement}
     */
    let evidenceType
    switch (type) {
        case "S":
            evidenceType = <span style={{ fontWeight: "bold", color: "#0C6A87" }} >Strong</span>
            break;
        case "C":
            evidenceType = <span style={{ fontWeight: "bold", color: "#000000" }} >Confirmed</span>
            break;
        case "W":
            evidenceType = <span style={{ color: "#0C6A87" }} >Weak</span>
            break;
        default:
            evidenceType = ""
            break;
    }
    if(code !== ""){
        code = code+": "
    }
    return (
        <div>
            <h2>Evidence:</h2>
            <h3>
                {code}{name}
            </h3>
            <p style={{fontSize: "20px"}} >{evidenceType}</p>
        </div>
    );
}

EvidenceTitle.propTypes = PROP_TYPES