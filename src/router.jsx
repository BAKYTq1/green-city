import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout/Layout";
import About from "./pages/about/About";
import Home from "./pages/home/Home";

export const myrouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,         
        element: <Home/>,
      },
      {
        path: "contacts",
        element: <div>Contacts</div>,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
 {
    path: "*",
    element: <div>404</div>,
  },
]);