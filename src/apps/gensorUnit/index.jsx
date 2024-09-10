/*
# Component (user guide)

# GensorUnit
	
## Description  
It is a structural component on which all components are mounted from the main view.

## Category   
	
Visual

## Usage 
	
[example: <GensorUnit /> ]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 

Visual

## Dependencies
Cover: A custom component used to display information on the front page of the application, such as loading messages or featured content.
DataVerifier: A custom component designed to verify the validity of data in the application, ensuring that it meets certain criteria or restrictions before displaying it.
useParams: A hook provided by React Router that is used to get and manage URL parameters in the application. In this case, it is used to get the value of guId from the URL.
useGetAllGus: A custom hook used to make a request to a web service and get all data related to "Gensor Units."
useGetGuById: A custom hook used to make a request to a web service and get data specific to a "Gensor Unit" based on its ID.
GuInfo: it is responsible for representing data such as the unit name, information about related functional groups and other characteristics specific to a "Gensor Unit."
Home: it displays a list of "Gensor Units" or other relevant information on the main page of the application.
useState: A hook provided by React used to manage local state in functional components. In this case, it is used to control the state related to the type of display in the application (graphical or summary view).
InputLabel: A component used to label form elements, providing a description or title for the input elements.
MenuItem: A component used to create menu items in forms or selections.
FormControl: A component that wraps form input elements, such as selection fields or text input.
Select: A component used to create selective drop-down lists in the user interface, allowing users to choose from various options.
Summary: it is used to display a summary or summary view of data related to a "Gensor Unit."

#States
|State  |Type  | Default  | Description                                                                                                                                                                          |
|------ | ---- | -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|guId   |String| N/A      |The ID of the "Gensor Unit" obtained from the URL. If present, it is used to display detailed information about a specific unit.                                                      |
|display|String| "Graphic"| The display type that controls whether a graphical view or a summary of the "Gensor Unit" is displayed. The default is "Graphic," but may change depending on user interaction.  |
	
#Hooks
| Name      | Description                                                            | Syntax                                                           | Additional Notes or References                          | 
| --------- | -------------------------------------------------------------------    | ---------------------------------------------------------------- | ------------------------------------------------------- |
| useParams | Hook provided by React Router to extract and manage URL parameters.    | let { guId } = useParams();                                      | Used to get the "Gensor Unit" ID of the URL.            |
| useState  | Hook provided by React to manage local state in functional components. |  const [display, setDisplay] = useState(DISPLAY_TYPES.graphic);  | Used to switch between the graphic view and the summary.|     

*/

import { Cover, DataVerifier } from "../../components/ui-components";
import { useParams } from "react-router-dom";
import { useGetAllGus, useGetGuById } from "../../components/webservices";
import GuInfo from "./guInfo";
import Home from "./home";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Summary from "./guSummary";
import { descriptions } from "./descriptions";



/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX}
 */
export default function GensorUnit() {
  /**
   * id of the Gu entered in the URL.
   * @tipo {String}
   */
  let { guId } = useParams();
  if (guId) {
    return <GoInfo guId={guId} />;
  }
  return <GoHome />;
}


/**
 * Description placeholder
 *
 * @type {{ graphic: string; summary: string; }}
 */
const DISPLAY_TYPES = {
  graphic: "Graphic",
  summary: "Summary",
};


/**
 * Description placeholder
 *
 * @param {{ guId: any; }} { guId }
 * @returns {React.JSX|HTMLElement}
 */
