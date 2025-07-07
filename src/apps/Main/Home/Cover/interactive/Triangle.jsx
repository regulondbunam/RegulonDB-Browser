// src/components/Triangle.jsx
import React, { useRef, useEffect, useState } from 'react';
import { SVG } from '@svgdotjs/svg.js';

const Triangle = ({ initialX, initialY, size = 50 }) => {
    const svgRef = useRef(null);
    const triangleRef = useRef(null);
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);

    // Propiedades del triángulo isósceles (ejemplo para un triángulo apuntando hacia arriba)
    const height = size * Math.sqrt(3) / 2; // Altura para un triángulo equilátero, puedes ajustarla para isósceles
    const halfBase = size / 2;

    useEffect(() => {
        if (svgRef.current && !triangleRef.current) {
            const draw = SVG(svgRef.current);
            // Define los puntos del triángulo. Para un isósceles, puedes ajustar las coordenadas.
            // Aquí un ejemplo básico: punta superior, base inferior izquierda, base inferior derecha
            const points = `${0},${height} ${halfBase},${0} ${size},${height}`;
            triangleRef.current = draw.polygon(points).fill('#4CAF50').stroke({ width: 1, color: '#388E3C' });
            // Posiciona el grupo que contiene el triángulo
            triangleRef.current.move(x, y);
        }
    }, [size, height, halfBase, x, y]);

    useEffect(() => {
        if (triangleRef.current) {
            triangleRef.current.animate(500).move(x, y);
        }
    }, [x, y]);

    const updatePosition = (newX, newY) => {
        setX(newX);
        setY(newY);
    };

    // Este componente expondrá un método para que el padre pueda actualizar su posición
    // Puedes usar useImperativeHandle si necesitas más control, pero para este caso
    // el padre podría simplemente pasar nuevas props de x e y.
    // Para simplificar, asumiremos que el padre actualizará el estado de x e y directamente.
    return (
        <svg
            ref={svgRef}
            width={size}
            height={height}
            style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        ></svg>
    );
};

export default Triangle;