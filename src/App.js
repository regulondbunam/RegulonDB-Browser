import Layout from "ui-components/Layout";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    <RouterProvider router={router} />
  );
}

export default App;
