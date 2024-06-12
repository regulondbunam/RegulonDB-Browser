import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";

const QUERY_getGeneById = gql`
  query getGeneById($search: String!, $limit: Int = 10) {
    getGenesBy(search: $search, limit: $limit) {
      data {
        _id
        gene {
          _id
          name
        }
        regulation {
          operon {
            _id
            name
          }
          regulators {
            _id
            name
          }
        }
        products {
          _id
          name
          geneOntologyTerms {
            cellularComponent {
              _id
              name
            }
            biologicalProcess {
              _id
              name
            }
            molecularFunction {
              _id
              name
            }
          }
        }
      }
    }
  }
`;


export function useGetGenes(genes) {
  const { loading, error, data } = useQuery(QUERY_getGeneById,{
    variables: {
        search: genes.join(" ")
    }
  });
  let genesData = [];
  try {
    if (data) {
      if (data.getGenesBy.data) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", QUERY_getGeneById);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBySearch", QUERY_getGeneById);
  }
  return { genesData, loading, error };
}
