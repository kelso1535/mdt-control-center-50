
import React, { useEffect, useState } from 'react';
import MDTApp from './components/MDTApp';

function App() {
  const [visible, setVisible] = useState(true);
  const [officerData, setOfficerData] = useState(null);

  // Handle NUI messages
  useEffect(() => {
    // On mount, check if we're in FiveM by attempting to access window.invokeNative
    const isFiveM = window.invokeNative !== undefined;
    console.log(`Running in ${isFiveM ? 'FiveM' : 'browser'} environment`);

    // If in FiveM, initially hide the UI until told to show
    if (isFiveM) {
      document.body.style.display = 'none';
    }

    // Set up message listener
    const handleMessage = (event: MessageEvent) => {
      console.log('NUI message received:', event.data);
      
      if (event.data.type === 'open') {
        setVisible(true);
        document.body.style.display = 'block';
        if (event.data.data) {
          setOfficerData(event.data.data);
        }
      } else if (event.data.type === 'close') {
        setVisible(false);
        document.body.style.display = 'none';
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Send ready message
    if (isFiveM) {
      // @ts-ignore - FiveM specific
      fetch('https://mdt/nui:ready', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ready: true })
      }).catch(e => console.error('Failed to send ready event:', e));
    }

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Create functions for development environment
  const sendNUIMessage = (data: any) => {
    console.log('Sending NUI message:', data);
    // In FiveM this would be handled by the game
    if (window.invokeNative === undefined) {
      console.log('Mock Send NUI Message:', data);
    }
  };

  const nuiCallback = (event: string, data: any) => {
    console.log('Executing NUI callback:', event, data);
    // In FiveM this would make a callback to the Lua side
    // @ts-ignore - FiveM specific
    if (window.invokeNative === undefined) {
      console.log('Mock NUI Callback:', event, data);
      return Promise.resolve({});
    } else {
      // @ts-ignore - FiveM specific
      return fetch(`https://mdt/${event}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(resp => resp.json());
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-transparent flex items-center justify-center p-4">
      <MDTApp 
        sendNUIMessage={sendNUIMessage} 
        nuiCallback={nuiCallback}
        initialCallsign={officerData?.callsign || ''} 
      />
    </div>
  );
}

export default App;
