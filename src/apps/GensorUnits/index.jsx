import { useParams } from "react-router-dom";
import Home from "./Home";
import GensorUnitDetails from "./Details";


const PATH_GU = {
  path: "gu",
  element: <GensorUnit/>,
  children: [
    { path: ":guId" }
  ],
};

function GensorUnit() {
    let { guId } = useParams();
    if (guId) {
      return <GensorUnitDetails guId={guId} />;
    }
    return <Home />;
}

export {PATH_GU}