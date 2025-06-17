import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { query_GET_PHRASE_OF } from './queries';
import { DataVerifier } from "../../ui-components";



export function useGetPhraseByObjectId(id) {
    const { loading, error, data } = useQuery(query_GET_PHRASE_OF, {
        variables: { objectId: id },
    });

    let phrases
    let propertiesPhrase = {}
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getPhraseOf)){
              phrases = data.getPhraseOf[0]
              propertiesPhrase = {}
              if (DataVerifier.isValidArray(phrases.propertyPhrases)) {
                phrases.propertyPhrases.forEach(item => {
                    if(DataVerifier.isValidArray(item.associatedProperty)){
                        item.associatedProperty.forEach((property=>{
                            propertiesPhrase[property.name] = item.associatedPhrases
                        }))
                    }
                });
              }
              
            }else{
                phrases = null
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query GetPhraseOf", query_GET_PHRASE_OF);
    }
    if (error) {
        console.error("query getPhraseOf: ", error);
        console.log("query GetPhraseOf", query_GET_PHRASE_OF);
    }
    return {phrases, propertiesPhrase, error, loading}
}


export function useLazyGetPhraseByObjectId() {

  const [searchPhrase, {loading, data, error}] = useLazyQuery(query_GET_PHRASE_OF)

  const getPhrasesInProperty = async (associatedProperty, objectId)=>{
    let propertiesPhrase = null
    await searchPhrase({
      variables:{objectId: objectId},
      onCompleted: (data)=>{
        if(data){
          if(DataVerifier.isValidArray(data.getPhraseOf)){
            const phrases = data.getPhraseOf[0]
            if (DataVerifier.isValidArray(phrases.propertyPhrases)) {
              phrases.propertyPhrases.forEach(item => {
                if(DataVerifier.isValidArray(item.associatedProperty)){
                  item.associatedProperty.forEach((property=>{
                    if (property.name === associatedProperty){
                      propertiesPhrase = item.associatedPhrases
                    }
                  }))
                }
              });
            }
          }
        }
      }
    })
    return propertiesPhrase
  }

  return { getPhrasesInProperty}
}