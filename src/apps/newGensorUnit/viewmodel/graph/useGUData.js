import { useGetGuById } from "../../../components/webservices";
import { useEffect, useRef, useState } from "react";
import createElements from "../model/createElements";
import cytoscape from "cytoscape";
//import implementMembrane from "../model/implementMembrane";

export default function useGUData(guID){
  const { guData, error, loading } = useGetGuById(guID);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0});
  const [graphLoading, setGraphLoading] = useState(false);
  const cytoscapeRef = useRef(null);
  const graph = useRef(null);
  const cyContainer = useRef(null);
  const refContainer = useRef(null);


  useEffect(() => {
    if(cyContainer.current && refContainer.current){
      const width = refContainer.current.clientWidth;
      const height = refContainer.current.clientHeight;
      if(!guData) return;
      cytoscapeRef.current = cytoscape({
        container: cyContainer.current,
        layout: {
          name: 'preset'
        },
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(name)'
            }
          }
        ]
      })
      createElements(guData,width,height).then((graphClass)=>{
        if(graphClass){
          graph.current = graphClass
          const tfs = graph.current.getTranscriptionFactors()
          cytoscapeRef.current.add(tfs)
          setTimeout(()=> {
            for (const tf of tfs) {

            }
            setGraphLoading(false)
          },500)
        }
      })
      setDimensions({width,height})
      setGraphLoading(true)
    }
  }, [guData]);

  const handTest = ()=>{
    const dts = cytoscapeRef.current.nodes().map(n => n.data());
    console.log(dts)
    //cytoscapeRef.current.add(graph.current.getReaction(6))
  }

  return {
    cyContainer,
    refContainer,
    guData,
    error,
    graphLoading,
    dimensions,
    loading,
    handTest
  }
}