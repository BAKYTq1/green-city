import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../widgets/header/Header'
import Footer from '../../widgets/footer/Footer'
import Intro from '../../widgets/ui/intro/Intro'
import { useLenis } from '../lenis/useLenis'
import PageTransition from '../../widgets/ui/pageTrasition/PageTransition'

export default function Layout() {
  useLenis()
  const [introDone, setIntroDone] = useState(false)

  // Сбрасываем интро при каждом переходе
  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
        <PageTransition />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}