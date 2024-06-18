import React from 'react'
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const query_getGu = gql`
  query getGu($advancedSearch: String) {
    getGUsBy(advancedSearch: $advancedSearch) {
      data {
        _id
      }
    }
  }
`;

export default function GU({regulonName}) {
    const { data: gu } = useQuery(query_getGu, {
        variables: {
          advancedSearch: `${regulonName}[gensorUnit.name]`,
        },
      });
  return (
    <div>GU</div>
  )
}
