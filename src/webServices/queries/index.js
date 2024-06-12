import useSearchGene, {useLazySearchGene, useGetGeneByID, useGetMainGenesBySearch} from "./GenesResult";
import useGetObjectList from "./ObjectList";
import { useGetGeneticElements, useLazyGetGeneticElements } from "./DTTData";

export {
    //ResultGenes
    useGetMainGenesBySearch,
    useSearchGene,
    useLazySearchGene,
    //ObjectList
    useGetObjectList,
    useGetGeneByID,
    //DTT
    useGetGeneticElements,
    useLazyGetGeneticElements,
}