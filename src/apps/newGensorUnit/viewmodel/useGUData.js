import { useGetGuById } from "../../../components/webservices";
import { useEffect, useRef, useState } from "react";
import GensorUnitGraph from "../model/GensorUnitGraph";


export default function useGUData(guID){
  const { guData, error, loading } = useGetGuById(guID);
  const GUGraph = useRef(null);

  useEffect(() => {
    if(guData){
      GUGraph.current = new GensorUnitGraph(guData)
    }
  }, [guData]);

  console.log(guData)

  return {
    guData,
    error,
    loading,
  }
}