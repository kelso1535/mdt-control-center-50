
import React from 'react';
import MDTApp from './components/MDTApp';

function App() {
  // Create mock functions for development environment
  const mockSendNUIMessage = (data: any) => {
    console.log('Mock Send NUI Message:', data);
  };

  const mockNuiCallback = (event: string, data: any) => {
    console.log('Mock NUI Callback:', event, data);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-transparent flex items-center justify-center p-4">
      <MDTApp 
        sendNUIMessage={mockSendNUIMessage} 
        nuiCallback={mockNuiCallback} 
      />
    </div>
  );
}

export default App;
