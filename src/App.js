import Layout from "ui-components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { THEME } from "ui-components/Theme";

//routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: []
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
