import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import { SketchPicker } from 'react-color';
import PaletteIcon from '@mui/icons-material/Palette';




const ColorPicker = ({ setColor=()=>{}, color= "#000000" }) => {
    const [currentColor, setCurrentColor] = useState(color)
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const pickerRef = useRef(null);

    const handleButtonClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };


    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setDisplayColorPicker(false);
            setColor(currentColor);
        }
        
    };

    const handleColorChange = (color) => {
        setCurrentColor(color.hex)
    };

    useEffect(() => {
        if (displayColorPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [displayColorPicker]);

    return (
        <div>
            <Button
                variant="outlined" size='small'
                sx={{
                    minWidth: "50px",
                    color: "white",
                    backgroundColor: currentColor
                }}
                onClick={handleButtonClick}
            >
                <PaletteIcon />
            </Button>
            {displayColorPicker && (
                <div ref={pickerRef} style={{ position: 'absolute', zIndex: '2' }}>
                    <SketchPicker color={currentColor} onChangeComplete={handleColorChange} />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;