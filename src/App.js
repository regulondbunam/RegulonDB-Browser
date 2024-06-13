import Layout from "ui-components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {  ApolloProvider } from '@apollo/client';
import { CLIENT } from "webServices";
import { ThemeProvider } from '@mui/material/styles';
import { THEME } from "ui-components/Theme";
import Home from "apps/Home";
import {PATH_SEARCH} from "apps/Search";
import { PATH_GENE } from "apps/Gene";
import { PATH_DTT } from "apps/DrawingTracesTool";
import { PATH_GU } from "apps/GensorUnits";
//old apps
import Manual from './old_apps/manual';
import Coexpression from "./old_apps/coexpression"
//import GensorUnit from "./old_apps/gensorUnit"



//routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <p>No site</p>,
      },
      {
        index: true,
        element: <Home />,
      },
      PATH_SEARCH,
      PATH_GENE,
      PATH_DTT,
      PATH_GU,
      //old
      {
        path: "manual",
        element: <Manual />,
        children: [
          {
            path: ":site",
            children: [
              {
                path: ":section",
              }
            ]
          }
        ]
      },
      {
        path: "/coexpression",
        element: <Coexpression />,
        children:[
          {path: ":genesId"}
        ]
      },


    ]
  }
])

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <ApolloProvider client={CLIENT} >
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
