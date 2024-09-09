import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Navbar from './components/Navbar'
import SideNav from './components/SideNav'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

const HomePage = lazy(() => import('./pages/HomePage'));
const VirtualWaterPage = lazy(() => import('./pages/VirtualWaterPage'));




const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <div className='dashboard_container_main'>
        <SideNav />

        <Suspense fallback={<Preloader />}>
 
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/plot' element={<VirtualWaterPage />} />
            {/* <Route path='/water-matrix' element={<VirtualWaterPage />} /> */}
          </Routes>
          </Suspense>
    

        </div>

        {/* <Footer/> */}

      </Router>

    </div>
  )
}

export default App
