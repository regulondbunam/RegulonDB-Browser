import { useParams } from "react-router-dom";

import GenesList from "./List";

const PATH_GENE = {
  path: "gene",
  element: <Gene />,
  children: [
    { 
      path: ":query",
    }
  ]
}

function Gene() {
  const {query} = useParams()
  const regex = /^RDBECOLIGN.+/;
  if (regex.test(query)) {
    return <>gene details</>
} else {
    return <GenesList query={query} />
}
}

export {PATH_GENE, GenesList}