import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/pages/session/Login.jsx'
import SportCenters from '../components/pages/sportCenters/SportCenters.jsx'
import SportsPage from '../components/pages/sports/SportsPage.jsx'
import HomePage from '../components/pages/homePage/HomePage.jsx'
import Error from '../components/pages/error/Error.jsx'
import SignUp from '../components/pages/session/SignUp.jsx'
import MatchPage from '../components/pages/match/MatchPage.jsx'
import ProfilePage from '../components/pages/profile/ProfilePage.jsx'
import SportCenterMatchesPage from '../components/pages/sportCenters/SportCenterMatchesPage.jsx'

const Router = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path='/registro' element={<SignUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path="/instalaciones" element={<SportCenters/>} />
        <Route path="/instalacion/:sportCenterId" element={<SportCenterMatchesPage />} />
        <Route path="/deportes" element={<SportsPage />}/>
        <Route path="/deportes/:sportId" element={<MatchPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path='/*' element={<Error />} />
    </Routes>
  )
}

export default Router
