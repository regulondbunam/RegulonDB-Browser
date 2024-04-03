import Layout from "ui-components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { THEME } from "ui-components/Theme";
import Home from "apps/Home";

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
    ]
  }
])

function App() {
  return (
    <ThemeProvider theme={THEME}>
        <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
