import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'
import LandingPage from './pages/landing.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'

function App() {
  return (
    <Router>
      <div className=''>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
