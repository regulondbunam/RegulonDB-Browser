/** 

# Component (user guide)

# NavigationTabs
	
## Description  
	
It creates a tabbed navigation interface.

## Category   
	
Functional

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[example: <NavigationTabs tabSelect="tab1" tabs={tabs} title="Tabs Example" />]

## Props 

| Attribute | Type | Default | Description                                 |
| --------- | ---- | ------- | ------------------------------------------- |
|tabSelect	|string|	init	 |The initially selected tab's id.             |
|tabs	      |array |	[]     |An array of tab objects, each defining a tab.|
|title	    |string|	""     |	The title for the navigation tabs.         |


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
React: This is the core library for building user interfaces in a React application. It provides the necessary tools and functionality to create React components and manage their state.
useState: useState is a React hook used for adding state to functional components. It allows you to define and manage state variables within a functional component. In the NavigationTabs component, it is used to manage the currently selected tab.
Style: Style is used to apply CSS styles to elements within the component.
Box (from Material-UI): This is a component from the Material-UI library, a popular library for building user interfaces in React applications. Box is a versatile component that can be used for layout and styling purposes.
HeaderNav: it is a component used for rendering the header navigation section with a logo, title, and a search input field. 
headerStyle: This is likely an object containing CSS styles that are used to style elements within the NavigationTabs component.
StyledTabs: it is a custom version of Tabs that inherits all of its properties and is used to have finer control over the appearance of tabs and their indicator.
StyledTab: it is another custom component created using MUI styled. This custom component is based on MUI's Tab component.


## States
	
| Property | Value   | Description                                 |
| -------- | ------- | ------------------------------------------- |
|value	   |tabSelect|	Represents the currently selected tab's id.|


## Hooks
|  Name  | Description                                                                                                                                       |  Syntax  | Additional Notes or References | 
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------ |
|useState| It is a React hook that allows adding state to functional components. It is used to declare and manage local states in functional components.     |const [state, setState] = useState(initialState);|                                |


**/

import React, { useState } from "react";
import Style from "./info.module.css";
import Box from "@mui/material/Box";
import { HeaderNav } from "./headerNav";
import { headerStyle, StyledTab, StyledTabs } from "./style"


/**
 * Description placeholder
 *
 * @type {"regulonDBNavTabs"}
 */
const idNavTabs = "regulonDBNavTabs"
export { idNavTabs }


/**
 * Description placeholder
 *
 * @param {{ tabSelect?: string; tabs?: {}; title?: string; }} { tabSelect = "init", tabs = [], title = "" }
 * @returns {*}
 */
function NavigationTabs({ tabSelect = "init", tabs = [], title = "" }) {

  const [value, setValue] = useState(tabSelect);

  
  /**
   * Description placeholder 
   *  
   * @param {*} event
   * @param {*} newValue
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id={idNavTabs}>
      <div id="headerNavTabs" className="noPrint">
        <HeaderNav title={title} />
        <div id={idNavTabs} className={Style.tabHeader} style={headerStyle}>
          <Box>
            <StyledTabs
              variant="scrollable"
              scrollButtons
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
            >
              {tabs.map(
                
                /**
                 * Description placeholder
                 *
                 * @param {*} tab
                 * @param {*} index
                 * @returns {*}
                 */
                (tab, index) => {
                if (tab.noTab) {
                  return null
                }
                const TabElement = (
                  <div >
                    {tab.subtitle && (<div>{tab.subtitle}</div>)}
                    <div className={Style.tab_name}>{tab.name}</div>
                  </div>
                );
                return (
                  <StyledTab
                    disabled={tab.disabled}
                    value={tab.id}
                    key={`operon_tab${index}_${tab.id}`}
                    icon={TabElement}
                  />
                );
              })}
            </StyledTabs>
          </Box>
        </div>
      </div>
      <div>
        <div>
          <div>
            {tabs.map(
              
              /**
               * Description placeholder
               *
               * @param {*} tab
               * @param {*} index
               * @returns {*}
               */
              (tab, index) => {
              if (tab.position === "head") {
                return (
                  <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                    <br />
                    {tab.component}<br />
                  </div>
                )
              }
              return null
            })}
          </div>
          <div className={Style.container} >
            <div className={Style.article}>
              {tabs.map((tab, index) => {
                if (!tab.position && tab.id===value) {
                  return (
                    <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                      {tab.component}<br />
                    </div>
                  )
                }
                return null
              })}
            </div>
            <div className={Style.aside} >
            {tabs.map((tab, index) => {
              if (tab.position === "aside") {
                return (
                  <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                    <br />
                    {tab.component}<br />
                  </div>
                )
              }
              return null
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationTabs;
