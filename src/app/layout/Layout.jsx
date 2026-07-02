
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../widgets/footer/Footer";
import { useLenis } from "../lenis/useLenis";
import PageTransition from "../../widgets/ui/pageTrasition/PageTransition";
import HeaderHome from "../../widgets/header/HeaderHome";
import HeaderDefault from "../../widgets/header/HeaderDefault";
import ScrollToTop from "./ScrollToTop";
import { TransitionProvider } from "../transition/TransitionContext";

export default function Layout() {
  useLenis();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
   <TransitionProvider>
      <ScrollToTop />
      <PageTransition />
      {isHome ? <HeaderHome /> : <HeaderDefault />}
      <main><Outlet /></main>
      <Footer />
    </TransitionProvider>
  );
}

