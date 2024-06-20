import useSearchGene, {useLazySearchGene, useGetGeneByID, useGetMainGenesBySearch} from "./GenesResult";
import useGetObjectList from "./ObjectList";
import { useGetGeneticElements, useLazyGetGeneticElements } from "./DTTData";
import { useGetAllGus, useGetGuById, useGetGuBySearch } from "./GensorUnit";
import { useGetOperonByID, useLazySearchOperon } from "./OperonResult";
import { useGetGoTerms, useLazyGetGOBySearch, useLazyGetSubclassesOfTermId, useGetGOBySearch, useGetTree } from "./GOTree";
import { useGetListAllDownloadableFiles } from "./DownloadableFile";
import { useGetRegulonData } from "./RegulonResult";
import { useGetDatasetByID, useGetDatasetByAdvancedSearch, useGetNLPGC } from "./Dataset";
import { useGetNLPGrowthConditionById } from "./NLPGrowthConditions";
import { useGetAuthorDataOfDataset } from "./AuthorsData";
import useGetNormalizedData from "./NormalizedDataOfDataset";

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
    //others
    useGetGoTerms, useLazyGetGOBySearch, useLazyGetSubclassesOfTermId, useGetGOBySearch, useGetTree,
    useGetListAllDownloadableFiles,
    useGetRegulonData, useGetDatasetByID,
    useGetNLPGrowthConditionById,
    useGetAuthorDataOfDataset, useGetDatasetByAdvancedSearch,
    useGetNormalizedData, useGetNLPGC,
}