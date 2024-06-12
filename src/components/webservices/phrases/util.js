
export class PhraseUtil{
    constructor(phrase){
        this.phrase = phrase;
    }

    isAssociatedPropertyExist(property_name){
        this.phrase.propertyPhrases.forEach(propertyPhrase => {
            if(propertyPhrase.associatedProperty === property_name){
                return true;
            }
        })
        return false;
    }

    getPhraseByProperty(property_name){
        let associatedPhrases = undefined;
        this.phrase.propertyPhrases.forEach(propertyPhrase => {
            propertyPhrase.associatedProperty.forEach(associatedProperty => {
                //console.log(propertyPhrase.associatedPhrases);
                if(associatedProperty.name === property_name){
                    associatedPhrases = propertyPhrase.associatedPhrases;
                }
            })
        })
        return associatedPhrases;
    }

}