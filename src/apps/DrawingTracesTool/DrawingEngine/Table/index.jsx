import React, { useMemo } from "react";
import FilterTable from "ui-components/Web/FilterTable";

export default function TableDTT({
  geneticElements,
  leftEndPosition,
  rightEndPosition,
  idContainer,
  trackId,
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
      _properties: {
        onMouseEnter: () => {
          const draw = document.getElementById(
            `track_${trackId}_draw_${element._id}`
          );
          console.log(`track_${trackId}_draw_${element._id}`);
          if (draw) {
            draw.setAttribute("stroke", "#d59f0f");
            draw.setAttribute("stroke-width", "5");
          }
        },
        onMouseLeave: () => {
          const draw = document.getElementById(
            `track_${trackId}_draw_${element._id}`
          );
          if (draw) {
            draw.setAttribute("stroke", "");
            draw.setAttribute("stroke-width", "0");
          }
        },
      },
    });
    /*
    track_DttTool_draw_RDBECOLIGNC00610
    onMouseEnter={}
    onMouseLeave={}
    */
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
