/** 
 # Component (user guide)

# Card
	
## Description  
It provides a title card that can be expanded or collapsed by clicking a button. It can be further customized through additional options, such as hiding the title or controlling its visibility through custom events.

## Category   
Visual

## Live demo 
--

## Installation or Implementation
--

## Usage 
	
[<Card id="example-card" title="Ejemplo de Tarjeta">
  <p>Contenido de la tarjeta...</p>
</Card>
 ]

## Props 

| Attribute |   Type   | Default | Description                     |
| --------- | -------- | ------- | ------------------------------- |
|children   |React Node|         | The contents of the card.       |
|id         |string    |         |A unique identifier for the card.|
|title      | string   |""       |The title of the card.           |
|options    | object   |{}       |A custom options object.         |


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
React: The main React library used to create components and manage the state of the user interface.

useEffect: A React hook used to perform side effects on functional components. In this case, it is used to subscribe the component to a custom event and update the state when that event is fired.

useMemo: A React hook that is used to memoize expensive calculations and avoid recalculating them on every render. In this case, it is used to combine the default options with the options provided as properties of the Card component.

Paper and Box from @mui/material: Material-UI components used to create the visual structure of the card.

KeyboardArrowDownIcon and KeyboardArrowUpIcon from @mui/icons-material: Material-UI icons used to represent down and up arrows, which are used in the expand/collapse button of the card.

IconButton from @mui/material: A Material-UI component representing a button with an icon.

Tooltip of @mui/material: A Material-UI component that provides additional information in the form of a popup message (tooltip) when hovering over an element, such as the card expand/reduce button.

## States
	
| Property | Value | Description                                 |
| -------- | ----- | ------------------------------------------- |
|view      | bool  |Indicates whether the card is visible or not.|


## Hooks
|  Name    | Description                                                                                                                                                                                                             |  Syntax                          | Additional Notes or References | 
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------ |
|useEffect | A React hook used to perform side effects on functional components. In this case, it is used to subscribe the component to a custom event and update the state when that event is triggered.                            | useEffect(callback, dependencies)|React documentation on useEffect|
|useMemo   |A React hook used to memorize expensive calculations and avoid recalculating them on every render. In this case, it is used to combine the default options with the options provided as properties of the Card component.| useMemo(callback, dependencies)  |React documentation on useMemo  |


# Functions description

## showCard

__Description:__  

Muestra u oculta una tarjeta mediante un evento personalizado.

__Usage:__

```javascript
&showCard(id, view);
```

__Scope: __
Esta función se utiliza para cambiar la visibilidad de la tarjeta identificada por id.

[Scope details]

__Input Parameter:__  
id: (string) The unique identifier of the card.
view: (bool) Indicates whether the card should be shown (true) or hidden (false).


__Return:__  
 __[Type]:__ void 


 * **/
import React, { useEffect, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
//import PropTypes from "prop-types";


/**
 * Description placeholder
 *
 * @export
 * @param {string} id - The unique identifier of the card.
 * @param {boolean} view - Indicates whether the card should be shown (true) or hidden (false).
 */
export function showCard(id, view) {
  
  /**
   * Description placeholder
   *
   * @type {{ view: boolean; }}
   */
  let detail = { view: view };
  
  /**
   * Description placeholder
   *
   * @type {HTMLElement}
   */
  const CARD = document.getElementById("card_" + id);
  if (CARD) {
    
    /**
     * Description placeholder
     *
     * @type {CustomEvent}
     */
    const CARD_REACTION = new CustomEvent("updateView", {
      bubbles: true,
      detail: detail,
    });
    CARD.dispatchEvent(CARD_REACTION);
  }
}


/**
 * Description placeholder
 *
 * @type {{ showTitle: boolean; }}
 */
const DEFAULT_OPTIONS = {
  showTitle: true
}

/**
 * Description placeholder
 *
 * @param {{ children: any; id: any; title?: string; options: any; }} {
  children,
  id,
  title = "",
  options
}
 * @returns {React.ReactNode}
 */
function Card({
  children,
  id,
  title = "",
  options
}) {
  const [view, setView] = React.useState(true);

  
  /**
   * Description placeholder
   *
   * @type {*}
   */
  const newOptions = useMemo(() => {
    return { ...DEFAULT_OPTIONS, ...options }
  })

  useEffect(() => {
    
    /**
     * Description placeholder
     *
     * @type {HTMLElement}
     */
    const crd = document.getElementById("card_" + id)
    if (crd) {
      crd.addEventListener(
        "updateView",
        (e) => {
          setView(e.detail.view);
        },
        false
      );
    }
  }, [id]);

  return (
    <Box>
      <Paper>
        {newOptions.showTitle && (
          <div id={"card_" + id} style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", width: "100%", backgroundColor: "#72A7C7" }}>
              <div>
                <Tooltip title={view ? "collapse" : "expand"}>
                  <IconButton
                    sx={{ width: "25px", height: "25px" }}
                    aria-label="view"
                    onClick={() => {
                      setView(!view);
                    }}
                  >
                    {view ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </Tooltip>
              </div>
              <div >
                <h2 style={{ color: "white" }} >{title}</h2>
              </div>
            </div>
          </div>
        )}
        <div>
          {view && children}
        </div>
      </Paper>
    </Box>

  )
}

export default Card;
