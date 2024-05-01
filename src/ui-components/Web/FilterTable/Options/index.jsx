import React from 'react'
import Downloads from './Downloads'
import HideColumns from './HideColumns'

export default function Options(props) {
  return (
    <div>
      <HideColumns {...props} />
      {"   "}
        <Downloads {...props} />
    </div>
  )
}
