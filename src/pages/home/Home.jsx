import 'react'
import AboutCompany from '../../widgets/aboutcompany/AboutCompany'
// import FloorPlan3D from '../../widgets/Floorplan3d ·/Floorplan3d'
import Stats from '../../widgets/stats/Stats'
import Panarama360 from '../../widgets/panorama360/Panorama360'
import Reviews from '../../widgets/reviews/Reviews'
import Obratnyi from '../../widgets/ui/ibratka/Obratnyi'
import ApartmentsHome from '../apartmentsHome/ApartmentsHome'
import NewsHome from '../news/NewsHome'

function Home() {
  return (
    <>
      <AboutCompany />
      {/* <FloorPlan3D/> */}
      <ApartmentsHome />
      <Stats/>
      <Reviews />
      <Panarama360 />
      <NewsHome />
      <Obratnyi />
    </>
  )
}

export default Home
