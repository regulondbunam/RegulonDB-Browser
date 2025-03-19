/**

# Component (user guide)

# Component name 

[Split --v0.5.0 ]

## Description  

[This component is a button with the ability to change the call to action, is composed of two parts the main button and a bullet that allows you to display the arrayOptions to exchange the button. ]

## Category   

[Visual, FunctionalComponent]  

## Live demo 

[-]

## Installation 

[-]

## Usage 

[-]

## Props 

| prop              | type     | default    | description                                      |
| ----------------- | -------- | ---------- | ------------------------------------------------ |
| accent            | boolean  | false      | enables accent button design                     |
| arrayOptions      | array    | []         | arrangement of display options                   |
| buttonClassName   | string   |            | Class Name of item button                        |
| dropdownClassName | string   |            | Class Name of item dropdown                      |
| disabled          | boolean  | false      | disable the button                               |
| label             | string   | Button     | button label                                     |
| isDisplay         | boolean  | false      | enables the component to be displayed at startup |
| styleButton       | object   | {}         |                                                  |
| styleDropdown     | object   | {}         |                                                  |
| onClick           | function | noAction() | insert the function to be executed when pressed  |

## Exception

__Warning__  
​    button has no activity, use Prop "onClick" to add Activity with a function

## License

​    [MIT]

## Author 

​    [CCG-UNAM-RegulonDB]

**/

/**

# Component (technical guide)

## Component Type 

​    [funtional component, class]

## Dependencies

​    [React { Component },PropTypes, RegulonDB-uicomponents {Button, DropDown}]

## States

| state   | type    | default     | description                 |
| ------- | ------- | ----------- | --------------------------- |
| display | boolean | false       | dropdown box display status |
| option  | object  | {}          | status of selected option   |
| \_label | string  | PROP[label] | dropdown label status       |

# Function description

[-]

**/

import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./button";
import DropDown from "./drop_down";

const styleDropDown = {
  width: "auto",
  paddingLeft: "0",
  paddingRight: "0"
};
const styleButton = {
  float: "left",
  marginRight: "2px"
};

export default class Split extends Component {
  state = {
    label: this.props.label,
    display: this.props.isDisplay,
    value: {}
  };

  selected = (value) => {
    this.setState({ label: value.option, value: value });
  };

  onClick = () => {
    if (!this.props.disabled) {
      this.props.onClick(this.state.value);
    }
  };

  render() {
    const {
      accent,
      arrayOptions,
      buttonClassName,
      dropdownClassName,
      disabled,
      styleButton,
      styleDropDown
    } = this.props;

    const { label, display } = this.state;

    return (
      <React.Fragment>
        <Button
          className={buttonClassName}
          accent={accent}
          label={label}
          onClick={this.onClick}
          style={styleButton}
          disabled={disabled}
        />
        <DropDown
          className={dropdownClassName}
          accent={accent}
          label={""}
          disabled={disabled}
          arrayOptions={arrayOptions}
          style={styleDropDown}
          isDisplay={display}
          labelUpdate={false}
          onSelect={this.selected}
        />
      </React.Fragment>
    );
  }
}

function noAction() {
  console.warn(
    'button has no activity, use Prop "onClick" to add Activity with a function'
  );
}

Split.propTypes = {
  accent: PropTypes.bool,
  arrayOptions: PropTypes.array,
  buttonClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  disabled: PropTypes.bool,
  isDisplay: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  styleButton: PropTypes.object,
  styleDropDown: PropTypes.object
};

Split.defaultProps = {
  accent: false,
  arrayOptions: [],
  buttonClassName: "",
  dropdownClassName: "",
  disabled: false,
  isDisplay: false,
  label: "select option =>",
  onClick: noAction,
  styleButton: styleButton,
  styleDropDown: styleDropDown
};
