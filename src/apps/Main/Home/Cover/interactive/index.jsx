import {useEffect, useRef, useState, useCallback} from "react";
import { SVG } from '@svgdotjs/svg.js';
import Organism from "./organisms";

export default function InteractiveCover(){
    const [isInit, setIsInit] = useState(false)
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const panel = useRef();
    const svgInstance = useRef(null);

    useEffect(() => {
        if(panel.current && !isInit && svgInstance.current === null){
            //respawn de bacterias
            const poblation = 150
            const rect = panel.current.getBoundingClientRect();
            const canva = SVG().addTo(panel.current).size(rect.width, rect.height);
            svgInstance.current = canva;
            for (let i = 0; i < poblation; i++) {
                const posX = Math.floor(Math.random() * rect.width)
                const posY = Math.floor(Math.random() * rect.height)
                const organism = new Organism(posX, posY)
                organism.setStage(canva)
                organism.draw()
                organism.move()
            }
            setIsInit(true)
        }
    }, [isInit]);

    const handleMouseMove = useCallback((event) => {
        const rect = panel.current.getBoundingClientRect();
        setCursorPos({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    }, []);

    return <div style={{width: "100%", height:"100%"}} ref={panel} id={"interactive-cover"} onMouseMove={ handleMouseMove}/>
}