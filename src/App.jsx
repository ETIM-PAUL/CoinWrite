import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/landing.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import Collection from './pages/collection.jsx'
import ForYou from './pages/foryou.jsx'
import MyWallet from './pages/my_wallet.jsx'
import Settings from './pages/settings.jsx'
import BlogDetails from './pages/blog_details.jsx'
import PublishPost from './pages/publish_post.jsx'

function App() {
  return (
    <Router>
      <div className=''>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/my-wallet" element={<MyWallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/blog_details/:id" element={<BlogDetails />} />
          <Route path="/publish_post" element={<PublishPost />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
