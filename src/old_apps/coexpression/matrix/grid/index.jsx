import React, { Suspense, useState, lazy } from "react";
import { DataVerifier } from "../../../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, gql } from "@apollo/client";
import Header from "./header";
import FirstColumn from "./firstColumn";
import { useLazyLoadCoexpression } from "./load";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ColumFill = lazy(() => import("./columFill"));

export const QUERY_getCoexpressionRank = gql`
  query getCoexpressionRank($geneName: String) {
    getTopCoexpressionRanking(gene: $geneName) {
      gene {
        _id
        name
      }
      rank
      rgbColor
    }
  }
`;

export default function Grid({ genesInformation = [], matrices, addMatrix }) {
  const [gene, setGene] = useState(genesInformation[0].gene.name);
  const [showRank, setShowRank] = useState(false);
  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
    variables: {
      geneName: gene,
    },
  });
  let rankingGenes = [];
  if (data) {
    if (DataVerifier.isValidArray(data.getTopCoexpressionRanking)) {
      rankingGenes = data.getTopCoexpressionRanking.map(
        (coexpression) => coexpression.gene[0].name
      );
    }
  }
  const genesList = genesInformation.map((inf) => inf.gene.name);
  const widthCell = 60;
  const gridTemplateColumns = `repeat(${
    genesInformation.length + 1
  }, ${widthCell}px)`;

  const handleSetGene = (geneName) => {
    setGene(geneName);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <>
      {data && (
        <div id="matrixContainer" style={{ height: "500px", overflow: "auto" }}>
          <div className="controls_matrix">
            <FormControlLabel
              control={
                <Switch
                  value={showRank}
                  onChange={() => {
                    setShowRank(!showRank);
                  }}
                />
              }
              label="View Coexpression value"
            />
          </div>
          <div
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              gridTemplateColumns: gridTemplateColumns,
              columnGap: "2px",
              background: "#ffffff",
              width: `${(genesInformation.length + 1) * (widthCell + 2)}px`,
            }}
          >
            <Header
              genesInformation={genesInformation}
              handleSetGene={handleSetGene}
              rankingGenes={rankingGenes}
              widthCell={widthCell}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `${widthCell}px auto`,
              columnGap: "2px",
              width: `${(widthCell + 2) * genesInformation.length}px`,
            }}
          >
            <FirstColumn rankingGenes={rankingGenes} widthCell={widthCell} />
            <div
              style={{
                display: "grid",
                columnGap: "2px",
                gridTemplateColumns: `repeat(${genesInformation.length}, ${widthCell}px)`,
              }}
            >
              <Columns
                gene={gene}
                matrices={matrices}
                addMatrix={addMatrix}
                rankingGenes={rankingGenes}
                geneList={genesList}
                widthCell={widthCell}
                showRank={showRank}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Columns({
  rankingGenes,
  geneList,
  widthCell,
  matrices,
  addMatrix,
  gene,
  showRank,
}) {
  const { matrixData } = useLazyLoadCoexpression(
    geneList,
    rankingGenes,
    matrices,
    addMatrix,
    gene
  );
  if (!matrixData) {
    return <></>;
  }
  return (
    <>
      {matrixData.map((columnData, index) => {
        return (
          <Suspense key={"column_" + index} fallback={<>...</>}>
            <ColumFill
              columnIndex={index}
              columnData={columnData}
              geneList={geneList}
              rankingGenes={rankingGenes}
              widthCell={widthCell}
              showRank={showRank}
            />
          </Suspense>
        );
      })}
    </>
  );
}

/*
{columns.map((coexpression, index) => {
                return (
                  <Suspense
                    key={"column_" + index + "_idGene_" + coexpression.gene._id}
                    fallback={<>...</>}
                  >
                    <ColumFill
                      gene={coexpression.gene.name}
                      rankingGenes={rankingGenes}
                      widthCell={widthCell}
                    />
                  </Suspense>
                );
              })}
*/
