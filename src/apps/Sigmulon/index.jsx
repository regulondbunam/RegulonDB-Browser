import React from 'react'
import { useParams } from "react-router-dom";
import Home from './Home'
import Details from './Details';

const PATH_SIGMULON = {
    path: "sigmulon",
    element: <Sigmulon />,
    children: [
      {
        path: ":query",
      },
    ],
  };
  
  
  

function Sigmulon() {
  const {query}  = useParams()
  const regex = /^RDBECOLI.+/;
  if (regex.test(query)) {
    return <Details sigmulonId={query}/>;
  } else {
    return <Home query={query} />;
  }
}

export { PATH_SIGMULON };
