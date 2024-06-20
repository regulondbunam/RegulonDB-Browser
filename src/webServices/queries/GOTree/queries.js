import { gql } from "@apollo/client";

export const query_GetSuperclassesOfTermId = gql`query GetSuperclassesOfTermId($_id: String) {
  getSuperclassesOfTermId(_id: $_id) {
    _id
    description
    genes {
      _id
      name
      productName
    }
    name
    ontologyId
    subclassOf
    subclasses
  }
}`

export const query_GetGoTerms = gql`
  query GetGoTerms {
    getGoTerms {
      _id
      description
      genes {
        _id
        name
        productName
      }
      name
      ontologyId
      subclassOf
      subclasses
    }
  }
`;

export const query_GetSubclassesOfTermId = gql`
  query GetSubclassesOfTermId($id: String) {
    getSubclassesOfTermId(_id: $id) {
      _id
      description
      genes {
        _id
        name
        productName
      }
      name
      ontologyId
      subclassOf
      subclasses
    }
  }
`;

export const query_GetTermBy = gql`query GetTermBy($advancedSearch: String, $search: String) {
  getTermBy(advancedSearch: $advancedSearch, search: $search) {
    _id
    description
    genes {
      _id
      name
      productName
    }
    name
    ontologyId
    subclassOf
    subclasses
  }
}`

export const query_GetNameBy = gql`query GetTermBy($search: String) {
  getTermBy(search: $search) {
    _id
    name
    genes {
      name
      productName
    }
    ontologyId
  }
}`