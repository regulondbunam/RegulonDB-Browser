import DataVerifier from "../DataVerifer";
import {STORAGE_TYPE} from "./static"

export default class LocalStorage {

    static getRecentSearches(){
        const resentSearches = localStorage.getItem(STORAGE_TYPE.RECENT_SEARCH);
        if(DataVerifier.isValidString(resentSearches)){
            return JSON.parse(resentSearches);
        }
        return []
    }
  
    static SaveRecentSearches(search){
        let resentSearches = this.getRecentSearches()
        if (DataVerifier.isValidArray(resentSearches)) {
            if (!resentSearches.find(value=>value===search)) {
                resentSearches = [search].concat(resentSearches)
                localStorage.setItem(STORAGE_TYPE.RECENT_SEARCH,JSON.stringify(resentSearches));
                return true
            }
        }else{
            localStorage.setItem(STORAGE_TYPE.RECENT_SEARCH,JSON.stringify([search]));
            return true
        }
        return false
    }

    
}
