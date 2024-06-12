import React from "react";

const thStyle = {
  fontWeight: "bold",
  textAlign: "inherit",
};
const trStyle = {
  textAlign: "inherit",
};

export default function GeneOntologyTerms({
  geneOntologyTerms,
}) {

  if (!geneOntologyTerms) {
    return null;
  }
  return (
      <div>
        {CellularComponent(geneOntologyTerms?.cellularComponent)}
        {MolecularFunction(geneOntologyTerms?.molecularFunction)}
        {BiologicalProcess(geneOntologyTerms?.biologicalProcess)}
      </div>
  );
}

function CellularComponent(cc) {

  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 5%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Cellular Component</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              {GeneOntologyItem(cc)}
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function MolecularFunction(cc) {
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 5%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Molecular Function</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              {GeneOntologyItem(cc)}
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function BiologicalProcess(cc) {
  if (!cc || cc.length === 0) {
    return null;
  }
  return (
    <table style={{ margin: "1% 0% 0px 5%" }}>
      <thead>
        <tr style={thStyle}>
          <th>
            <h4 style={{ margin: "0" }}>Biological Process</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              {GeneOntologyItem(cc)}
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function GeneOntologyItem(components) {

  return (
    <tbody>
      {components.map((component) => {
        return (
          <tr className={"trShadow"} style={trStyle} key={`ccT_${component._id}`}>
            <td>{component.name}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

