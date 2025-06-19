import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.scss";
import './index.css'
import App from './App.jsx'
import { PostsProvider } from './context/PostsContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <PostsProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PostsProvider>
  </StrictMode>,
)
