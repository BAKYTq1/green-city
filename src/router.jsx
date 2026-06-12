import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout/Layout";
import About from "./pages/about/About";
import AboutCompany from "./widgets/aboutcompany/AboutCompany";

export const myrouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,          // <- вот здесь
        element: <AboutCompany/>,
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