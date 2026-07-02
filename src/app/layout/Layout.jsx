
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../widgets/footer/Footer";
import Intro from "../../widgets/ui/intro/Intro";
import { useLenis } from "../lenis/useLenis";
import PageTransition from "../../widgets/ui/pageTrasition/PageTransition";
import HeaderHome from "../../widgets/header/HeaderHome";
import HeaderDefault from "../../widgets/header/HeaderDefault";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  useLenis();
  const [introDone, setIntroDone] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      <ScrollToTop />
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <PageTransition />
      {isHome ? <HeaderHome /> : <HeaderDefault />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

