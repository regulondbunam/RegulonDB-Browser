import { useParams } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";

const PATH_OPERON = {
  path: "operon",
  element: <Operon />,
  children: [
    {
      path: ":query",
    },
  ],
};

function Operon() {
  const { query } = useParams();
  const regex = /^RDBECOLIOP.+/;
  if (regex.test(query)) {
    return <Details id={query}/>
  } else {
    return <Home query={query} />;
  }
}



export { PATH_OPERON };