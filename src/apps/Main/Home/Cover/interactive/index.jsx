import {useEffect, useRef} from "react";
import { SVG } from '@svgdotjs/svg.js';
import Organism from "./organisms";

const VARIANTS = {
    live: initLive,
};

function initLive({panel, svgInstanceRef}) {
    const numOrganisms = 50;
    const rect = panel.getBoundingClientRect();
    const canva = SVG().addTo(panel).size(rect.width, rect.height);
    svgInstanceRef.current = canva;

    const organisms = [];
    const bounds = {width: rect.width, height: rect.height};
    for (let i = 0; i < numOrganisms; i++) {
        const posX = Math.floor(Math.random() * bounds.width);
        const posY = Math.floor(Math.random() * bounds.height);
        const organism = new Organism(posX, posY);
        organism.setStage(canva);
        organism.draw();
        organism.initMotion(bounds);
        organisms.push(organism);
    }

    let frameId = null;
    let lastTime = null;
    const tick = (time) => {
        if (lastTime === null) lastTime = time;
        const dt = Math.min(0.05, (time - lastTime) / 1000);
        lastTime = time;
        for (const organism of organisms) {
            organism.update(dt, bounds);
        }
        frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);

    return () => {
        if (frameId) {
            window.cancelAnimationFrame(frameId);
        }
        organisms.forEach((organism) => organism.stopNPCMode());
        if (svgInstanceRef.current) {
            svgInstanceRef.current.clear();
            svgInstanceRef.current.remove();
            svgInstanceRef.current = null;
        }
    };
}

export default function InteractiveCover({variant = "live"}){
    const panel = useRef();
    const svgInstance = useRef(null);

    useEffect(() => {
        if (!panel.current) return;
        const startVariant = VARIANTS[variant] || VARIANTS.live;
        if (!VARIANTS[variant]) {
            console.warn(`InteractiveCover: unknown variant "${variant}", using "live".`);
        }
        return startVariant({panel: panel.current, svgInstanceRef: svgInstance});
    }, [variant]);

    return <div
            style={{width: "100%", height:"100%"}}
            ref={panel} id={"interactive-cover"}
    />
}
