import GenesList from "./List";

const PATH_GENE = {
  path: "gene",
  element: <GenesList />,
  children: [
    { 
      path: ":geneId",
    }
  ]
}

export {PATH_GENE, GenesList}