import 'react'
import AboutCompany from '../../widgets/aboutcompany/AboutCompany'
// import FloorPlan3D from '../../widgets/Floorplan3d ·/Floorplan3d'
import Objects from '../../widgets/objects/Objects'
import Stats from '../../widgets/stats/Stats'
import Panarama360 from '../../widgets/panorama360/Panorama360'
import Reviews from '../../widgets/reviews/Reviews'

function Home() {
  return (
    <>
      <AboutCompany />
      {/* <FloorPlan3D/> */}
      <Objects />
      <Stats/>
      <Panarama360 />
      <Reviews />
    </>
  )
}

export default Home
