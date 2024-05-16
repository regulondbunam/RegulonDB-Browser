import { useQuery, useLazyQuery } from '@apollo/client';
import { query_getGeneticElementsInterval } from './queries';
import { DataVerifier } from 'ui-components/utils';


export function useGetGeneticElements({
    covered = false,
    leftEndPosition,
    rightEndPosition,
    objectType,
    strand,
}) {
    const { data, loading, error } = useQuery(query_getGeneticElementsInterval, {
        variables: {
            covered: covered,
            leftEndPosition: leftEndPosition,
            objectType: objectType,
            rightEndPosition: rightEndPosition,
            strand: strand,
        }
    })
    let geneticElements
    if (data) {
        if (DataVerifier.isValidArray(data.getGeneticElementsFromInterval)) {
            geneticElements = data.getGeneticElementsFromInterval
        }else{
            geneticElements = []
        }
    }
    if (error) {
        console.error("DTT ws error");
    }
    return {geneticElements, loading, error}
}