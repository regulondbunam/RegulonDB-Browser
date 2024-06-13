import React, { useEffect, useMemo, useState } from 'react';
import { generateElements } from "./generateElements";
import CircularProgress from "@mui/material/CircularProgress";
import CytoscapeGraph from './CytoscapeGraph';
import { Typography } from '@mui/material';


export default function Map({ reactions, gensorUnit, idContainer }) {

  const [elements, setElements] = useState()

  useEffect(() => {
    const generateElementsAsync = async () => {
      const elements = await generateElements(gensorUnit.components, reactions);
        setElements(elements);
    };

    generateElementsAsync();

    return () => {
      // Cleanup que se ejecuta al desmontar el componente
      setElements(null);
    };

  }, [gensorUnit, reactions]);

  if (!elements) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>
          <Typography variant='relevantB' >Loading Nodes and Edges..</Typography>
        </div>
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  }
  
  return (
    <CytoscapeGraph 
          elements={elements}  
          idContainer={idContainer} 
          nodes={gensorUnit.components} 
          reactions={reactions} 
        />
  );
}

