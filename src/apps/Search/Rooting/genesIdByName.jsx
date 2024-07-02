import { useQuery, gql } from "@apollo/client";
import { DataVerifier } from "ui-components/utils";

const query = gql`
query GetGenesBy($advancedSearch: String, $fullMatchOnly: Boolean) {
  getGenesBy(search: $advancedSearch, fullMatchOnly: $fullMatchOnly) {
    data {
      _id
      gene {
        name
      }
    }
  }
}
`;

export default function useGetGeneIdByNames(geneNames = []) {
    const {data,loading,error} = useQuery(query,{
        variables:{
            search: `${geneNames.join(" OR ")}`,
            fullMatchOnly: true
        }
    })
    if (error) {
        console.error("get gene id by name:",error);
    }
    let ids
    let noFound = []
    if (data) {
        if (DataVerifier.isValidArray(data.getGenesBy?.data)) {
            ids = []
            for (const name of geneNames) {
                if(name !== "coexpression"){
                    for (let index = 0; index <  data.getGenesBy.data.length; index++) {
                        const geneDm = data.getGenesBy.data[index]
                        if (geneDm.gene.name.toLowerCase() === name.toLowerCase()) {
                            ids.push(geneDm._id)
                            index = data.getGenesBy.data.length
                        }
                        if (index ===  data.getGenesBy.data.length-1) {
                            noFound.push(name)
                        }
                    }
                }
            }
        }
    }
    return {ids, noFound, loading}
}