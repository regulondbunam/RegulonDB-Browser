import {  DataVerifier } from "../../../components/ui-components";
import {MapReactions} from './reactions';
//import GeneOntology from './geneOntology';

export default function GuInfo({
  idSite, 
  gensorUnit,
  reactions,
  nReactions
}) {
  if(DataVerifier.isValidArray(reactions)){
    return (
      <MapReactions idSite={idSite} reactions={reactions} nodes={gensorUnit.components} name={gensorUnit.name} />
    )
  }
  return <div>error... no reactions</div>
}


/* 

*/