import 'react'
import AboutCompany from '../../widgets/aboutcompany/AboutCompany'
// import FloorPlan3D from '../../widgets/Floorplan3d ·/Floorplan3d'
import Stats from '../../widgets/stats/Stats'
import Panarama360 from '../../widgets/panorama360/Panorama360'
import Reviews from '../../widgets/reviews/Reviews'
import Obratnyi from '../../widgets/ui/ibratka/Obratnyi'
import News from '../news/News'
import Apartments from '../Apartments/Apartments'

function Home() {
  return (
    <>
      <AboutCompany />
      {/* <FloorPlan3D/> */}
      <Apartments />
      <Stats/>
      <Reviews />
      <Panarama360 />
      <News />
      <Obratnyi />
    </>
  )
}

export default Home
