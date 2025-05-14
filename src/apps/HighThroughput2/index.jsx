import React from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";
import Browser from "./Browser";
import DatasetInfo from "./Browser/Dataset";
import Finder from "../ht/finderPage/Finder";
// import Finder from "../ht/finderPage/Finder";

export const PATH_HT = {
  path: "ht",
  element: <HT />,
  children: [
    {
      path: ":site", //dataset, finder
      children: [
        {
          path: ":datasetType",
          children: [
            {
              path: ":info",
            },
          ],
        },
      ],
    },
  ],
};

window.IN_URL = {
  main: "/ht",
  finder: "/ht/finder/",
  dataset: "/ht/dataset/",
};

function HT() {
  const { site, datasetType, info} = useParams();
  if (datasetType) {
    switch (site) {
      case "dataset":
        const query = new URLSearchParams(info);
        if(query.get('datasetId')){
          return <DatasetInfo datasetId={query.get('datasetId')} />
        }
        console.log("EXP_TITLE: ", query.get('expTitle'));
        return <Browser datasetType={datasetType} source={query.get('source')}  tfName={query.get('tf')}
                        experimentType={query.get('experimentType')} experimentTitle={query.get('expTitle')}/>;
      case "finder":
        return <Finder datasetType={datasetType} />;
      default:
        return <Home />;
    }
  }
  return <Home />;
}
