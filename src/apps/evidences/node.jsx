import React from "react";
import { DataVerifier } from "../../components/ui-components";

export default function Node({
  name,
  definition,
  _id,
  category,
  code,
  pertainsTo,
  path,
  note
}) {
  return (
    <div style={{
      width: "90%",
      margin: "20px auto",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff"
    }}>
      <h2 style={{ color: "#1F3D4E", marginBottom: "5px" }}>{name}</h2>
      <p style={{ margin: "2px 0 10px 0", color: "#9A9A9A", fontSize: "0.85rem" }}>{_id}</p>
      {note && (
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ color: "#1F3D4E", margin: 0 }}>Description:</h4>
          <p style={{ margin: "5px 0" }}>{note}</p>
        </div>
      )}
      <div style={{ marginBottom: "10px" }}>
        <h4 style={{ color: "#1F3D4E", margin: 0 }}>Category:</h4>
        <p style={{ margin: "5px 0" }}>{category}</p>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <h4 style={{ color: "#1F3D4E", margin: 0 }}>Code:</h4>
        <p style={{ margin: "5px 0" }}>{code}</p>
      </div>
      {DataVerifier.isValidArray(pertainsTo) && (
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ color: "#1F3D4E", margin: 0 }}>Pertains To:</h4>
          <p style={{ margin: "5px 0" }}>{pertainsTo.join(", ")}</p>
        </div>
      )}
      {definition && (
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ color: "#1F3D4E", margin: 0 }}>Definition:</h4>
          <p style={{ margin: "5px 0" }}>{definition.text}</p>
        </div>
      )}
      {path.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ color: "#1F3D4E", margin: 0 }}>Path:</h4>
          <p style={{ margin: "5px 0" }} dangerouslySetInnerHTML={{ __html: path.join(" → ") }}></p>
        </div>
      )}
    </div>
  );
}
