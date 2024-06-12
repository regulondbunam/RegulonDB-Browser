import React from "react";

export function Columns({ matrix, rankingGenes, widthCell }) {
  return (
    <React.Fragment>
      {matrix.map((coexpression, index) => {
        return (
          <ColumFill
            gene={coexpression.gene.name}
            rankingGenes={rankingGenes}
            widthCell={widthCell}
          />
        );
      })}
    </React.Fragment>
  );
}
export default function ColumFill({ columnData, columnIndex, geneList, rankingGenes = [], widthCell, showRank = true  }) {


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${widthCell}px`,
        gridTemplateRows: `repeat(${rankingGenes.length}, 30px)`,
        rowGap: "2px",
      }}
    >
      {columnData.map((coexpression, index) => {
        const gene = coexpression.gene[0].name
            return (
                <div
                className="cell_matrix"
                style={{
                  height: "30px",
                  width: `${widthCell}px`,
                  backgroundColor: "rgb(" + coexpression.rgbColor + ")",
                }}
              >
                {showRank && (
                  <p style={{
                    color: 'white', 
                    textShadow: '1px 1px 0px #010101'
                  }}>{coexpression.rank.toFixed(2)}</p>
                )}
              </div>
            );
          })}
    </div>
  );
}
