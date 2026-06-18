import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout/Layout";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import News from "./pages/news/News";
import Apartments from "./pages/Apartments/Apartments";
import ObjectDetail from "./pages/Apartments/ObjectDetail/ObjectDetail";

export const myrouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contacts",
        element: <Contact/>,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "/objects",
        element: <Apartments />,
      },
      {
        path: "/objects/:slug",
        element: <ObjectDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
