import { createBrowserRouter } from "react-router-dom";
import Layout from "./app/Layout/Layout";
// import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import News from "./pages/news/News";
import Apartments from "./pages/Apartments/Apartments";
import ObjectDetail from "./pages/Apartments/ObjectDetail/ObjectDetail";
import AboutCompany from "./pages/about/About";
import Reviews from "./pages/reviews/Reviews";
import ReviewDetail from "./pages/reviewsdetail/ReviewsDetail";
import NewsDetail from "./widgets/newsdetail/NewsDetail";

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
        element: <AboutCompany/>,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news/:id",
        element: <NewsDetail/>,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "reviews/:id",
        element: <ReviewDetail />,
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
    element: <div style={{minHeight:'100vh'}}>404</div>,
  },
]);
