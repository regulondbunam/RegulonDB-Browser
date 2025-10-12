import { useGetGuById } from "../../../components/webservices";
import { useEffect, useRef } from "react";
import createElements from "../model/createElements";
import cytoscape from "cytoscape";
import implementMembrane from "../model/implementMembrane";

export default function useGUData(guID){
  const { guData, error, loading } = useGetGuById(guID);
  const cytoscapeRef = useRef(null);
  const graph = useRef(null);
  const cyContainer = useRef(null);


  useEffect(() => {
    if(cyContainer.current){
      if(!guData) return;
      cytoscapeRef.current = cytoscape({
        container: cyContainer.current,
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(name)'
            }
          }
        ]
      })
      createElements(guData).then((graphClass)=>{
        if(graphClass){
          graph.current = graphClass
          implementMembrane(cytoscapeRef.current, 500)
          cytoscapeRef.current.add(graph.current.getReaction(1))
        }
      })

    }
  }, [guData]);

  const handTest = ()=>{
    const dts = cytoscapeRef.current.nodes().map(n => n.data());
    console.log(dts)
    //cytoscapeRef.current.add(graph.current.getReaction(6))
  }

  return {
    cyContainer,
    guData,
    error,
    loading,
    handTest
  }
}