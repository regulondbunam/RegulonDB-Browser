import React, { useState } from "react";
import { DataVerifier } from "../../components/ui-components";
import growthConditionsData from "./growthCondition.json";

export default function Term({
  name,
  definition,
  oboId,
  path,
  iri,
  _id,
  hasDbXRef,
  hasOboNameSpace,
  hasRelatedSynonyms,
  synonyms
}) {
  const [activeTab, setActiveTab] = useState("details");

  // Filtrar growth conditions donde el término seleccionado esté en los terms
  const relatedGrowthConditions = growthConditionsData.filter(gc =>
    gc.terms.some(term => term.name === name)
  );

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

      <div style={{ display: "flex", borderBottom: "2px solid #ccc", marginBottom: "10px" }}>
        <button
          style={{ padding: "10px", border: "none", background: activeTab === "details" ? "#1F3D4E" : "#ccc", color: "white", cursor: "pointer" }}
          onClick={() => setActiveTab("details")}>Details</button>
        <button
          style={{ padding: "10px", border: "none", background: activeTab === "growth" ? "#1F3D4E" : "#ccc", color: "white", cursor: "pointer" }}
          onClick={() => setActiveTab("growth")}>Growth Conditions</button>
      </div>

      {activeTab === "details" && (
        <div>
          {path && path.length > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>Path:</h4>
              <p style={{ margin: "5px 0" }} dangerouslySetInnerHTML={{ __html: path.join(" → ") }}></p>
            </div>
          )}
          {DataVerifier.isValidArray(synonyms) && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>Synonyms:</h4>
              <p style={{ margin: "5px 0" }}>{synonyms.join(", ")}</p>
            </div>
          )}
          {oboId && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>OBO ID:</h4>
              <p style={{ margin: "5px 0" }}>{oboId}</p>
            </div>
          )}
          {DataVerifier.isValidArray(hasDbXRef) && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>Database References:</h4>
              <p style={{ margin: "5px 0" }}>{hasDbXRef.join(", ")}</p>
            </div>
          )}
          {hasOboNameSpace && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>OBO Namespace:</h4>
              <p style={{ margin: "5px 0" }}>{hasOboNameSpace}</p>
            </div>
          )}
          {DataVerifier.isValidArray(hasRelatedSynonyms) && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>Related Synonyms:</h4>
              <p style={{ margin: "5px 0" }}>{hasRelatedSynonyms.join(", ")}</p>
            </div>
          )}
          {definition && (
            <div style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#1F3D4E", margin: 0 }}>Definition:</h4>
              <p style={{ margin: "5px 0" }}>{definition.text}</p>
            </div>
          )}
          <a href={iri} target="_blank" rel="noopener noreferrer" style={{ color: "#1F3D4E", textDecoration: "none", fontWeight: "bold" }}>
            obolibrary.org
          </a>
        </div>
      )}

      {activeTab === "growth" && (
        <div>
          <p>If there are growth conditions contrast for a growth condition name, you can click on the name to navigate to the growth conditions contrast web page.</p>
          {relatedGrowthConditions.length > 0 ? (
            <ul style={{ paddingLeft: "20px" }}>
              {[...new Set(relatedGrowthConditions.map(gc => gc.gcPhrase))].map((gcPhrase, index) => {
                const formattedPhrase = gcPhrase
                  .split("|")
                  .map(part => part.trim())
                  .filter(part => part.length > 0)
                  .map((part, idx, array) => {
                    if (part.includes(":")) {
                      const [key, value] = part.split(":").map(p => p.trim());
                      return (
                        <span key={idx}>
                          {idx > 0 && " | "}
                          {value === name ? (
                            <b style={{ color: "#1F3D4E" }}>{key}: {value}</b>
                          ) : (
                            `${key}: ${value}`
                          )}
                        </span>
                      );
                    } else {
                      return (
                        <span key={idx}>
                          {idx > 0 && " | "}
                          {part === name ? <b style={{ color: "#1F3D4E" }}>{part}</b> : part}
                        </span>
                      );
                    }
                  });
                return formattedPhrase.length > 0 ? (
                  <li key={index} style={{ marginBottom: "10px", listStyleType: "disc" }}>
                    | {formattedPhrase} |
                  </li>
                ) : null;
              })}
            </ul>
          ) : (
            <p>No growth conditions found for this term.</p>
          )}
        </div>
      )}
    </div>
  );
}
