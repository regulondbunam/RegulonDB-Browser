// default properties 
import dna_dp from './dna.json'
import gene_dp from './gene.json'
import operon_dp from './operon.json'
import ppgpp_dp from './ppgpp.json'
import promoter_dp from './promoter.json'
import riboswitch_dp from './riboswitch.json'
import srna_dp from './srna.json'
import terminator_dp from './terminator.json'
import tfBindingSite_dp from './tfBindingSite.json'
import transcriptionalAttenuator_dp from './transcriptionalAttenuator.json'
import transnationalAttenuator_dp from './transnationalAttenuator.json'

const dnaObjects_list = [
  gene_dp.objectType,
  operon_dp.objectType,
  ppgpp_dp.objectType,
  promoter_dp.objectType,
  riboswitch_dp.objectType,
  srna_dp.objectType,
  terminator_dp.objectType,
  tfBindingSite_dp.objectType,
  transcriptionalAttenuator_dp.objectType,
  transnationalAttenuator_dp.objectType,
  dna_dp.objectType,
]

function getPropertiesByObjectType(objectType) {
  switch (objectType) {
    case gene_dp.objectType:
      return gene_dp;
    case operon_dp.objectType:
      return operon_dp;
    case ppgpp_dp.objectType:
      return ppgpp_dp;
    case promoter_dp.objectType:
      return promoter_dp;
    case riboswitch_dp.objectType:
      return riboswitch_dp;
    case srna_dp.objectType:
      return srna_dp;
    case terminator_dp.objectType:
      return terminator_dp;
    case tfBindingSite_dp.objectType:
      return tfBindingSite_dp;
    case transcriptionalAttenuator_dp.objectType:
      return transcriptionalAttenuator_dp;
    case transnationalAttenuator_dp.objectType:
      return transnationalAttenuator_dp;
    case dna_dp.objectType:
      return dna_dp;
    default:
      return undefined;
  }
}

export { dnaObjects_list, getPropertiesByObjectType, dna_dp, gene_dp, operon_dp, ppgpp_dp, promoter_dp, riboswitch_dp, srna_dp, terminator_dp, tfBindingSite_dp, transcriptionalAttenuator_dp, transnationalAttenuator_dp }