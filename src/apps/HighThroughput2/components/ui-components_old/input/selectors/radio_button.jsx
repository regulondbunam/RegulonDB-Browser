/**

# Component (user guide)

# Component name 

[RadioButton --v0.5.0]

## Description  

[
A radio button allows the user to choose one of a predefined set of options.
]

## Category   

[Visual]  

## Live demo 

[-]

## Installation 

[-]

## Usage 

[ - ]

## Props 

| Prop     | Type     | Default       | Description                                                  |
| -------- | -------- | ------------- | ------------------------------------------------------------ |
| disabled | boolean  | true          | Enables or disables the radio button                         |
| isCheck  | boolean  | false         | check or uncheck radio button                                |
| name     | string   | ""            | name of radio button Group                                   |
| value    | string   | ""            | value of the radio button                                    |
| label    | String   | "radioButton" | Radio button Label                                           |
| onChange | function |               | receives a function to be executed when the radioButton change |



## Exception

__Warning__  

RadioButton does not have an added function for the change in prop \"onChange\" in radioButton: 

## License

[MIT]

## Author 

[CCG-UNAM-RegulonDB]

**/

/**

# Component (technical guide)

## Component Type 

[functional component]

## Dependencies

[React, PropTypes, Style]

**/

import React from "react";
import PropTypes from "prop-types";
import Styles from "./Selectors.module.css";

const warnMenssage =
  'RadioButton does not have an added function for the change in prop "onChange" in radioButton: ';

const RadioButton = ({
  disabled = false,
  isCheck = false,
  name = "",
  value = "",
  label = "RadioButton",
  onChange = (value, grupName) => {
    console.warn(`${warnMenssage} ${value} in group: ${grupName}`);
  }
}) => {
  return (
    <label className={Styles.checkLabel}>
      {label}
      <input
        disabled={disabled}
        type="radio"
        checked={isCheck}
        value={value}
        name={name}
        onChange={() => {
          onChange(value, name);
        }}
      />
      <span className={Styles.rCheckmark}></span>
    </label>
  );
};

export default RadioButton;

RadioButton.propTypes = {
  active: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};
