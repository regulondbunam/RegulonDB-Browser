import React from 'react'
import { useParams } from "react-router-dom";
import Home from './Home'
import Dataset from './Dataset'


export const PATH_HT = {
    path: "ht",
    element: <HT />,
    children: [
      {
        path: ":site",
        children: [
          {
            path: ":datasetType",
            children: [
              {
                path: ":info"
              }
            ]
          }
        ]
      }
    ]
  }


export default function HT() {
  const { site, datasetType, info } = useParams();
  if (datasetType) {
    switch (site) {
      case "finder":
      return <></>  
      //return <Finder datasetType={datasetType} />;
      case "dataset":
            const query = new URLSearchParams(info);
            return <Dataset datasetId={query.get('datasetId')} tfName={query.get('tf')} datasetType={datasetType} experimentType={query.get('experimentType')}  geneName={query.get('geneName')} gc={query.get('gc')} />
      default:
        return <Home />;
    }
  }
  return <Home />;
}
