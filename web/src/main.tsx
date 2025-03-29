
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from './components/ui/toaster'
import { Toaster as SonnerToaster } from 'sonner'

// Debug logger function
const debugLog = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  if (data) {
    console.log(`[${timestamp}] MDT: ${message}`, data);
  } else {
    console.log(`[${timestamp}] MDT: ${message}`);
  }
};

// Initialize NUI message handling
window.addEventListener('message', function(event) {
  debugLog('Received NUI message', event.data);
  
  // Handle different message types
  if (event.data.type === 'open') {
    debugLog('Opening MDT from game event', event.data);
    // Here you could dispatch an action or change app state
    // Example: Store the officer data in state or localStorage
    if (event.data.data) {
      localStorage.setItem('mdtOfficerData', JSON.stringify(event.data.data));
    }
    // Show the MDT
    document.body.style.display = 'block';
  } else if (event.data.type === 'close') {
    debugLog('Closing MDT from game event');
    // Hide the MDT
    document.body.style.display = 'none';
  }
});

// Add fetch wrapper for NUI callbacks
// @ts-ignore - Needed for FiveM compatibility
window.nuiCallback = function(name: string, data: any) {
  debugLog(`Sending NUI callback: ${name}`, data);
  // @ts-ignore - FiveM specific
  return fetch(`https://mdt/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .catch(error => {
    console.error('Error in NUI callback:', error);
    return { error: true, message: error.toString() };
  });
};

// Log initialization
debugLog('Initializing MDT web interface');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <SonnerToaster position="top-right" />
  </React.StrictMode>,
);

// Log when loaded
debugLog('MDT web interface loaded');
