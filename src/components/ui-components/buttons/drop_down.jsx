/**
# Component (user guide)

# Component name 
DropDown

## Description  
This component allows us to display several options, being on top of the component a vertical palette with options is shown, allowing to click one of these.

## Category   
Visual, Functional Component

## Live demo 
[-]

## Installation 
[-]

## Usage 
 [

 <DropDown arrayOptions={options} onSelect={dropSelect}/>

 ]

## Props 

| props        | type     | default     | description                                                               |
| ------------ | -------- | ----------- | --------------------------------------------------------------------      |
| accent       | boolean  | false       | enables accent button design                                              |
| arrayOptions | array    | []          | arrangement of display options                                            |
| className    | string   |  ""         | Class Name of item dropdown                                               |
| disabled     | boolean  | false       | disable the dropdown                                                      |
| id           | string   |             | id to html document                                                       |
| isLabelUpdate | string   |             | id to html document                                                      |
| label        | string   | DropDown    | Dropdown label                                                            |
| styleBox     | object   | {}          |Inline CSS styles that can be applied to the drop-down list container.     |
| styleButton  | object   | {}          |Inline CSS styles that can be applied to the drop-down list container.     |
| isDisplay    | boolean  | false       | enables the component to be displayed at startup                          |
| onSelect     | function | (value)=>{} | value is an object that contains the attributes index and option selected |

## Exception
--

## License
MIT License


## Author 
RegulonDB Team: 

**/
/**
# Component (technical guide)

## Component Type 
[Functional Component, hook]

## Dependencies
React: React is an open source JavaScript library used to build user interfaces (UI) in web applications. React provides a component-based approach to creating interactive and responsive interfaces.

useState: useState is a hook provided by React that allows React function components to add state to their components. It allows declaring and managing local state in a function component.

useEffect: useEffect is another React-provided hook that allows function components to perform side effects in response to changes in state or other data. 

PropTypes: PropTypes is a library used to specify the types of properties expected in React components. It helps to validate properties passed to components, improving security and code documentation.

Button: Button is a component imported from the "./button" file. It is a custom component that represents a button in your application. You did not provide the code for the Button component, so the description is based on common assumptions of how a button is used in React.

Styles (imported from "./Buttons.module.css"): Styles refers to a local CSS file called "Buttons.module.css". This file contains specific styles for the button and drop-down list components in your React application. These styles are used to customize the appearance and layout of the elements in the user interface.

## States

| state   | type    | default     | description                 |
| ------- | ------- | ----------- | --------------------------- |
| display | boolean | false       | dropdown box display status |
| option  | object  | {}          | status of selected option   |
|  _label | string  | label       | dropdown label status       |


## Function description

## [UseEffect]

__Description:__  
[this function updates the status of the chosen option]


__Usage:__

```javascript
&useEffect(() => {
  if (Object.entries(option).length !== 0) {
    onSelect(option);
    setOption({});
  }
}, [option, onSelect]);
```

__Scope: __
This useEffect function is applied in the context of the DropDown component.

__Input Parameter:__  
option: The state of option, which represents the option selected in the dropdown list.
onSelect: The selection function provided as a property to the DropDown component.

__Return:__  
There is no explicit return value, since useEffect is used to execute side effects instead of returning a value.
 [Description (if necessary)]


**/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./button";
import Styles from "./Buttons.module.css";


/**
 * Description placeholder
 *
 * @type {"keyboard_arrow_down"}
 */
const arrowDown = "keyboard_arrow_down";


/**
 * Description placeholder
 *
 * @type {"keyboard_arrow_up"}
 */
const arrowUp = "keyboard_arrow_up";


/**
 * Description placeholder
 *
 * @param {{ accent?: boolean; arrayOptions?: {}; className?: string; children: any; disabled?: boolean; id: any; isLabelUpdate?: boolean; label?: string; styleBox?: {}; styleButton?: {}; isDisplay?: boolean; onSelect?: () => void; }} {
  accent = false,
  arrayOptions = [],
  className = "",
  children,
  disabled = false,
  id,
  isLabelUpdate = false,
  label = "DropDown",
  styleBox = {},
  styleButton = {},
  isDisplay = false,
  onSelect = () => {}
}
 * @returns
 */
const DropDown = ({
  accent = false,
  arrayOptions = [],
  className = "",
  children,
  disabled = false,
  id,
  isLabelUpdate = false,
  label = "DropDown",
  styleBox = {},
  styleButton = {},
  isDisplay = false,
  onSelect = () => { }
}) => {
  const [display, setDisplay] = useState(isDisplay);
  const [option, setOption] = useState({});
  const [_label, setLabel] = useState(label);

  useEffect(() => {
    if (Object.entries(option).length !== 0) {
      onSelect(option);
      setOption({});
    }
  }, [option, onSelect]);
  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <Button
        accent={accent}
        className={className}
        id={id}
        onClick={() => {
          setDisplay(!display);
        }}
        disabled={disabled}
        style={styleButton}
      >
        {_label}
        <i className="material-icons">{display ? arrowUp : arrowDown}</i>
      </Button>
      {display ? (
        <div className={Styles.dropBox} style={styleBox}>
          {arrayOptions.map(

            /**
             * Description placeholder
             *
             * @param {*} value - The value of the element in the array.
             * @param {number} index - The index of the element in the array.
             * @returns {React.Component} - The generated button component.
             */
            (value, index) => (
              <Button
                id={value}
                key={value}
                style={{ marginBottom: "2px", width: "100%" }}
                onClick={() => {
                  setOption({ index: index, option: value });
                  setDisplay(false);
                  if (isLabelUpdate) {
                    setLabel(value);
                  }
                }}
              >
                {value}
              </Button>
            ))}
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DropDown;

DropDown.propTypes = {
  arrayOptions: PropTypes.array,
  disabled: PropTypes.bool,
  isDisplay: PropTypes.bool,
  islabelUpdate: PropTypes.bool,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  style: PropTypes.object
};
