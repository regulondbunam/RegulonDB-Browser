import { useQuery, useLazyQuery } from "@apollo/client";
import { query_getAllGenes, query_getRankFromGeneList } from "./queries";


export function useGetAllGenes() {
    const { loading, error, data } = useQuery(query_getAllGenes);
    let geneList = []
    try {
        if (data) {
            if(data.getObjectList){
              geneList = data.getObjectList
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query coexpression getObjectList", query_getAllGenes);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query coexpression getObjectList", query_getAllGenes);
    }
    return {geneList, loading, error}
}
/*
export function useLazyLoadCoexpression(
    genesInformation = [],
    geneName
  ) {
    const totalOfElements = genesId.length;
    const [getGene, { data, loading: coexLoad, error: coexError }] = useLazyQuery(
        query_getRankFromGeneList
    );
  
    if (totalOfElements < genes.length) {
      if (totalOfElements === 0) {
        setGenes([]);
      } else {
        let nGenes = [];
        genesId.forEach((id) => {
          const gn = genes.find((gene) => gene._id === id);
          if (gn) {
            nGenes.push(gn);
          }
        });
        if (DataVerifier.isValidArray(nGenes)) {
          setGenes(nGenes);
        }
      }
    }
  
    const inxLimit = 10;
    const [id, setId] = useState();
    const loading = unLoad.length > 0;
    let loadState = null;
    if (totalOfElements > 0) {
      loadState = 100 - (100 / totalOfElements) * unLoad.length;
    }
    const [error, setError] = useState();
    let genesData;
    try {
      if (data) {
        if (DataVerifier.isValidArray(data.getGenesBy.data)) {
          genesData = data.getGenesBy.data;
        }
      }
    } catch (error) {
      console.error("assign geneData value:", error);
      console.log("query getGeneBySearch", query_GET_GENE_BY);
    }
  
    if (!id && DataVerifier.isValidArray(unLoad)) {
      let _id = [];
      [...Array(inxLimit).keys()].forEach((n) => {
        let __id = unLoad.pop();
        if (__id) {
          _id.push(__id);
        }
      });
  
      if (DataVerifier.isValidArray(_id)) {
        setId(_id);
        getGene({ variables: { search: _id.join(" ") } });
        //console.log("ids:", _id);
      }
    } else {
      if (genesData && totalOfElements > genes.length) {
        let nGenes = [];
        genesData.forEach((geneData) => {
          if (!genes.find((gene) => gene._id === geneData._id)) {
            nGenes.push(geneData);
          }
        });
        if (DataVerifier.isValidArray(nGenes)) {
          setTimeout(() => {
            setGenes([...genes, ...genesData]);
          }, 25);
          if (id) {
            setId(undefined);
          }
        }
      }
    }
    //console.log(loading);
    return { genes: loading ? [] : genes, loading, error, loadState: loadState };
  }*/