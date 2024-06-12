import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";
import { DataVerifier } from "../../../../components/ui-components";

const QUERY_getRankFromGeneList = gql`
  query getRankFromGeneList($gene: String!, $geneList: [String]!) {
    getRankFromGeneList(gene: $gene, geneList: $geneList) {
      gene {
        _id
        name
      }
      rank
      rgbColor
    }
  }
`;

export function useLazyLoadCoexpression(
  geneList = [],
  rankingGenes = [],
  matrices,
  addMatrix,
  gene
) {
  const [getCoexpression, { loading: coLoading, error }] = useLazyQuery(
    QUERY_getRankFromGeneList
  );
  const [matrixData, setMatrixData] = useState([]);
  const [loadGenes, setLoadGenes] = useState([...geneList]);
  const [loadGene, setLoadGene] = useState();
  const [onBuff, setBuff] = useState(false);
  const [matrixBuff, setMatrixBuff] = useState();
  const loading = loadGenes.length > 0;
  let progress = null;

  if (DataVerifier.isValidArray(matrices[gene])) {
    if(matrices[gene] !== matrixData){
      
      if (!matrixBuff || loadGene !== gene) {
        setLoadGene(gene);
        setMatrixBuff([...matrices[gene]]);
        setMatrixData([]);
        setBuff(false);
      } else {
        if (!onBuff && DataVerifier.isValidArray(matrixBuff)) {
          //console.log("hola");
          let column = matrixBuff[0];
          setBuff(true);
          if (column) {
            setTimeout(() => {
              //console.log("hola");
              setMatrixData([...matrixData, column]);
              setMatrixBuff(matrixBuff.slice(1, matrixBuff.length));
              setBuff(false);
            }, 100);
          }
        }
      }
    }
    return { loading, progress, matrixData };
  }

  const totalOfElements = geneList.length;
  if (totalOfElements > 0) {
    progress = (100 / totalOfElements) * matrixData.length;
  }
  if (error) {
    console.log(error);
  }

  if (loading) {
    if (!onBuff) {
      let gene = loadGenes[0];
      //console.log(gene);
      setBuff(true);
      if (gene) {
        setTimeout(() => {
          getCoexpression({
            variables: { gene: gene, geneList: rankingGenes },
            onCompleted: (data) => {
              setMatrixData([...matrixData, data.getRankFromGeneList]);
              setLoadGenes(loadGenes.slice(1, loadGenes.length));
              setBuff(false);
            },
            onError: (error) => {
              console.log(error);
            },
          });
        }, 20);
      }
    }
  } else {
    if (progress === 100) {
      addMatrix(gene, matrixData);
    }
    if (matrixData.length < totalOfElements && !coLoading) {
      console.log(loadGenes);
      /*
      geneList.forEach((gene) => {
        if (!arr.find((gn) => gn === gene)) {
          unLoadGenes.push(gene);
        }
      });
      */
    }
  }

  //console.log("load:" + progress, matrixData);

  let matrixTable = undefined;

  return { loading, progress, matrixTable, matrixData };
}
