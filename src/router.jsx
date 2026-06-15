import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout/Layout";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";

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
        element: <Contact/>,
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