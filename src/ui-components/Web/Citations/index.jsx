import { useMemo } from 'react'
import { indexedReferences } from 'ui-components/utils/References'
import ParagraphCitations from './Paragraph'
import { CITATION_SIZE } from './static'

function useGetIndexedReferences(allCitations) {
    return useMemo(() => {
        return indexedReferences(allCitations)
    }, [allCitations])
}

export { useGetIndexedReferences, ParagraphCitations,  CITATION_SIZE }