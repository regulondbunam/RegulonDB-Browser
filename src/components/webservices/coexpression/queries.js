import { gql } from "@apollo/client";

export const query_getAllGenes = gql`
  query GetGeneList {
    getObjectList(datamartType: "gene") {
      _id
      name
      synonyms
      productsName
    }
  }
`;

const query_getRankFromGeneList = gql`
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