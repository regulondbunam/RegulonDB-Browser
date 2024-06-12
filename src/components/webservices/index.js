import { useGetRegulonBySearch } from "./regulon";
import { useGetGenesBy, useGetGenesBySearch, useLazyLoadGenesBySearch, useGetMainGenesBySearch } from './gene';
import { useGetOperonByID, useGetOperonByTuId, useGetOperonBySearch, useGetOperonByAdvancedSearch } from './operon'
import useGetObjectList from "./objectList";
import { getRelatedIdsByOperonData } from "./operon/related_Ids";
import { useGetSigmulonById, useGetSigmulonBySearch } from "./sigmulon";
import {useGetAllGus, useGetGuById, useGetGuBySearch} from "./gensorUnit";
import { useGetAllGenes } from "./coexpression";
import { useGetPhraseByObjectId } from "./phrases";
import { useGetDataFile, useLazyGetDataFile } from "./dataOfFile";

export {
    useGetRegulonBySearch,
    useGetGenesBy, useGetGenesBySearch, useGetAllGenes, useLazyLoadGenesBySearch, useGetMainGenesBySearch,
    useGetObjectList,
    useGetOperonByID, useGetOperonByTuId, useGetOperonBySearch, useGetOperonByAdvancedSearch, getRelatedIdsByOperonData,
    useGetSigmulonById, useGetSigmulonBySearch,
    useGetAllGus, useGetGuById, useGetGuBySearch,
    useGetPhraseByObjectId,
    useGetDataFile, useLazyGetDataFile
}