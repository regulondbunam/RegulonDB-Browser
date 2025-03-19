/**
# Component (user guide)

# Component name 
[CheckBoxGroup --v0.5.0]

## Description  
[Component allows you to group checkbox components]

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
| arrayOptions         | array  | []      | Set of options for the checkbox group                    |
| arraySelectOptions   | array  | []      | Set of options selected for the checkbox group           |
| arrayDisabledOptions | array  | []      | Set of options not available for the checkbox group      |
| title                | string | []      | Title of the checkbox group                              |
| onChange             | func   |         | Function you receive when there are changes in the group |

## Exception
__ Warning __  
checkboxGroup does not have an added function for the change in prop \"onChange\"

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

| state         | type  | default                 | description                |
| ------------- | ----- | ----------------------- | -------------------------- |
| selectOptions | array | prop.arraySelectOptions | Status of selected options |

**/

import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBox from "./check_box";

const warnMenssage =
  'CheckboxGroup does not have an added function for the change in prop "onChange"';

const CheckBoxGroup = ({
  id,
  arrayOptions = [],
  selectOptions = [],
  arrayDisabledOptions = [],
  title = "",
  onChange = () => {
    console.warn(warnMenssage);
  }
}) => {
  const [_select, set_select] = useState(selectOptions);

  const onChangeSelection = (option) => {
    let select = [..._select];
    if (isCheck(option)) {
      select = select.filter((item) => item !== option);
    } else {
      select.push(option);
    }
    set_select(select);
    onChange(select);
  };

  const isCheck = (value) => {
    if (_select.find((element) => element === value)) {
      return true;
    }
    return false;
  };
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
        {arrayOptions.map((option, index) => {
          //console.log(option.id);
          return (
            <tr key={`op-${option}-${index}`}>
              <td>
                <CheckBox
                  id={`cb-${id}-${option}-${index}`}
                  label={option}
                  value={option}
                  disabled={isDisable(option)}
                  isCheck={isCheck(option)}
                  onChange={() => {
                    onChangeSelection(option);
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

export default CheckBoxGroup;

CheckBoxGroup.propTypes = {
  arrayOptions: PropTypes.array,
  arrayDisabledOptions: PropTypes.array,
  arraySelectOptions: PropTypes.array,
  title: PropTypes.string,
  onChange: PropTypes.func
};
