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
