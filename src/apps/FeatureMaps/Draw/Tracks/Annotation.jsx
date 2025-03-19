import React from 'react'
import SvgIcon from '@mui/material/SvgIcon';

export default function Annotation({
    annotation,
    color,
    originPoint,
    scale,
}) {
    let annotationLeft = originPoint + (annotation.position * scale) + (annotation.size * annotation.overlap)
    
    return (
        <div
            style={{
                width: annotation.size + "px",
                height: 10 + "px",
                position: "absolute",
                top: -10 + "px",
                left: annotationLeft + "px",
                color: color,
                zIndex: 99
            }}
        >
            
            {annotation.isSymbol ? (
                <SvgIcon>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={annotation.symbolPath}
                            fill='none'
                        />
                    </svg>
                </SvgIcon>
            ) : (
                <p style={{fontSize: 10, color: color}} className='sequence'>{annotation.label}</p>
            )}

        </div>
    )
}
