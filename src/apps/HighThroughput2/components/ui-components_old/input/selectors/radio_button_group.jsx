/**

# Component (user guide)

# Component name 

[RadioButtonGroup --v0.5.0]

## Description  

[Component allows you to group radioButtons components]

## Category   

[Structural, functional]  

## Live demo 

[-]

## Installation 

[-]

## Usage 

[---]

## Props 

| prop                 | type   | default | description                                              |
| -------------------- | ------ | ------- | -------------------------------------------------------- |
| arrayOptions         | array  | []      | Set of options for the radioButton group                 |
| SelectOption         | string | ""      | option selected in radioButton group                     |
| arrayDisabledOptions | array  | []      | Set of options not available for the radioButton group   |
| title                | string | []      | Title of the checkbox group                              |
| onChange             | func   |         | Function you receive when there are changes in the group |

## Exception

__ Warning __  
radioButtonGroup does not have an added function for the change in prop \"onChange\"

## License

[MIT]

## Author 

[CCG-UNAM-RegulonDB]

**/

/**

# Component (technical guide)

## Component Type 

[Hoock]

## Dependencies

[React, {useState}, PropTypes, ui-components CheckBox]

## States

| state           | type   | default           | description               |
| --------------- | ------ | ----------------- | ------------------------- |
| selectedOptions | string | prop.SelectOption | Status of selected option |

**/

import React, { useState } from "react";
import PropTypes from "prop-types";
import RadioButton from "./radio_button";

const RadioButtonGroup = ({
  arrayOptions = [],
  selectOption = "",
  arrayDisabledOptions = [],
  title = "",
  name = "",
  onChange = () => {}
}) => {
  const [selectedOption, setOption] = useState(selectOption);

  const isDisable = (value) => {
    if (arrayDisabledOptions.find((element) => element === value)) {
      return true;
    }
    return false;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>
        {arrayOptions.map((option) => {
          return (
            <tr key={option}>
              <td>
                <RadioButton
                  name={name}
                  label={option}
                  value={option}
                  disabled={isDisable(option)}
                  isCheck={selectedOption === option}
                  onChange={() => {
                    setOption(option);
                    onChange(option);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RadioButtonGroup;

RadioButtonGroup.propTypes = {
  checkedOption: PropTypes.string,
  dropdown: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  styleGrupBox: PropTypes.object,
  title: PropTypes.string
};
