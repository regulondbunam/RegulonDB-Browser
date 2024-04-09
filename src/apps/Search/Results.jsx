import React, { useEffect, useState } from 'react'
import { Typography, Divider } from '@mui/material'
import Genes from './Genes'
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
      <Divider sx={{ borderTop: "1px solid #d59f0f" }} />
      <div>
        <Genes id="genes" search={search}
          onCompleted={(state) => {
            if (state.nResults > 0) {
              LocalStorage.SaveRecentSearches(search)
            }
            setCount({ ...count, genes: state.nResults })
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
