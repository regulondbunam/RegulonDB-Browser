import { useParams } from "react-router-dom";
import Home from "./Home";
import GensorUnitDetails from "./Details";
import { ScrollRestoration } from "react-router-dom";


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
      return (
        <>
        <ScrollRestoration />
        <GensorUnitDetails guId={guId} />
        </>
      );
    }
    return <Home />;
}

export {PATH_GU}