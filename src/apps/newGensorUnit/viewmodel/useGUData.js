import { useGetGuById } from "../../../components/webservices";
import { useEffect, useRef } from "react";
import createCytoscapeElements from "../model/Graph/createCytoscapeElements";
import cytoscape from "cytoscape";

export default function useGUData(guID){
  const { guData, error, loading } = useGetGuById(guID);
  const cyContainer = useRef(null);


  useEffect(() => {
    if(cyContainer.current){
      if(!guData) return;
      createCytoscapeElements(guData).then((elements)=>{
        if(elements){
          console.log(elements)
          const cy = cytoscape({
            container: cyContainer.current,
            elements: elements,
            style: [
              {
                selector: 'node',
                style: {
                  'label': 'data(id)'
                }
              }
            ]
          })
        }
      });
      /*
      * [
              { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
              { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
              { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
            ]*/

    }
  }, [guData]);

  return {
    cyContainer,
    guData,
    error,
    loading,
  }
}