/**
# Component (user guide)

# Gene
	
## Description  
	
it is responsible for deciding whether to display information about a specific gene (GeneDescription) or the home page (Home) based on the URL parameters.

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
React: it is the core library used to build user interfaces in web applications.
useEffect: it is a hook provided by React that allows you to perform side effects on functional components.
useParams: it is a hook provided by React Router that is used to get parameters from the current URL. In this case, it is used to get the geneId parameter of the URL.
useGetGenesBy: it is used to perform a query or request for specific gene-related data.
Title: Title is an imported component used to display the page title.
UpdateTitle: UpdateTitle is an imported component or function that is used to update the page title. It is used in conjunction with useEffect to manage the page title based on the state of the query.
Information: it is an imported component that is designed to display detailed information about a gene.
Home: it is an imported component that represents the home page or main page of the application.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   |                 Description                                                                                               |          Syntax               | Additional Notes or References | 
| ------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------ |
|useEffect|it is a React Hook that lets you synchronize a component with an external system.                                          |useEffect(setup, dependencies?)|                                |
|useParams|hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path> |useParams();                   |                                |

 
**/
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useGetGenesBy } from "../../components/webservices";
import Title, { UpdateTitle } from "./components/Title";
import Information from './information';
import Home from "./Home";


/**
 * Description placeholder
 *
 * @export
 * @returns {React.JSX}
 */
export default function Gene() {

  window.gtag('event', 'page_view', {
    page_path: window.location.pathname,
  });

  
  let { geneId } = useParams();

  if (geneId) {
    if (geneId.split("_").length > 1) {
      geneId = geneId.split("_")[0]
    }
    return <GeneDescription geneId={geneId} />
  }
  return <Home />
}


/**
 * Description placeholder
 * @date 9/25/2023 - 5:28:16 PM
 *
 * @param {{ geneId: any; }} { geneId }
 * @returns {HTMLElement}
 */
function GeneDescription({ geneId }) {

  const [title, setTitle] = React.useState("gene");
  const { geneData, loading, error } = useGetGenesBy({ _id: geneId })
  // console.log(geneData);
  useEffect(() => {
    if (loading) {
      UpdateTitle({ state: "loading" })
      setTitle("Loading gene data...")
    }
    if (geneData && !error) {
      UpdateTitle({ state: "done" })
    }
    if (geneData === null) {
      UpdateTitle({ state: "error" })
      setTitle(`Sorry, Gene:${geneId} don't found`)
    }
    if (error) {
      UpdateTitle({ state: "error" })
      setTitle(`Error to query ${geneId} information`)
    }
  }, [geneData, loading, error, geneId]);

  return (
    <div>
      <Title title={title} geneData={geneData} />
      {geneData && (
        <Information geneData={geneData} />
      )}
    </div>
  )
}