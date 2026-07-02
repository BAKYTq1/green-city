import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../widgets/footer/Footer";
import { useLenis } from "../lenis/useLenis";
import PageTransition from "../../widgets/ui/pageTrasition/PageTransition";
import HeaderHome from "../../widgets/header/HeaderHome";
import HeaderDefault from "../../widgets/header/HeaderDefault";
import ScrollToTop from "./ScrollToTop";
import { TransitionProvider } from "../transition/TransitionContext";

// Пути, на которых нужен "домашний" (прозрачный) хедер
const HOME_HEADER_ROUTES = ["/", "/about"];

export default function Layout() {
  useLenis();
  const { pathname } = useLocation();
  const isHomeHeader = HOME_HEADER_ROUTES.includes(pathname);

  return (
   <TransitionProvider>
      <ScrollToTop />
      <PageTransition />
      {isHomeHeader ? <HeaderHome /> : <HeaderDefault />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </TransitionProvider>
  );
}