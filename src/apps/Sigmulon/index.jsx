import React from 'react'
import { useParams } from "react-router-dom";
import Home from './Home'

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
    return <>Sigmulon</>;
  } else {
    return <Home query={query} />;
  }
}

export { PATH_SIGMULON };
