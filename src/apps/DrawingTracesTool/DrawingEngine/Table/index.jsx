import React, { useMemo } from "react";
import FilterTable from "ui-components/Web/FilterTable";

export default function TableDTT({
  geneticElements,
  leftEndPosition,
  rightEndPosition,
  idContainer,
}) {
  const columns = [
    { label: "id" },
    { label: "Name" },
    { label: "Left position" },
    { label: "Right position" },
    { label: "Object type" },
    { label: "Strand" },
    { label: "Options" },
  ];
  let data = [];
  geneticElements.forEach((element) => {
    data.push({
      id: element._id,
      Name: element.labelName,
      "Left position": element.leftEndPosition,
      "Right position": element.rightEndPosition,
      "Object type": element.objectType,
      Strand: element.strand,
      Options: <>optionsTool</>,
    });
  });
  console.log(geneticElements);
  return (
    <FilterTable
      columns={columns}
      data={data}
      idContainer={idContainer}
      titleVariant="relevant"
      tableName={`Genetic elements in ${leftEndPosition} to ${rightEndPosition}`}
      selection="row"
    />
  );
}
