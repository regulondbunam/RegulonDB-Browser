import OntologyBrowser from "./index";

export function MCO() {
  return <OntologyBrowser ontologyId="RDBONTOLMCO00001" title= "Microbial Conditions Ontology (MCO) Browser" />;
}

export function GO() {
  return <OntologyBrowser ontologyId="RDBONTOLGON00001" title="Gene Ontology (GO) Browser" />;
}