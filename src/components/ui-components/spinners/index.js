import React from "react";
import CircularProgress from "@mui/material/CircularProgress";


/**
 * Description placeholder
 *
 * @param {*} props
 * @returns {HTMLElement}
 */
function Circular(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <CircularProgress {...props} />
    </div>
  );
}

export default Circular;
