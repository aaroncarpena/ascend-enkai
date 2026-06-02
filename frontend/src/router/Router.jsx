import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/pages/session/Login.jsx'
import SportCenters from '../components/pages/sportCenters/SportCenters.jsx'
import SportsPage from '../components/pages/sports/SportsPage.jsx'
import Booking from '../components/pages/booking/Booking.jsx'
import HomePage from '../components/pages/homePage/HomePage.jsx'
import Error from '../components/pages/error/Error.jsx'
import SignUp from '../components/pages/session/SignUp.jsx'

const Router = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path='/registro' element={<SignUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path="/instalaciones" element={<SportCenters/>} />
        <Route path="/deportes" element={<SportsPage />}/>
        <Route path="/reservas" element={<Booking />} />
        <Route path='/*' element={<Error />} />
    </Routes>
  )
}

export default Router
