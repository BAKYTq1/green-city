import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { myrouter } from '../router.jsx'
function App() {
  return (
    <>
    <RouterProvider router={myrouter}/>
  
    </>
      
  )
}

export default App
