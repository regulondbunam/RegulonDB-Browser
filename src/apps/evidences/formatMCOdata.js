import { DataVerifier } from "../../components/ui-components"

export default function formatMCOData(data=[]) {
    const items ={}
    if(DataVerifier.isValidArray(data)){
        data.forEach((term)=>{
            if(term && term.superClassOf){
                items['root'] = {
                    index: "root",
                    isFolder: true,
                    children: term.superClassOf,
                    data: term.name,
                    term: term
                }
            }else{
                items[term._id] = {
                    index:  term._id,
                    isFolder: DataVerifier.isValidArray(term.superClassOf),
                    children: term.superClassOf,
                    data: term.name,
                    term: term
                }
            }
        })
    }
    return items
}