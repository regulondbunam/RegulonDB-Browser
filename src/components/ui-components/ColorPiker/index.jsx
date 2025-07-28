import {useState, useEffect, useRef} from "react";
import {HexColorPicker} from "react-colorful";
import {Button, IconButton} from "@mui/material";
import Paper from "@mui/material/Paper";
import ColorLensIcon from '@mui/icons-material/ColorLens';

export default function ColorPicker({name="name",handleSetColor, color}){
    const [open, setOpen] = useState(false)

    return(
        <div style={{position: 'relative'}} >
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} >
                <div>
                    <div style={{display:"flex", alignItems:"center", justifyContent: "space-around", width: '50px', height: '50px', backgroundColor: color, borderRadius: '50%', border: '1px solid black'}} >
                        <IconButton variant="contained" onClick={()=>{setOpen(!open)}} >
                            <ColorLensIcon sx={{color: "#000000"}} />
                        </IconButton>
                    </div>
                </div>
                <p>{name}</p>
            </div>
            {open && <Piker color={color} handleSetColor={handleSetColor} setOpen={setOpen} />}
        </div>    )

}

const Piker = ({color, handleSetColor =()=>{}, setOpen=()=>{}}) => {
    const colorPickerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(event.target) // Verifica si el clic ocurrió fuera del `div`
            ) {
                setOpen(false); // Cierra el color picker si se hace clic fuera


            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen, colorPickerRef]);

    return (<div ref={colorPickerRef} style={{position: 'absolute', top: 0, left: 0, zIndex: 1000, width: '220px', height: '220px' }} >
        <Paper elevation={3} sx={{display: "flex", flexDirection: "column", p:1}} >
            <p>Select Color</p>
            <HexColorPicker color={color} onChange={handleSetColor} />
        </Paper>
    </div>)
}