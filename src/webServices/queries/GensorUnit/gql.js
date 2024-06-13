import { gql } from "@apollo/client";

export const query_mainView = gql`
  query mainViewQuery {
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