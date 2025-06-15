import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.scss";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
