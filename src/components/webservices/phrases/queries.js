import { gql } from '@apollo/client';

export const query_GET_PHRASE_OF = gql`query GetPhraseOf($objectId: [String]) {
    getPhraseOf(objectId: $objectId) {
      _id
      name
      objectType
      propertyPhrases {
        associatedPhrases {
          phrase
          phraseId
          pmid
        }
        associatedProperty {
          name
          value
        }
        position
      }
      sourceId
    }
  }`