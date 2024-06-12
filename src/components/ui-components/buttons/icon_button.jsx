/**

# Component (user guide)

# Component name 

IconButton

## Description  

[This component is a simple button, activated by a click, ]

## Category   

[Visual, Functional Component]  

## Live demo 

[-]

## Installation 

[-]

## Usage 

[-]

## Props 

| Prop          | type    | default                   | description                                                  |
| ------------- | ------- | ------------------------- | ------------------------------------------------------------ |
| className     | string  |                           | Class Name of item button                                    |
| disabled      | boolean | false                     | disable the button                                           |
| icon          | string  | "sentiment_satisfied_alt" | icon name, you can find more icons at Material Icon https://material.io/resources/icons/?style=baseline |
| iconStyle     | object  | {}                        | icon style by object                                         |
| iconClassName | string  |                           | Class Name of item icon                                      |
| style         | object  | {}                        | style of button by object                                    |

## Exception
--

## License

MIT License

## Author 

RegulonDB Team: 


# Component (technical guide)

## Component Type 

[Stateless functional component, ClassComponent ]

## Dependencies

React : React is an open source JavaScript library used to build user interfaces (UI) in web applications. In this case, it is used to define a class component.
Component: Component is a React-specific module used to create class components in React. Class components are an older way of defining components in React, and are less commonly used compared to functional components with hooks.
PropTypes: PropTypes is a library used to specify the types of properties expected in React components. It helps to validate the properties passed to components, improving security and code documentation.
Styles (imported from "./Buttons.module.css"): Styles refers to a local CSS file named "Buttons.module.css". This file contains specific styles for the IconButton component and is used to customize its appearance.

## States

## Function description

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
selectStyle(className,disabled)
```

__Scope: __
[-]

__Input Parameter:__  

* __Param - __ __[className]__

[-]

* __Param - __ __[disabled]__

[-]

__Return:__  

* __Type - __ __[StyleClass]__

Description the class name requiere of css

**/

import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./Buttons.module.css";


/**
 * Description placeholder
 *
 * @export
 * @class IconButton
 * @typedef {IconButton}
 * @extends {Component}
 */
export default class IconButton extends Component {
  handleOnClickLink = 
  /**
   * Description placeholder
   *
   * @param {Event} event - The click event.
   */
  (event) => {
    if (!this.props.disabled) {
      this.props.onClick(event);
    }
  };

  render() {
    const {
      className,
      disabled,
      icon,
      iconStyle,
      iconClassName = "",
      style
    } = this.props;
    return (
      <>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <button
          style={style}
          className={selectStyle(disabled, className)}
          onClick={this.handleOnClickLink}
        >
          <i className={`material-icons ${iconClassName}`} style={iconStyle}>
            {icon}
          </i>
        </button>
      </>
    );
  }
}


/**
 * Description placeholder
 *
  * @param {boolean} disabled - Indicates if the icon button is disabled.
 * @param {string} className - Additional CSS classes provided to the icon button.
 * @returns {string} - A string of CSS classes for styling the icon button.
 */
function selectStyle(disabled, className) {
  let styleClass = className + " " + Styles.iconButton + " " + Styles.default;
  disabled ? (styleClass += " " + Styles.disabled) : (styleClass += " ");
  return styleClass;
}

/**
 * Warns in the console if the button does not have an action assigned to it.
 */
function warn_noAction() {
  console.warn("Button has no activity");
}
/**
 * Definition of the properties (props) expected by the IconButton component.
 */
IconButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  iconStyle: PropTypes.object,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};
/**
 * Default values for IconButton component properties.
 */
IconButton.defaultProps = {
  className: "",
  disabled: false,
  icon: "sentiment_satisfied_alt",
  iconStyle: {},
  iconClassName: "",
  onClick: warn_noAction,
  style: {}
};
