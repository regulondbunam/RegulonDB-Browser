import {useEffect, useRef, useState, useCallback} from "react";
import { SVG } from '@svgdotjs/svg.js';
import Organism from "./organisms";

export default function InteractiveCover(){
    const [isInit, setIsInit] = useState(false)
    const [follower, setFollower] = useState([])
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const panel = useRef();
    const svgInstance = useRef(null);

    useEffect(() => {
        if(panel.current && !isInit && svgInstance.current === null){
            const numOrganisms = 50
            const rect = panel.current.getBoundingClientRect();
            const canva = SVG().addTo(panel.current).size(rect.width, rect.height);
            svgInstance.current = canva;
            let numFollowers = Math.floor(Math.random() * (10 - 5) + 5)
            let followers = []
            for (let i = 0; i < numOrganisms; i++) {
                const posX = Math.floor(Math.random() * rect.width)
                const posY = Math.floor(Math.random() * rect.height)
                const organism = new Organism(posX, posY)
                organism.setStage(canva)
                organism.draw()
                if(numFollowers>0){
                    followers.push(organism)
                    numFollowers--
                }
               organism.startNPCMode();
            }
            setFollower(followers)
            setIsInit(true)
        }
    }, [isInit]);

    const handleMouseMove = (event)=>{
        const rect = panel.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        for (let i = 0; i < follower.length; i++) {
            follower[i].startFollowMode(x, y)
        }
    };

    const returnNPCFollowers = ()=>{
        for (let i = 0; i < follower.length; i++) {
            follower[i].stop()
            follower[i].startNPCMode()
        }
    }

    return <div
            style={{width: "100%", height:"100%"}}
            ref={panel} id={"interactive-cover"}
            onMouseMove={ handleMouseMove}
            onMouseLeave={returnNPCFollowers}
    />
}