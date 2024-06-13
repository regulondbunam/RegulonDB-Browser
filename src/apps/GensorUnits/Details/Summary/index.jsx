import React from 'react'
import GeneOntology from './geneOntology'

export default function Summary({reactions,geneOntology,components}) {
  return (
    <div>
      <br />
      <GeneOntology {...geneOntology}  />
    </div>
  )
}
