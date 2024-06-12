/** 
# Component (user guide)

# NavigationTabs
	
## Description  
	
It is used to create a tabbed navigation user interface that allows users to switch between different sections of content. It also includes functions to manage scrolling behavior and menu visibility.

## Category   
	
Visual, Structural

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[example: <NavigationTabs tabSelect="tab1" tabs={tabs} title="Mi Aplicación" />]

## Props 

| Attribute | Type | Default |          Description                                                                                                       |
| --------- | ---- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
|tabSelect  |string| init    |The key of the initially selected tab.                                                                                      |
|tabs       |array | []      |An array containing the tab configuration and its contents. Each object in this array could include id, name, and component.|
|title      |string| ""      |The general title of the section or page.                                                                                   |


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
React: it is the core JavaScript library used to build interactive, component-based user interfaces (UI) in web applications.
useState: it is used to define and manage local state in functional components.
useEffect: it is used to execute side effects on functional components, such as listening for events, performing network requests, etc.
Style (imported from "./info.module.css"): it is a variable used to import CSS styles defined in the info.module.module.css module. This allows applying custom styles to HTML elements within the component.
Box: it is a component provided by the Material-UI (MUI) library. MUI is a UI component library for React that provides a wide variety of predefined components for creating attractive and consistent interfaces.
HeaderNav: it is used to render a navigation bar at the top of the user interface.
StyledTabs: it is a custom version of Tabs that inherits all of its properties and is used to have finer control over the appearance of tabs and their indicator.
StyledTab: it is another custom component created using MUI styled. This custom component is based on MUI's Tab component.
ButtonGroup: it is a component provided by the Material-UI (MUI) library. It is used to group related buttons and apply consistent styles to them, such as alignment and spacing.
Button: it is another component provided by Material-UI. It is used to create buttons in the user interface.

## States
	
| Property | Value    | Description                                     |
| -------- | -------- | ----------------------------------------------- |
|value     |tabSelect | This state is used to control the active tab.   |
|section   |title     | Used to hold the current section title.         |
|viewMenu  |true      | Controls the visibility of the navigation menu. |

## Hooks
|  Name   | Description                                                                                                                                       |  Syntax                                         | Additional Notes or References | 
| ------  | ------------------------------------------------------------------------------------------------------------------------------------------------  | ----------------------------------------------- | ------------------------------ |
|useState | It is a React hook that allows adding state to functional components. It is used to declare and manage local states in functional components.     |const [state, setState] = useState(initialState);|                                |
|useeffect| It is a React hook used to perform side effects on functional components.                                                                         |useEffect(() => {}, [dependencies]);             |                                |

# Functions description

## handleMenu


__Description:__  
This function is used to toggle the visibility of an HTML element with the id "navBody". It changes the CSS classes applied to the element to show or hide the menu and updates the viewMenu state to reflect the new visibility.


__Usage:__

```javascript
&handleMenu();
```

__Scope: __
 This function is defined in the NavigationTabs component of the code.

__Input Parameter:__  
It does not receive input parameters.


__Return:__  
 __[Type]:__ [Name]
It does not return any value. Its main function is to change the visibility of the menu in the user interface and update the viewMenu state of the NavigationTabs component.


## handleChange

__Description:__  

 The handleChange function is responsible for managing the change in tab selection within the StyledTabs component. 

__Usage:__

```javascript
&handleChange(event, newValue);
```

__Scope: __
The handleChange function is defined within the NavigationTabs component.

__Input Parameter:__  
event: The event that triggered the tab selection change.
newValue: The new selected value (usually the id of the selected tab).


__Return:__  
 __[Type]:__ [Name]
 The function does not return any explicit value, as its main function is to handle the tab selection change and update the user interface accordingly.

**/
import React, { useState, useEffect } from "react";
import Style from "./info.module.css";
import Box from "@mui/material/Box";
import { HeaderNav } from "./headerNav";
import { StyledTab, StyledTabs } from "./style"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';


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
 * @param {array} [tabs=[]]
 * @param {*} setValue
 * @param {*} setSection
 * @param {string} [title=""]
 */
function scrollFunction(tabs = [], setValue, setSection, title = "") {

  /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
  let buttonHideMenu = document.getElementById("buttonHideMenu")
  if (
    document.body.scrollTop > 260 ||
    document.documentElement.scrollTop > 260
  ) {
    /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let headerNav = document.getElementById("headerNav")
    /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let headerNavTabs = document.getElementById("headerNavTabs")
    /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let navMenuTabs = document.getElementById("navMenuTabs")


    if (headerNav) {
      headerNav.className = Style.headerNavShow
      headerNav.style.display = "flex"
      tabs.forEach((tab) => {
        /**
         * Description placeholder
         *
         * @type {HTMLElement}
         */
        const elementTab = document.getElementById(tab.id)
        if (elementTab && !tab.noTab) {
          const { y, height } = elementTab.getBoundingClientRect()

          /**
           * Description placeholder
           *
           * @type {*}
           */
          const hNav = headerNav.getBoundingClientRect().height
          if (y <= hNav + 75 && y + height >= y * -1) {
            setSection(`${title}, ${tab.subtitle ? tab.subtitle + ":" : ""} ${tab.name}`)
            setValue(tab.id)
          }
        }
      })
    }
    if (headerNavTabs) {
      headerNavTabs.className = Style.headerSticky
    }
    if (navMenuTabs) {
      navMenuTabs.className = Style.menuSticky
    }
    if (buttonHideMenu) {
      buttonHideMenu.className = Style.hideMenuSticky
    }
  } else {

    /**
     * Description placeholder
     *
     * @type {HTMLElement}
     */
    let headerNav = document.getElementById("headerNav")
    if (headerNav) {
      headerNav.style.display = "none"
    }
    if (buttonHideMenu) {
      buttonHideMenu.className = Style.hideMenu
    }
  }
}