function GoInfo({ guId }) {
  const [display, setDisplay] = useState(DISPLAY_TYPES.graphic);
  const { guData, loading, error } = useGetGuById(guId);
  // console.log(guData);
  if (loading) {
    return (
      <div>
        <Cover state="loading">
          <h1>{`Loading [${guId}] Gensor Unit `}</h1>
        </Cover>
      </div>
    );
  }
  if (error) {
    return <>error</>;
  }
  if (guData?._id) {

    /**
     * Description placeholder
     *
     * @type {string}
     */
    let idSite = "site_" + guData._id;

    let summary = {}
    let molBioLvl = {}
    let phyLvl = {}
    if (guData.gensorUnit?.summary) {
      summary = guData.gensorUnit.summary
      molBioLvl = {
        'detailed': guData.gensorUnit.summary.molecularBiologyLevel?.detailed,
        'general': guData.gensorUnit.summary.molecularBiologyLevel?.general
      }
      phyLvl = {
        'detailed': guData.gensorUnit.summary.physiologyLevel?.detailed,
        'general': guData.gensorUnit.summary.physiologyLevel?.general
      }
    }
    console.log(guData.gensorUnit)
    return (
      <div>
        <Cover
          coverId={idSite + "_cover"}
          coverBackgroundStile={{
            backgroundColor: "#f4f5f5e8",
            padding: "10px 0 10px 0",
          }}
        >
          <div style={{ display: "flex", margin: "0 3% 0 0" }}>
            <div>{SelectDisplay(display, setDisplay)}</div>
            <div>
              <h1>{`Gensor Unit ${guData.gensorUnit.name}`}</h1>
              {Object.keys(molBioLvl).length > 0 && Object.keys(phyLvl).length > 0 && (
                <div>
                  <b>{`Summary: `}</b>
                  <div style={{marginLeft: "20px"}} >
                    {molBioLvl?.detailed && molBioLvl?.general && (
                      <>
                      <b>{`Molecular Biology Level: `} </b>
                        <ul style={{listStyle: "circle inside"}} >
                          <li><b>{`Detailed: `}</b>{molBioLvl.detailed}</li>
                          <li><b>{`General: `}</b>{molBioLvl.general}</li>
                        </ul>
                      </>
                    )}

                    {phyLvl?.detailed && phyLvl?.general && (
                      <>
                        <b>{`Physiology Level: `} </b>
                        <ul style={{listStyle: "circle inside"}} >
                          <li><b>{`Detailed: `}</b>{phyLvl.detailed}</li>
                          <li><b>{`General: `}</b>{phyLvl.general}</li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              )}
              {DataVerifier.isValidArray(guData.gensorUnit.groups) && (
                <div>
                  <b>{`Functional Group${guData.gensorUnit.groups.length > 1 ? "s" : ""
                    }: `}</b>
                  {guData.gensorUnit.groups.join(", ")}
                </div>
              )}
              <br />
            </div>
          </div>
        </Cover>
        <div>
          {display === DISPLAY_TYPES.summary && (
            <Summary idSite={idSite} {...guData} />
          )}
          {display === DISPLAY_TYPES.graphic && (
            <GuInfo
              idSite={idSite}
              nReactions={guData.reactions.length}
              {...guData}
            />
          )}
        </div>
      </div>
    )
  }
  return <div>info</div>;
}


/**
 *
 * @param {string} display - The current display type.
 * @param {function} setDisplay - Function to update the display type.
 * @returns {React.JSX} - Display type selection component.
 */
function SelectDisplay(display, setDisplay) {
  const handleChange = (event) => {
    setDisplay(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Display type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={display}
        label="Display_type"
        onChange={handleChange}
      >
        {Object.keys(DISPLAY_TYPES).map((key, i) => {
          return (
            <MenuItem key={"displayOption_" + key + "_" + i} value={DISPLAY_TYPES[key]}>{DISPLAY_TYPES[key]}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}


/**
 * Description placeholder
 *
 * @returns {HTMLElement}
 */
function GoHome() {
  const { gusData, error, loading } = useGetAllGus();


  /**
   * Description placeholder
   *
   * @type {string}
   */
  let state = "done";


  /**
   * Description placeholder
   *
   * @type {string}
   */
  let title = "Gensor Units";
  if (loading) {
    state = "loading";
    title = "loading Gensor Unit list";
  }
  if (error) {
    state = "error";
    title = "... Sorry, we have an error, try again later 🥲";
  }
  return (
    <div>
      <Cover state={state}>
        <h1>{title}</h1>
      </Cover>
      {DataVerifier.isValidArray(gusData) && <Home gusData={gusData} />}
    </div>
  );
}
