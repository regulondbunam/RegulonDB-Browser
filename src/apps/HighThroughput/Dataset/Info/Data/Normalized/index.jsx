import React from 'react'
import TFBS from './TFBS'

export default function Normalized(props) {
    const NormalizedView = {}
    NormalizedView["TFBINDING"] = TFBS
    return <TFBS {...props} />
  return (
    <div>
        {NormalizedView[props.datasetType](props)}
    </div>
  )
}
