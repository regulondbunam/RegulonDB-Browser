import { useParams } from "react-router-dom";
import Details from "./Details";
import GenesList from "./List";

const PATH_GENE = {
  path: "gene",
  element: <Gene />,
  children: [
    {
      path: ":query",
    },
  ],
};

function Gene() {
  const { query } = useParams();
  const regex = /^RDBECOLIGN.+/;
  if (regex.test(query)) {
    return <Details geneId={query} />;
  } else {
    return <GenesList query={query} />;
  }
}

export { PATH_GENE, GenesList };
