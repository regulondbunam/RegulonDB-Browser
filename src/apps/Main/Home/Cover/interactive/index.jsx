import {useEffect, useRef, useState, useCallback} from "react";
import { SVG } from '@svgdotjs/svg.js';
import Organism from "./organisms";


export default function InteractiveCover(){
    const [isInit, setIsInit] = useState(false)
    const [follower, setFollower] = useState([])
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

    /*useEffect(() => {
        const handleGlobalMouseMove = (event) => {
            if (!panel.current) return;
            const rect = panel.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            follower.forEach((f) => f.startFollowMode(x, y));
        };

        const handleMouseLeave = () => {
            follower.forEach((f) => {
                f.stop();
                f.startNPCMode();
            });
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseout', handleMouseLeave); // o usar 'mouseleave'

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
        };
    }, [follower]);*/

    return <div
            style={{width: "100%", height:"100%"}}
            ref={panel} id={"interactive-cover"}
    />
}