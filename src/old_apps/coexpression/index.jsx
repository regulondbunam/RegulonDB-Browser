/**g
# Component (user guide)

# Coexpression
	
## Description  
	This component allows users to explore gene coexpression data using different tabs to query, view coexpression information and display a matrix. 


## Category   
	
Visual 

## Live demo 
	--

## Installation or Implementation
--

## Usage 
--

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
useParams: it is a hook provided by React Router. It is used to get the URL parameters in a React component.
useState: it is a React hook used to manage complex state in the application. It allows to manage state through actions and a reducer similar to Redux.
NavigationTabs: It is a custom component that is a navigation tab to switch between different views or sections within the application.
DataVerifier: It is a component used for data verification or validation.
CircularProgress: it  is a Material-UI component that represents a circular progress bar, typically used to indicate loading or processing in progress in the user interface.
useGetAllGenes: it is a custom hook that is used to obtain data related to genes.
useLazyLoadGenesBySearch: This component is designed to facilitate the lazy loading of gene-related data in a React application using GraphQL queries and the Apollo Client. 
Cover: it is a component that displays some form of cover page or header in the user interface.
GeneQuery: it is a component that is related to gene query and selection.
Matrix: it is a component that displays information related to gene co-expression. It allows users to see details about how genes are expressed together.
GeneCoexpression:this component provides a tabbed interface for switching between genes and displays co-expression ranking information for the selected gene. 
Button: It is a Material-UI component representing a button element that can trigger various actions or interactions within the application.
Dialog: It is a Material-UI component that represents a dialog or modal window, typically used for displaying messages, alerts, or additional content within an overlay.
DialogActions: It is a Material-UI component that provides actions or buttons within a dialog or modal window, allowing users to perform actions related to the content displayed in the dialog.
DialogContent: It is a Material-UI component that represents the main content area within a dialog or modal window, where the primary content or message is displayed.
DialogContentText: It is a Material-UI component used to display text content within a dialog or modal window, typically for providing additional information or descriptions.
DialogTitle: It is a Material-UI component representing the title or heading of a dialog or modal window, used to provide a title or label for the content displayed.

## States
	
| Property       | Value            | Description                  |
| -------------- | ---------------  | --------------------------------------------- |
|selectedGenes   |array             |Represents an array of selected genes.         |
|genesInformation|array             |Represents information about genes.            |
|coexpressionData|array             |	Represents data related to gene coexpression.|
| unload         | array            | Represents genes that are yet to be loaded.  |
| genes          | array            | Represents the currently loaded genes.       |
| matrices       | object           | Represents matrices related to gene data.     |
| loadGeneState  | object           | Represents the state of gene data loading.    |
| genesId        | array            | Represents an array of gene IDs.              |
| error          | any              | Represents an error that may occur.           |
| loadState      | number (or null) | Represents the loading progress as a percentage (or null). |

## Hooks
|  Name        | Description                                                      |  Syntax                                                       | Additional Notes or References               | 
| -------------| -----------------------------------------------------------------| ------------------------------------------------------------- | ------------------------------               |
|useParams	   |A hook from react-router-dom for accessing route parameters.	    |const { paramName } = useParams();	                            |React Router useParams Documentation          |
|useReducer    |A hook for managing complex state logic using a reducer function. |	const [state, dispatch] = useReducer(reducer, initialState);	|React useReducer Documentation                |
|useGetAllGenes|	Custom hook for fetching a list of genes.                       |	const { geneList, loading, error } = useGetAllGenes();	      |Custom hook implementation for fetching genes.|

# Functions description

## Reducer

__Description:__  

The reducer function is used for managing state transitions in the React component. It takes the current state and an action as input and returns a new state based on the action type.


__Usage:__

```javascript
&reducer(state, action);
```

__Scope: __

This function is used within the IntCoexpression component to manage the state related to selected genes and gene information.

__Input Parameter:__  
state: Represents the current state of the component, including properties like selectedGenes and genesInformation.
action: An object containing information about the action to be performed. 

__Return:__  
​__[Type]:__ [Name]
The function returns a new state object based on the action type. The structure of the returned state object depends on the action type.

 
**/
import { useParams } from "react-router-dom";
import { useState } from "react";
import { DataVerifier, NavigationTabs } from "../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useGetAllGenes,
  useLazyLoadGenesBySearch,
} from "../../components/webservices";
import Cover from "./Cover";
import GeneQuery from "./geneQuery";
import GeneCoexpression from "./geneCoexpression";
import Matrix from "./matrix";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


/**
 * Description placeholder
 *
 * @returns {React.JSX}
 */
