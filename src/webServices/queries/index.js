import useSearchGene, {useLazySearchGene, useGetGeneByID, useGetMainGenesBySearch} from "./GenesResult";
import useGetObjectList from "./ObjectList";
import { useGetGeneticElements, useLazyGetGeneticElements } from "./DTTData";
import { useGetAllGus, useGetGuById, useGetGuBySearch } from "./GensorUnit";
import { useGetOperonByID, useLazySearchOperon } from "./OperonResult";

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
    //GUS
    useGetAllGus, useGetGuById, useGetGuBySearch,
    //Operons
    useGetOperonByID, useLazySearchOperon,
}