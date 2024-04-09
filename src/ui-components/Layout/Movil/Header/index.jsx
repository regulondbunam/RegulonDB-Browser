import React from 'react'
import "./header.css"
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";



export default function Header() {
  const navigate = useNavigate()
  return (
    <div className='rdb_Layout_Movil_Header'>
      <div className="Logo" onClick={()=>navigate("/")} >
      </div>
      <div className="Links"></div>
    </div>
  )
}
