/**
# Component (user guide)

# Component name 
	
	[TextPassword]
	
## Description  
	
	[Component allows the entry password text]

## Category   
	
	[Visual]  

## Live demo 
	
	[---]


## Installation 

	[---]

## Usage 
	
	[example: <TextPassword /> ]

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

export default class TextPassword extends Component {
    state = {
        keyword: this.props.value
    }

    _inputChangedHandler(event) {
        this.setState({ keyword: event.target.value })
        this.props.onChangeText(event.target.value)
    }

    render() {
        const {
            placeholder
		} = this.props
		const {
			keyword
		} = this.state
        return (
            <input
                type="password"
                className={Styles.textBox}
                placeholder={placeholder}
                value={keyword}
                onChange={(event) => this._inputChangedHandler(event)}
            >
            </input>
        )
    }
}

TextPassword.propTypes = {
    disabled: PropTypes.bool,
	onChangeText: PropTypes.func,
	seed: PropTypes.number
};

TextPassword.defaultProps = {
    disabled: false,
	onChangeText: noAction,
	seed: 0
};

function noAction() {
    console.warn('The AreaText State is undefined')
}