function Coexpression() {
  const { geneList, loading /*error*/ } = useGetAllGenes();
  let { genesId } = useParams();

  
  /**
   * Description placeholder
   *
   * @type {array}
   */
  let selectedGenes = [];

  if (genesId) {
    
    /**
     * Description placeholder
     *
     * @type {URLSearchParams}
     */
    const searchParams = new URLSearchParams(genesId);
    selectedGenes = searchParams.getAll("geneId");
  }

  return (
    <div>
      <Cover />
      {loading && (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <CircularProgress />
        </div>
      )}
      {DataVerifier.isValidArray(geneList) && (
        <IntCoexpression selectedGenes={selectedGenes} geneList={geneList} />
      )}
    </div>
  );
}


/**
 * Description placeholder
 *
 * @param {{ selectedGenes?: {}; geneList: any; }} { selectedGenes = [], geneList }
 * @returns {HTMLElement}
 */
function IntCoexpression({ selectedGenes = [], geneList }) {
  const [genesId, setGenesId] = useState([...selectedGenes]);
  const [unload, setUnload] = useState([...selectedGenes]);
  const [genes, setGenes] = useState([]);
  const [matrices, setMatrices] = useState({});

  
  /**
   * Description placeholder
   *
   * @type {function}
   */
  const loadGeneState = useLazyLoadGenesBySearch(
    unload,
    setUnload,
    genes,
    setGenes,
    genesId
  );
  //let loading
  //console.log("genes",genes.map(gene=>gene.gene.name).join(" "));
  //console.log(loadGeneState.loading);
  //console.log(loadGeneState.loadState);

  
  /**
   * Description placeholder
   *
   * @param {number} gene - Represents a gene identifier.
   * @param {*} data - Represents data related to the gene.
   */
  const addMatrix = (gene, data) => {
    
    /**
     * Description placeholder
     *
     * @type {array}
     */
    let newMatrix = {};
    newMatrix[gene] = data;
    setMatrices({ ...matrices, ...newMatrix });
  };

  
  /**
   * Description placeholder
   */
  const reset = () => {
    setGenesId([]);
    setGenes([]);
  };

  
  /**
   * Description placeholder
   *
   * @param {*} ids - An array of values to be used in the URL.
   */
  const setDemo = (ids) => {
    setGenesId([...ids]);
    setUnload([...ids]);
    let href = window.location.href;
    const regex = /n$/gm.test(href);
    if (regex) {
      href = href + "/geneId=" + ids.join("&geneId=");
    } else {
      href = href + "&geneId=" + ids.join("&geneId=");
    }
    window.history.replaceState(null, "", href);
  };


  const selectGene = (geneId) => {
    setGenesId([...genesId, geneId]);
    setUnload([geneId]);
    
    let href = window.location.href;

    const regex = /n$/gm.test(href);
    if (regex) {
      href = href + "/geneId=" + geneId;
    } else {
      href = href + "&geneId=" + geneId;
    }
    window.history.replaceState(null, "", href);
  };

  const deleteGene = (geneId) => {
    const iId = genesId.findIndex((id) => id === geneId);
    let ids = [...genesId];
    ids.splice(iId, 1);
    setGenesId(ids);
  };

  const tabs = [
    {
      id: "tab_01_geneQuery",
      name: "Query",
      component: (
        <GeneQuery
          deleteGene={deleteGene}
          genesId={genesId}
          loadGeneState={loadGeneState}
          genes={genes}
          genesList={geneList}
          selectGene={selectGene}
          setDemo={setDemo}
          reset={reset}
        />
      ),
    },
    {
      id: "tab_02_geneCoexpression",
      name: "Coexpression",
      disabled: !DataVerifier.isValidArray(genes),
      component: <GeneCoexpression genes={genes} />,
    },
    {
      id: "tab_03_Matrix",
      name: "Matrix",
      disabled: !DataVerifier.isValidArray(genes),
      component: (
        <Matrix genesInformation={genes} selectedGenes={selectedGenes} matrices={matrices} addMatrix={addMatrix} />
      ),
    },
  ];

  if (geneList) {
    return (
      <div>
        {genesId.length > 50 && loadGeneState.loading && (
          <ModalLoad loadState={loadGeneState.loadState} />
        )}
        <NavigationTabs tabs={tabs} tabSelect="tab_01_geneQuery" />
      </div>
    );
  }
  return <></>;
}

export default Coexpression;

/**
 * Description placeholder
 *
 * @param {{ loadState?: number; abort: any; }} { loadState = 0, abort }
 * @returns {React.JSX}
 */
function ModalLoad({ loadState = 0, abort }) {
  return (
    <Dialog open={true}>
      <DialogTitle id="alert-dialog-title">
        {"Loading gene information"}
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <CircularProgress variant="determinate" value={loadState} />
        </div>
        <DialogContentText id="alert-dialog-description">
          The query is too big, please wait a moment, while we load the
          information of the selected genes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={abort}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}

