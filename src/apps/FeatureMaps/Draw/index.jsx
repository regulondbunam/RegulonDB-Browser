import React, {useState} from "react";
import Map from "./Map";
import Annotations from "./Annotations";
import Controls from "./Controls";

export default function Draw({ state, dispatch }) {
  const [menuOpen, setMenuOpen] = useState(true)

  const handleMenuOpen = ()=>{
    setMenuOpen(!menuOpen)
  }

  return (
    <div>
      <Controls state={state} dispatch={dispatch} handleViewMenu={handleMenuOpen} menuOpen={menuOpen} />
      <div style={{ display: "grid", gridTemplateColumns: menuOpen ? "3fr 1fr" : "4fr", height: "calc(100vh - 184px)"}} >
        <Map state={state} dispatch={dispatch} />
        {menuOpen && <Annotations state={state} dispatch={dispatch} /> }
      </div>
    </div>
  );
}
