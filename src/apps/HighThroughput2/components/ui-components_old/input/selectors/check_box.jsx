/**
# Component (user guide)

# Component name 

[CheckBox --v0.5.0]
	
## Description  
[This component allows the user to make a binary choice, i.e. a choice between one of two possible mutually exclusive options]

## Category   
[Visual, funcional]  

## Live demo 
[-]

## Installation 
[---]

## Usage 

[
to make use of this component you can use a CheckBoxGrup or use it only with the label 

<CheckBox label={""} onChange={function}/>


]

## Props 

| Prop     | Type     | Default    | Description                                                  |
| -------- | -------- | ---------- | ------------------------------------------------------------ |
| disabled | boolean  | true       | Enables or disables the checkbox                             |
| isCheck  | boolean  | false      | check or uncheck checkbox                                    |
| value    | string   | ""         | value of the checkBox                                        |
| label    | String   | "checkBox" | CheckBox Label                                               |
| onChange | function |            | receives a function to be executed when the checkBox is checked |



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
[Hook]

## Dependencies
[React, PropTypes, Style]

## States

| State  | type    | default | description                                  |
| ------ | ------- | ------- | -------------------------------------------- |
| cheked | boolean | false   | Mention the selection status of the checkbox |

**/

import React, { useState } from "react";
import PropTypes from "prop-types";
import Styles from "./Selectors.module.css";

const warnMenssage =
  'Checkbox does not have an added function for the change in prop "onChange" in checkbox: ';

const CheckBox = ({
  disabled = false,
  isCheck = false,
  value = "",
  label = "checkBox",
  onChange = (value) => {
    console.warn(warnMenssage, value);
  }
}) => {
  const [check, setCheck] = useState(isCheck);
  //console.log(check);
  return (
    <label className={Styles.checkLabel}>
      <div className={Styles.checkText}>{label}</div>
      <input
        disabled={disabled}
        type="checkbox"
        checked={check}
        onChange={() => {
          onChange(value);
          setCheck(!check);
        }}
        value={value}
      />
      <span className={Styles.checkmark}></span>
    </label>
  );
};

CheckBox.propTypes = {
  active: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default CheckBox;
