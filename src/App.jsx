import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/home.jsx'
import { ArrowRightIcon } from 'lucide-react'

function App() {


  return (
    <Router>
      <div className='px-8'>
      <header className="flex items-center justify-between py-6">
        <div className='flex items-center space-x-10'>
          <h1 className="text-xl font-bold text-[#9e74eb]">Coinwrite</h1>
          <nav className="space-x-6 text-sm text-gray-700">
            <a href="#categories" className="hover:text-black">Categories</a>
            <a href="#explore" className="hover:text-black">Explore</a>
            <a href="#plans" className="hover:text-black">Plans</a>
          </nav>
        </div>

        <div>
          <button className="text-sm cursor-pointer bg-gradient-to-r from-[#9e74eb] to-[#c6b9ef] hover:opacity-90 text-white px-6 py-3 rounded-xl inline-flex items-center transition duration-300 shadow-md">
            Launch App
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
