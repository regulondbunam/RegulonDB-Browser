import Layout from "ui-components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "urql";
import { URQL_CLIENT } from "webServices";
import { ThemeProvider } from '@mui/material/styles';
import { THEME } from "ui-components/Theme";
import Home from "apps/Home";
import {PATH_SEARCH} from "apps/Search";

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
      PATH_SEARCH
    ]
  }
])

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Provider value={URQL_CLIENT} >
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
