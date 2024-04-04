import { useQuery } from 'urql';
import { query_SEARCH_GENE } from './queries';
import DataVerifier from 'ui-components/utils';

export default function useSearchGene(keyword) {
  const [result] = useQuery({
    query: query_SEARCH_GENE,
    variables:{
      search: keyword
    }
  });
  const { data, fetching, error } = result;
  let genes
  if (error) {
    console.error("query genesResult Error, search Gene: ",error)
  }
  if (data) {
    if (DataVerifier.isValidArray(data.getGenesBy.data)) {
      genes = data.getGenesBy.data
    }
  }
  return {genes, data, fetching, error}
}
