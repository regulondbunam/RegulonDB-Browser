import { useEffect, useRef, useState } from "react";
import GensorUnitGraph from "../model/GensorUnitGraph";
import { useGetGuById } from "../../../components/webservices";


export default function useGUData(guID){
  const { guData, error, loading } = useGetGuById(guID);
  const [tab, setTab] = useState(0);
  const GUGraph = useRef(null);

  const TABS = ["Summary", "Graph"/*, "Reaction Branches", "Regulatory Branches", "Transduction Branches", "Functional Branches"*/]

  useEffect(() => {
    if(guData){
      GUGraph.current = new GensorUnitGraph(guData)
    }
  }, [guData]);

  console.log(guData)

  const handleChangeTab = (_,tab) => {
    setTab(tab);
  }

  return {
    //tabs
    tab,
    TABS,
    handleChangeTab,
    //guData
    guData,
    error,
    loading,
  }
}