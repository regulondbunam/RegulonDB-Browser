/**
 # Component (user guide)

# HeaderNav
	
## Description  
It  is  a component used for rendering the header navigation section with a logo, title, and a search input field.

## Category   
	
Visual, Structural

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[example: <HeaderNav /> ]

## Props 

| Attribute | Type | Default | Description                                                            |
| --------- | ---- | ------- | ---------------------------------------------------------------------- |
|title      |string|         | is used inside an <h1> element, rendering the title provided as a prop.|


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 
Visual

## Dependencies
Style from "./info.module.css": This line imports a CSS module named info.module.css using the Style alias.
LogoRegulonDB from "./logos/regulonDB.png": This line imports an image file named regulonDB.png from the logos directory and assigns it to the LogoRegulonDB variable. This variable will be used to display the RegulonDB logo in the React component.
InputSearch from "../../../apps/search/InputSearch": This line imports a component named InputSearch from a relative path. It appears to be related to searching functionality and is used within the React component.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |


 * **/

import Style from "./info.module.css";
import LogoRegulonDB from "./logos/regulonDB.png";
import InputSearch from "../../../apps/search/InputSearch";


/**
 * Description placeholder
 *
 * @export
 * @param {{ title: any; }} { title }
 * @returns {*}
 */
export function HeaderNav({ title }) {
    return (
        <div id="headerNav" style={{display: "none"}}  >
            <div>
                <div>
                    <img
                        className={Style.headerNav_LogoRDB}
                        src={LogoRegulonDB}
                        alt="Logo RegulonDB"
                    />
                </div>
                <div>
                    <h1>{title}</h1>
                </div>
            </div>
            <div>
                <InputSearch />
            </div>
        </div>
    )
}