import React, { useMemo } from 'react'
import FilterTable from 'ui-components/Web/FilterTable'
import { processAuthorsData } from './processData'

export default function Author({authorsData,datasetIds,_id}) {
    const table = useMemo(() => {
        return processAuthorsData(authorsData)
    }, [authorsData])
  return (
    <FilterTable {...table} />
  )
}
