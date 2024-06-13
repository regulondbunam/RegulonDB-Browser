import React, { useMemo, useRef, useEffect } from 'react'
import { generateElements } from "./generateElements";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import cytoscape from 'cytoscape';



export default function Map({ reactions, gensorUnit }) {
    const elements = useMemo(() => {
        return generateElements(gensorUnit.components, reactions);
    }, [gensorUnit, reactions]);

    return <CytoscapeGraph elements={elements} />;
}

const CytoscapeGraph = ({ elements, style }) => {
    const cyRef = useRef(null);
    const containerRef = useRef(null);

    //initializeCytoscape

    useEffect(() => {
        // Wait for the container to be available
        if (containerRef.current) {
            if (cyRef.current === null) {
                cyRef.current = cytoscape({
                    container: containerRef.current,
                    elements: elements,
                });
            }
        }

        return () => {
            if (cyRef.current) {
                cyRef.current.destroy();
                cyRef.current = null;
            }
        };
    }, [elements]);

    useEffect(() => {
        if (cyRef.current) {
            try {
                cyRef.current.style(sbgnStylesheet(cytoscape));
                cyRef.current.elements('node[type = "transcription_factor"]').style({
                    "background-color": "#4881A6",
                    "text-outline-width": 0,
                    width: "100px",
                    height: "30px",
                });
                cyRef.current.elements('node[type = "protein"]').style({
                    "background-color": "#B6BD7B",
                    "text-outline-width": 0,
                    width: "80px",
                    height: "30px",
                });

                cyRef.current.elements('node[type = "simple_molecule"]').style({
                    "background-color": "#B6BD7B",
                    "text-outline-width": 0,
                    width: "100px",
                    height: "20px",
                });

                cyRef.current.elements('node[type = "gene"]').style({
                    "background-color": "#FFBC00",
                    "text-outline-width": 0,
                    shape: "rectangle",
                    width: "100px",
                    height: "30px",
                });

                cyRef.current.elements('node[type = "RNA"]').style({
                    "background-color": "#FFBC00",
                    "text-outline-width": 0,
                    shape: "polygon",
                    "shape-polygon-points": "-0.7, -0.6,   1, -0.6,   0.7, 0.5,   -1, 0.5",
                    width: "160px",
                });
                cyRef.current.layout({
                    name: 'breadthfirst',
                    directed: false,
                    spacingFactor: 1.0,
                    padding: 30
                }).run();
            } catch (error) {
                console.log(error);
            }

        }
    }, [])

    useEffect(() => {
        const handleError = (error, errorInfo) => {
            console.error('Error capturado:', error, errorInfo);
            // Puedes hacer aquí lo que necesites con el error, como enviarlo a un servicio de registro
            console.log(error);
        };

        // Establece el handler para capturar errores
        window.addEventListener('error', handleError);

        return () => {
            // Elimina el listener al desmontar
            window.removeEventListener('error', handleError);
        };
    }, []);


    return <div ref={containerRef} style={{ height: '100vh', ...style }}></div>;
};