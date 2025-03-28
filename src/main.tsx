
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToasterProvider } from './components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToasterProvider>
      <App />
      <SonnerToaster position="top-right" />
    </ToasterProvider>
  </React.StrictMode>,
)
