import React, {useEffect} from 'react'
import { DataVerifier } from 'ui-components/utils';
import { gql, useQuery, useLazyQuery } from "@apollo/client";


const query_GetDatasetsID = gql`
  query GetDataset($advancedSearch: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      datasetType
      sourceSerie {
        strategy
      }
      sample {
        title
      }
    }
  }
`;


const query_getDataset = gql`
  query getDataset($advancedSearch: String, $gene: String) {
    getDatasetsFromSearch(advancedSearch: $advancedSearch) {
      _id
      datasetType
      sourceSerie {
        strategy
      }
      sample {
        title
      }
    }
    getGeneExpressionFromSearch(advancedSearch: $gene, limit: 50) {
      datasetIds
      gene {
        name
      }
    }
  }
`;


export default function HT({ regulonName, geneName }) {
    const { data: ht } = useQuery(query_getDataset, {
        variables: {
            advancedSearch: `'${regulonName}'[objectsTested.name]`,
            gene: `${geneName}[gene.name]`,
        },
    });

    useEffect(() => {
        if (
          DataVerifier.isValidArray(ht?.getGeneExpressionFromSearch) &&
          document.getElementById("relatedActive") && 
          !htExpression
        ) {
          let htIds = [];
          ht.getGeneExpressionFromSearch.forEach((ge) => {
            if (DataVerifier.isValidArray(ge.datasetIds)) {
              ge.datasetIds.forEach((id) => {
                const label = id.split("_")[2];
                htIds.push(label + "[_id]");
              });
            }
          });
          getGE({
            variables: {
              advancedSearch: htIds.join(" or "),
            },
          });
        }
      });

    const [getGE, { data: htExpression }] = useLazyQuery(query_GetDatasetsID);

    return (
        <div>HT</div>
    )
}
