/**
# Component (user guide)

# Component name 
	
	[TextArea --0.5.0]
	
## Description  
	
	[Component allows the entrytext]

## Category   
	
	[Visual]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[example: <TextArea /> ]

## Props 

| Prop         | Type     | Default     | Description |
| ------------ | -------- | ----------- | ----------- |
| cols         | integer  | 100         |             |
| disabled     | bolean   | false       |             |
| onChangeText | function | noAction    |             |
| placeholder  | string   | "type here" |             |
| rows         | integer  | 5           |             |
| value        | string   | ""          |             |



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

	[stateless]

## Dependencies

	[---]

## States
	
	| Property | Value | Desctiption |
	| -------- | ----- | ----------- |
	|          |       |             |
	

# Function description

	## [function name]

	__Description:__  
	[Description of the function]

	__Usage:__

		```javascript

		&function(Parameters, if any);

		```
	__Scope: __

	[Scope details]

	__Input Parameter:__  
		* __Param - __ __[Name]__
		Description

	__Return:__  
		* __Type - __ __[Name]__
		Description (if necessary)
**/

import React, { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./Text.module.css";

export default class TextArea extends Component {
  state = {
    keyword: this.props.value
  };

  _inputChangedHandler(event) {
    this.setState({ keyword: event.target.value });
    this.props.onChangeText(event.target.value);
  }

  render() {
    const { rows, cols, style } = this.props;
    const { keyword } = this.state;
    return (
      <textarea
        className={Styles.textBox}
        rows={rows}
        cols={cols}
        value={keyword}
        style={style}
        onChange={(event) => this._inputChangedHandler(event)}
      ></textarea>
    );
  }
}

TextArea.propTypes = {
  cols: PropTypes.number,
  disabled: PropTypes.bool,
  onChangeText: PropTypes.func,
  rows: PropTypes.number,
  style: PropTypes.object,
  value: PropTypes.string
};

TextArea.defaultProps = {
  cols: 50,
  disabled: false,
  onChangeText: noAction,
  rows: 5,
  style: { width: "300px", height: "160px" },
  value: ""
};

function noAction(mod) {
  switch (mod) {
    case 1:
      console.log("AreaText disabled");
      break;
    default:
      console.error("The AreaText State is undefined");
  }
}
