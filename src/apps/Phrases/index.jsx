import { useQuery } from "@apollo/client";
import { DataVerifier } from "ui-components/utils";
import { query_GET_PHRASE_OF } from './queries';

export function useGetPhrase(id) {
    const { loading, error, data } = useQuery(query_GET_PHRASE_OF, {
        variables: { objectId: id },
    });
    let phrases = {};
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getPhraseOf)){
              if (DataVerifier.isValidArray(data.getPhraseOf[0].propertyPhrases)) {
                data.getPhraseOf[0].propertyPhrases.forEach(property => {
                    if (DataVerifier.isValidArray(property.associatedProperty)&&DataVerifier.isValidArray(property.associatedPhrases)) {
                        property.associatedProperty.forEach(_property => {
                            if (phrases[_property.name]) {
                                property.associatedPhrases.forEach(_phrase => {
                                    if (!phrases[_property.name].find(p=>p.phraseId === _phrase.phraseId)) {
                                        phrases[_property.name].push(_phrase)
                                    }
                                })
                            }else{
                                phrases[_property.name] = [...property.associatedPhrases]
                            }
                        });
                    }
                });
              } 
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
    return {phrases, loading}
}