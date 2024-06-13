import { gql } from "@apollo/client";

export const query_getAllGUs = gql`
{
    getAllGUs {
      data {
        _id
        gensorUnit {
          groups
          _id
          name
        }
      }
    }
  }
`;

export const /** object */ query_getGuBySearch = gql`
    query GetGUsBy($search: String) {
      getGUsBy(search: $search) {
        data {
          _id
          gensorUnit {
            groups
            _id
            name
          }
        }
      }
    }
  `;

export const /** object */ query_getGuById = gql`
    query GetGUsBy($advancedSearch: String) {
      getGUsBy(advancedSearch: $advancedSearch) {
        data {
          _id
          gensorUnit {
            components {
              function
              name
              type
            }
            description
            geneOntology {
              biologicalProcess {
                name
              }
              cellularComponent {
                name
              }
              molecularFunction {
                name
              }
            }
            groups
            _id
            name
            note
            signalName
          }
          reactions {
            components {
              function
              name
              type
            }
            description
            name
            number
            order
            pathwayComponents
            type
          }
          totalOfComponents
        }
      }
    }
  `;