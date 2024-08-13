import { gql } from "@apollo/client";

export const getNetwork = (id) => {
  return gql`
    {
      getNodesOf(objectId: ["${id}"]) {
        _id
        name
        type
        outdegree {
          _id
          type
          name
          regulatoryEffect
        }
        indegree {
          _id
          type
          name
          regulatoryEffect
        }
      }
    }
  `;
};
