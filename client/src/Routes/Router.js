import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ContactUs from '../pages/ContactUs'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Goal from '../pages/Goals'
import Performance from '../pages/Performance'
import ProblemList from '../pages/ProblemList'
import Recommendation from '../pages/Recommendations'
import ProtectedRoute from './ProtectedRoute'

const Router = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/contact' element={<ContactUs/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/*' element={<NotFound/>}/>
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/goals" element={<Goal/>} />
                <Route path="/performance" element={<Performance/>} />
                <Route path="/problems" element={<ProblemList/>} />
                <Route path="/recommendations" element={<Recommendation/>} />
            </Routes>
            <Footer/>
        </>
      )
}

export default Router
