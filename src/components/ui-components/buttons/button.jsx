/**
# Component (user guide)
# Component name 
Button

## Description  
The Button component is a custom implementation of an HTML button for React. It allows you to create customizable buttons with different styles and behaviors.

## Category   
Visual

## Live demo 
--

## Installation 
--

## Usage 
```javascript
<Button label="Guardar" accent onClick={handleSave} />
<Button label="Cancelar" className="cancel-button" onClick={handleCancel} disabled />
```


## Props

| props     | type     | default     | description                                                    |
| --------- | -------- | ----------- | -------------------------------------------------------------- |
| accent    | boolean  | false       | enables accent button design                                   |
| className | string   |     ""      | Class Name of item button                                      |
| disabled  | boolean  | false       | disable the button                                             |
| id        | string   |             | id to html document                                            |
| label     | string   | ""          | button label                                                   |
| style     | object   | {}          | Inline CSS styles that can be applied to the button            |
| onClick   | function |warn_noAction| insert the function to be executed when the button is pressed  |

## Exception
__Warning__
 button has no activity, use Prop "onClick" to add Activity with a function

## License

MIT License

## Author 
RegulonDB Team: 


# Component (technical guide)
## Component Type 

[Stateless functional component]

## Dependencies

React: Open source JavaScript library used to build user interfaces (UI) in web applications. React provides a component-based approach to creating interactive and responsive interfaces.

PropTypes: Library that enables the validation of property types in React components. It facilitates the specification of expected data types for properties passed to components, thus improving code safety and documentation.

Styles (imported from "./Buttons.module.css"): This allows you to customize the appearance and layout of the buttons in a consistent way throughout the application.

## States

[-]

# Function description

## [warn_noAction]
__Description:__  
[this function sends the console a warning that the button does not have a designated action]

__Usage:__
[This function is internal to the component and is invoked when the button has no related activity]

__Scope: __
[-]

__Input Parameter:__  
[-]

__Return:__
[Displays a UX warning on the console, the button has no activity ]

## [selectStyle]
__Description:__  
[this function is private, it sets the classes of the html object button ]

__Usage:__
```javascript
selectStyle(className,accent,disabled)
```
__Scope: __
[-]

__Input Parameter:__  

* __Param - __ __[accent]__

Description this is a button prop accent

* __Param - __ __[disabled]__

Description this is a button prop disabled

__Return:__  

* __Type - __ __[StyleClass]__

Description the class name requiere of css

**/

import React from "react";
import PropTypes from "prop-types";
import Styles from "./Buttons.module.css";


/**
 * Description placeholder
 *
 * @param {{ accent?: boolean; className?: string; children: any; disabled?: boolean; id: any; label?: string; style?: {}; onClick?: () => void; }} {
  accent = false,
  className = "",
  children,
  disabled = false,
  id,
  label = "",
  style = {},
  onClick = warn_noAction
}
 * @returns {void; }): any; propTypes: { accent: any; className: any; disabled: any; id: any; label: any; onClick: any; style: an...}
 */
const Button = ({
  accent = false,
  className = "",
  children,
  disabled = false,
  id,
  label = "",
  style = {},
  onClick = warn_noAction
}) => {
  
  /**
   * Description placeholder
   *
   * @param {Event} event - The click event object.
   */
  function OnClick(event) {
    if (!disabled) {
      onClick(event);
    }
  }

  return (
    <button
      id={id}
      className={selectStyle(className, accent, disabled)}
      onClick={OnClick}
      style={style}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;


/**
 * Internal function to select the button style classes.
 *
 * @param {string} className - Additional CSS classes for the button.
 * @param {boolean} accent - Indicates if the button should have an accent style.
 * @param {boolean} disabled - Indicates if the button is disabled.
 * @returns {string} The CSS classes selected for styling the button.
 */
function selectStyle(className, accent, disabled) {
  let styleClass = className + Styles.button;
  accent
    ? (styleClass += " " + Styles.accent)
    : (styleClass += " " + Styles.default);
  disabled ? (styleClass += " " + Styles.disabled) : (styleClass += " ");

  return styleClass;
}


/**
 * Description placeholder
 */
function warn_noAction() {
  console.warn(
    'Button has no activity, use Prop "onClick" to add Activity with a function n.n'
  );
}


Button.propTypes = {
  accent: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};