/**
 * Description placeholder
 *
 * @param {{ tabSelect?: string; tabs?: {}; title?: string; }} { tabSelect = "init", tabs = [], title = "" }
 * @returns {*}
 */
function NavigationTabs({ tabSelect = "init", tabs = [], title = "" }) {

  const [value, setValue] = useState(tabSelect);
  const [section, setSection] = useState(title);
  const [viewMenu, setViewMenu] = useState(true);


  useEffect(() => {
    window.onscroll = function () {
      scrollFunction(tabs, setValue, setSection, title);
    };
    /**
     * Description placeholder
     *
     * @type {HTMLElement}
     */
    let buttonHideMenu = document.getElementById("buttonHideMenu")
    if (buttonHideMenu) {
      if (
        document.body.scrollTop > 260 ||
        document.documentElement.scrollTop > 260
      ) {
        buttonHideMenu.className = Style.hideMenuSticky
      } else {
        buttonHideMenu.className = Style.hideMenu
      }
    }

    /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let navMenuTabs = document.getElementById("navMenuTabs")
    if (navMenuTabs) {
      navMenuTabs.className = Style.menuSticky
    }
    return function cleanup() {
      window.onscroll = function () { };
    };
  }, [tabs, viewMenu, title]);



  /**
   * Description placeholder
   */
  const handleMenu = () => {
    /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let navBody = document.getElementById("navBody")
    if (navBody) {
      if (viewMenu) {
        navBody.className = Style.navBodyMenuHide
      } else {
        navBody.className = Style.navBody
      }
      setViewMenu(!viewMenu)
    }

  }
  
  /**
   * Description placeholder
   *
   * @param {*} event
   * @param {*} newValue
   */
  const handleChange = (event, newValue) => {
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let tabSelect = tabs.find(tab => tab.id === newValue)
    
   /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let sectionElement = document.getElementById(newValue);
    
    /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
    let headerNavTabs = document.getElementById("headerNavTabs")
    if (sectionElement) {
      
      /**
       * Description placeholder
       *
       * @type {*}
       */
      let rect = sectionElement.getBoundingClientRect();
      
      /**
       * Description placeholder
       *
       * @type {*}
       */
      let headerRect = headerNavTabs.getBoundingClientRect()
      
      /**
       * Description placeholder
       *
       * @type {*}
       */
      let move = document.documentElement.scrollTop
      if (rect.y > headerRect.height) {
        move = move - headerRect.height
      } else {
        move = move + headerRect.height - 175
      }
      window.scroll({
        top: rect.y + move,
        behavior: 'smooth'
      });
    }
    if (tabSelect) {
      setSection(`${title}, ${tabSelect.subtitle ? tabSelect.subtitle + ":" : ""} ${tabSelect.name}`)
    }
    setValue(newValue);
  };
  return (
    <div id={idNavTabs}>
      <div id="headerNavTabs" className="noPrint" >
        <HeaderNav title={section} />
      </div>
      <div id="navBody" className={Style.navBody} >
        {viewMenu ? (
          <div className={Style.navMenu} >
            <div id="navMenuTabs" className={Style.tabHeader} >
              <Box>
                <StyledTabs
                  orientation="vertical"
                  scrollButtons
                  value={value}
                  onChange={handleChange}
                  aria-label="styled tabs example"
                >
                  <ButtonGroup
                    disableElevation
                    orientation="vertical"
                    size="small"
                    color="secondary"
                    sx={{
                      marginRight: "5%"
                    }}
                  >
                    <Button onClick={handleMenu} >Hide Menu</Button>
                    <Button
                      onClick={() => {
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        })
                      }}
                    >Back to top</Button>
                  </ButtonGroup>
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
                    
                    /**
                     * Description placeholder
                     *
                     * @type {*}
                     */
                    const TabElement = (
                      <div >
                        {tab.subtitle && (<div>{tab.subtitle}</div>)}
                        <div className={Style.tab_name}>{tab.name}</div>
                      </div>
                    );
                    return (
                      <StyledTab
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
        )
          : (<div  >
            <div id="buttonHideMenu" className={Style.hideMenu} >
              <Button size="small" color="secondary" onClick={handleMenu} >
                Show Menu
              </Button>
            </div>

          </div>)
        }
        <div className={Style.navContent} >
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
            <div className={Style.article}>
              {tabs.map((tab, index) => {
                if (!tab.position) {
                  return (
                    <div key={"component_" + tab.id + "_" + index} id={tab.id}>
                      {tab.component}<br />
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>
        <div className={Style.navAside} >
          <div className={Style.aside} >
            {tabs.map(
              
              /**
               * Description placeholder
               *
               * @param {*} tab
               * @param {*} index
               * @returns {*}
               */
              (tab, index) => {
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
  )
}

export default NavigationTabs;
