
import { ToasterProvider } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import MDTApp from "./components/MDTApp";
import './index.css';
import { useEffect, useState } from "react";

// FiveM specific NUI message handling
const App = () => {
  const [callsign, setCallsign] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Set up NUI event listener on mount
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'open') {
        // Handle MDT open event
        setIsVisible(true);
        const receivedCallsign = event.data.callsign || '';
        if (receivedCallsign) {
          setCallsign(receivedCallsign);
        }
      } else if (event.data.type === 'close') {
        // Handle MDT close event
        setIsVisible(false);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Function to send NUI messages back to the client script
  const sendNUIMessage = (data: any) => {
    // Use the FiveM fetch API
    fetch(`https://${GetParentResourceName()}/nuiMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  // Function to emit NUI callbacks
  const nuiCallback = (event: string, data: any) => {
    // Use the FiveM fetch API
    fetch(`https://${GetParentResourceName()}/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  // If the MDT is not visible, don't render it (improves performance)
  if (!isVisible) {
    return null;
  }

  return (
    <ToasterProvider>
      <TooltipProvider>
        <Sonner />
        <MDTApp 
          sendNUIMessage={sendNUIMessage}
          nuiCallback={nuiCallback}
          initialCallsign={callsign}
        />
      </TooltipProvider>
    </ToasterProvider>
  );
};

// Helper function to get the resource name in FiveM context
function GetParentResourceName(): string {
  try {
    // @ts-ignore - This function exists in FiveM NUI context
    return window.GetParentResourceName();
  } catch (e) {
    // Fallback for dev environment
    return 'mdt-resource';
  }
}

export default App;
