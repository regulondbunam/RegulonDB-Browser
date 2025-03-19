/**
# Component (user guide)

# Component name 
	
	[TextBox]
	
## Description  
	
	[Component allows the entry of a single line of text]

## Category   
	
	[Visual]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[example: <TextBox /> ]

## Props 

| Prop         | Type     | Default     | Description |
| ------------ | -------- | ----------- | ----------- |
| disabled     | bolean   | false       |             |
| onChangeText | function | noAction    |             |
| placeholder  | string   | "type here" |             |
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

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Styles from './Text.module.css'

export default class TextBox extends Component {
    state = {
        keyword: this.props.value
    }

    _inputChangedHandler(event) {
        this.setState({ keyword: event.target.value })
        this.props.onChangeText(event.target.value)
    }

    render() {
        const {
			placeholder,
			style
		} = this.props
		const {
			keyword
		} = this.state
        return (
            <input
				style={style}
                type="text"
                className={Styles.textBox}
                placeholder={placeholder}
                value={keyword}
                onChange={(event) => this._inputChangedHandler(event)}
            >
            </input>
        )
    }
}

TextBox.propTypes = {
    disabled: PropTypes.bool,
	onChangeText: PropTypes.func,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	style: PropTypes.object
}

TextBox.defaultProps = {
    disabled: false,
	onChangeText: noAction,
	placeholder: "type here",
	value: "",
	style: {}
};

function noAction() {
    console.warn('The TextBox State is undefined')
}