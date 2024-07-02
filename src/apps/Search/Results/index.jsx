import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import Genes from './Genes'
import Operon from './Operon';
import Regulon from './Regulon';
import Sigmulon from './Sigmulon';
import { LocalStorage } from 'ui-components/utils';



export default function Results({ search = "" }) {
  const [count, setCount] = useState({
    genes: 0,
  })

  useEffect(() => {
    return () => {
      setCount(0)
    }
  }, [])

  const _count = countResults(count)

  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }} >
      <Typography variant='h2' >
        Results of {search} ({_count})
      </Typography>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}} >
        <Genes id="genes" search={search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(search)
            }
            setCount({ ...count, genes: state.nResults })
          }}
        />
        <Operon id="operon" search={search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(search)
            }
            setCount({ ...count, operon: state.nResults })
          }}
        />
        <Regulon id="regulon" search={search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(search)
            }
            setCount({ ...count, regulon: state.nResults })
          }}
        />
        <Sigmulon id="regulon" search={search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(search)
            }
            setCount({ ...count, regulon: state.nResults })
          }}
        />
      </div>
    </div>
  )
}

function countResults(count = {}) {
  let _count = 0
  Object.keys(count).forEach(result => {
    _count += count[result]
  });
  return _count
}
