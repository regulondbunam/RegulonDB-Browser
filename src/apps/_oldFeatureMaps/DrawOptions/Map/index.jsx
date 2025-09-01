import * as React from 'react';
import MeasureOptions from "./MeasureOptions";
import ColorOptions from "./ColorOptions";
import Style from './style.module.css'

/*
 * Map Options:
 * - Measure Step
 * - Display Limits : Auto / From, TO, Origin
 * - BackgroundColor
*/

export default function MapOptions(props) {

  return (
   <div className={Style.optionContainer} >
     <MeasureOptions {...props} />
     <ColorOptions {...props} />
   </div>
  );
}

