
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'

// Ensure NUI message handling is set up for FiveM
window.addEventListener('message', function(event) {
  // Handle FiveM NUI messages
  if (event.data.type === 'openMDT') {
    // MDT was opened from the game
    console.log('MDT opened from FiveM');
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <Toaster />
      <SonnerToaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>,
)
