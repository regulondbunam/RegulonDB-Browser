import React from 'react'

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
  return (
    <div>Sigmulon</div>
  )
}

export { PATH_SIGMULON };
