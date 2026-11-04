/**
# Component (user guide)

# Operon
	
## Description  
	
it is a React component that acts as a path controller in a web application. Its main function is to determine which component should be displayed based on the parameters of the current path URL.

## Category   
	
Structural

## Live demo 
--

## Installation or Implementation
--

## Usage 
	example: < Operon /> 

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
React: React is the core library used to build user interfaces in single-page web applications (SPAs). React provides the functionality to define components, manage state and manage the lifecycle of components.
useParams: useParams is a hook provided by the react-router-dom library, which is widely used for path management and navigation in React applications. useParams allows accessing the parameters of the current URL, which is useful for getting data from the URL and using it in component rendering.
"./operon.css": This is a local stylesheet file called "operon.css". It contains CSS styles specific to the visual representation of the Operon component and other related components in the current file.
Home: it is a React functional component that represents the home page of our application. It consists of a cover, body content, and displays a version number from a configuration file.
useGetOperonByID: it is used to retrieve data from an operon by ID
useGetOperonByTuId: it  is used to obtain data from an operon by the ID of a transcription unit.
Title: component used to display the title or header on the application pages.
Document:  component used to display detailed content or information on the application pages, possibly related to operons.

#States
| Name     | Value                     | Description                                                           |
| -------- | ------------------------- | --------------------------------------------------------------------  |
|state     |"done"                     | Successful operon validation status (RedirectToOperon)                |
|          |"loading"                  | Loading status in progress (RedirectToOperon)                         |
|          |"error"                    | Query error status (RedirectToOperon)                                 |
|title     | Varies depending on state | Page title based on current state (RedirectToOperon)                  |
|operonData| null or operon data       | Operon data obtained from the query (RedirectToOperon and LoadOperon) |

#Hooks
| Name               | Description                                                 | Syntax                          | Additional Notes or References                                          |
| ------------------ | ----------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| useParams          | Access the parameters of the current URL.                   | `useParams()`                   | -                                                                       |
| useGetOperonByID   | Gets data from an operon by its ID.                         | `useGetOperonByID({ _id })`     | Use Apollo Client for GraphQL queries.                                  |
| useGetOperonByTuId | Gets data from an operon by the ID of a transcription unit. | `useGetOperonByTuId({ _tuId })` | Use Apollo Client for GraphQL queries.                                  |
| useQuery           | Perform GraphQL queries using Apollo Client.                | `useQuery(query, options)`      | Used in `useGetOperonByID` and `useGetOperonByTuId` to get operon data. |

**/

import React from "react";
import { useParams } from "react-router-dom";
import "./operon.css";
import Home from "./home";
import { useGetOperonByID, useGetOperonByTuId } from "../../components/webservices";
import Title from "./Title";
import Document from "./document";
import {useSearchParams} from "react-router-dom";



/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX|null}
 */
export default function Operon() {
  let { operonId, tuId, section } = useParams();
  if (!operonId && !tuId) {
    return <Home />
  }
  if (tuId) {
    return <RedirectToOperon tuId={tuId} />
  }
  if (operonId) {
    return <LoadOperon operonId={operonId} section={section} />
  }
  return null
}


/**
 * Description placeholder
 *
 * @param {{ tuId: any; }} { tuId }
 * @returns {React.JSX}
 */
function RedirectToOperon({ tuId }) {
  const { operonData, loading, error } = useGetOperonByTuId({ _tuId: tuId })

  
  /**
   * Description placeholder
   *
   * @type {string}
   */
  let state = "done"
  
  /**
   * Description placeholder
   *
   * @type {string}
   */
  let title = "Validating TU id " + tuId
  if (loading) {
    state = "loading"
    title = "loading... Validating TU id " + tuId
  }
  if (error) {
    state = "error"
    title = "... Sorry, we have an error, try again later 🥲"
  }
  if (operonData) {
    if (operonData === null) {
      state = "error"
      title = "Error, Operon document with TU id was not found. 😞"
    } else {
      state = "done"
      title = operonData.operon.name
      if (operonData?._id) {
        window.history.pushState({},'RegulonDB','/operon/'+operonData._id+"/tu_"+tuId);
      }
    }
  }

  return (
    <div>
      <Title state={state} title={title} operonData={operonData} />
      {operonData && (
        <Document operonData={operonData}/>
      )}
    </div>
  )
}

/**
 * Description placeholder
 *
 * @param {{ operonId: any; section: any; }} { operonId, section }
 * @returns {React.JSX}
 */
function LoadOperon({ operonId, section }) {
  const [searchParams] = useSearchParams();
  const organismId = searchParams.get("organism");
  const { operonData, loading, error } = useGetOperonByID({ _id: operonId, organismId: organismId })
  /**
   * Description placeholder
   *
   * @type {string}
   */
  let state = "done"

  
  /**
   * Description placeholder
   *
   * @type {string}
   */
  let title = "Operons"
  if (loading) {
    state = "loading"
    title = "loading... Operon document with id "+operonId
  }
  if (error) {
    state = "error"
    title = "... Sorry, we have an error, try again later 🥲"
  }
  if (operonData) {
    if (operonData === null) {
      state = "error"
      title = "Error, Operon document with id "+operonId+" was not found in the currently selected organism. It may belong to a different organism or the identifier may be invalid.."
    } else {
      state = "done"
      title = operonData.operon.name
    }
  }
  return (
    <div>
      <Title state={state} title={title} operonData={operonData} />
      {operonData && (
        <Document operonData={operonData} section={section} organismId={organismId} />
      )}
    </div>
  )
}




