import { gql } from "@apollo/client";

export const get_all_organisms = gql`
  query getAllOrganisms {
    getAllOrganisms {
      _id
      name
      description
      strainName
      type
      plasmidName
  }
  }`