/**
# Component (user guide)
# Component name 
[DropDown --v0.5.1]
## Description  
[This component allows us to display several options, being on top of the component a vertical palette with options is shown, allowing to click one of these.]
## Category   
[Visual, Functional Component]  
## Live demo 
[-]
## Installation 
[-]
## Usage 
 [

 <DropDown arrayOptions={options} onSelect={dropSelect}/>

 ]

## Props 

| props        | type     | default     | description                                                  |
| ------------ | -------- | ----------- | ------------------------------------------------------------ |
| accent       | boolean  | false       | enables accent button design                                 |
| arrayOptions | array    | []          | arrangement of display options                               |
| className    | string   |             | Class Name of item dropdown                                  |
| disabled     | boolean  | false       | disable the dropdown                                         |
| id           | string   |             | id to html document                                          |
| label        | string   | DropDown    | Dropdown label                                               |
| styleBox     | object   | {}          |                                                              |
| styleButton  | object   | {}          |                                                              |
| isDisplay    | boolean  | false       | enables the component to be displayed at startup             |
| onSelect     | function | (value)=>{} | value is an object that contains the attributes index and option selected |

## Exception

__Category (Error, Warning or Message)__  

Description of the exception (if necessary)

## License
[MIT]

## Author 
[CCG-UNAM-RegulonDB]

**/
/**
# Component (technical guide)
## Component Type 
[Functional Component, hook]
## Dependencies
 [React, { Component },PropTypes, RegulonDB-uicomponents Button]
## States

| state   | type    | default     | description                 |
| ------- | ------- | ----------- | --------------------------- |
| display | boolean | false       | dropdown box display status |
| option  | object  | {}          | status of selected option   |
| \_label  | string  | PROP[label] | dropdown label status       |


## Function description

## [UseEffect]

__Description:__  
[this function updates the status of the chosen option]

**/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./button";
import Styles from "./Buttons.module.css";

const arrowDown = "keyboard_arrow_down";
const arrowUp = "keyboard_arrow_up";

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
  onSelect = () => {}
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
          {arrayOptions.map((value, index) => (
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
