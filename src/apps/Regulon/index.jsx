import { useParams } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";

const PATH_REGULON = {
  path: "regulon",
  element: <Regulon />,
  children: [
    {
      path: ":query",
    },
  ],
};

function Regulon() {
  const { query } = useParams();
  const regex = /^RDBECOLI.+/;
  if (regex.test(query)) {
    return <Details regulonId={query} />;
  } else {
    return <Home query={query} />;
  }
}

export { PATH_REGULON };