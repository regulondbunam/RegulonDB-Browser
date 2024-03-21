import React from 'react'
import "./header.css"
import { isMobile } from 'react-device-detect';

export default function Header() {
  if (isMobile) {
    return <div style={{width: "100%", height: "5px", backgroundColor: "#1f3d4e"}} ></div>
  }
  return (
    <div className='rdb_Layout_Header'>
        <div className="Logo">
        </div>
        <div className="Links"></div>
      </div>
  )
}
