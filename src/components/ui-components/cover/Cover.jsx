/** 
 # Component (user guide)

# [Component name]
	
## Description  
	
[Description Details]

## Category   
	
[Visual, Structural, Functional]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
[full developer name]


# Component (technical guide)

## Component Type 

[ Driver, Visual, Application, Custom Hook, ClassComponent ]
// Driver: It is a Component that controls interactions with users, browser, API requests, manage status or processes as well as logic related to data.
// Visual: This component will take care of the structure and styles of our application.
// Application: Application: is the main component of a web application or library.
// Custom Hook: is a custom React function, which unlike the other components can return variables.
// ClassComponent: is a tradicional React component class

## Dependencies
[Dependency name][ Dependency details ]

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

# Functions description

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
​__[Name]:__ [Description]
__[Name]:__ [Description]


__Return:__  
​__[Type]:__ [Name]
​[Description (if necessary)]

**/
import React from "react";
import "./uiComponents_cover.css";

export function Cover({ children, coverId = "uiCover", state, message, coverStyle={}, messageStyle = {}, coverBackgroundStile = {}  }) {
  let coverSTL = "uicover_background";
  let messageSTL = "uiMessage";
  let messageState = ""
  switch (state) {
    case "loading":
      coverSTL += " uicover_animation";
      messageSTL += " uiMessage_loading";
      messageState = "Loading ..."
      break;
    case "error":
      coverSTL += " uicover_error";
      messageSTL += " uiMessage_error";
      messageState = "UPS :( Error"
      break;
    case "die":
      messageSTL += " uiMessage_die";
      messageState = "Sorry but ..."
      coverSTL += " uicover_die";
      break;
    default:
      break;
  }
  return (
    <div id={coverId} style={{width: "100%", ...coverStyle}}>
      <div className={messageSTL} >
        {messageState}
      </div>
      <div  className={coverSTL} style={coverBackgroundStile} >
        {children}
      </div>
      <div style={messageStyle} >
        {message}
      </div>
    </div>
  );
}
