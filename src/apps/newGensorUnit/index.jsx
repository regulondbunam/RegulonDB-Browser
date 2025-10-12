import Home from "./views/Home";
import GUData from "./views/GUData";
import React from "react";
import { useParams } from "react-router-dom";

const Router = ()=>{
  let { guId } = useParams();
  if(guId){
    return <GUData guId={guId}/>;
  }
  return <Home/>;
}

export const GensorUnit_PATH = {
    path: "gensorUnits",
    element: <Router/>,
  children: [{ path: ":guId" }],
}

