
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { OfficerStatus } from '@/types';
import LoginScreen from './LoginScreen';
import MainSidebar from './mdt/MainSidebar';
import NavigationSidebar from './mdt/NavigationSidebar';
import ContentRenderer from './mdt/ContentRenderer';
import MagistrateLogin from './screens/MagistrateLogin';
import MagistrateDashboard from './screens/MagistrateDashboard';

type Screen = 
  | 'login'
  | 'magistrate-login'  // Added this screen type
  | 'magistrate-dashboard'  // Added this screen type
  | 'people'
  | 'vehicles'
  | 'history'
  | 'criminal'
  | 'traffic'
  | 'reports'
  | 'serials'
  | 'actions'
  | 'financial'
  | 'supervisor'
  | 'wanted'
  | 'anpr'
  | 'admin';

// Sample mock data for development/testing
const mockData = {
  warrants: [
    { id: 'w1', name: 'John Smith', status: 'ACTIVE' as const, count: 3 },
    { id: 'w2', name: 'Jane Doe', status: 'ACTIVE' as const, count: 1 },
    { id: 'w3', name: 'Mike Johnson', status: 'ACTIVE' as const, count: 2 }
  ],
  officers: [
    { callsign: 'A-1', pin: '1234', name: 'Officer Smith', updated: '2023-09-01 14:30', status: 'On Patrol', location: 'Downtown', phone: '555-1234' },
    { callsign: 'B-2', pin: '4321', name: 'Officer Jones', updated: '2023-09-01 15:45', status: 'Responding', location: 'Northside', phone: '555-5678' }
  ],
  vehicles: [
    { id: 'v1', plate: 'ABC123', model: 'Sedan', color: 'Black', owner: 'John Smith', registration: 'VALID' as const, flags: { stolen: false, wanted: false } },
    { id: 'v2', plate: 'XYZ789', model: 'SUV', color: 'Red', owner: 'Jane Doe', registration: 'EXPIRED' as const, flags: { stolen: false, wanted: false } }
  ]
};

interface MDTAppProps {
  // These props are optional for development mode
  sendNUIMessage?: (data: any) => void;
  nuiCallback?: (event: string, data: any) => void;
  initialCallsign?: string;
  initialScreen?: 'police' | 'magistrate';
}

const MDTApp: React.FC<MDTAppProps> = ({ 
  sendNUIMessage, 
  nuiCallback, 
  initialCallsign = '',
  initialScreen = 'police'
}) => {
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState(initialCallsign);
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [devMode, setDevMode] = useState(false);
  const [userType, setUserType] = useState<'police' | 'magistrate'>(initialScreen);
  const [magistrateId, setMagistrateId] = useState('');

  // Check if we're in development mode (not in FiveM)
  useEffect(() => {
    const isDevMode = !window.invokeNative;
    setDevMode(isDevMode);
    console.log("Running in " + (isDevMode ? "development" : "FiveM") + " mode");
    
    // Auto-login in dev mode if desired
    if (isDevMode && process.env.NODE_ENV === 'development' && !loggedIn) {
      // Uncomment the following line to auto-login in dev mode
      // handleLogin('DEV-1');
    }
  }, []);

  const handleLogin = (officerCallsign: string) => {
    setCallsign(officerCallsign);
    setLoggedIn(true);
    setCurrentScreen('people');
    setUserType('police');
    
    // Only call NUI callback if not in dev mode and callback exists
    if (!devMode && nuiCallback) {
      nuiCallback('login', { callsign: officerCallsign });
    }
    
    toast({
      title: "Login Successful",
      description: `Welcome Officer ${officerCallsign}`,
    });
  };
  
  const handleMagistrateLogin = (id: string) => {
    setMagistrateId(id);
    setLoggedIn(true);
    setUserType('magistrate');
    
    // Only call NUI callback if not in dev mode and callback exists
    if (!devMode && nuiCallback) {
      nuiCallback('magistrateLogin', { id });
    }
    
    toast({
      title: "Login Successful",
      description: `Welcome Magistrate ${id}`,
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentScreen('login');
    setCallsign('');
    setMagistrateId('');
    
    // Only call NUI callback if not in dev mode and callback exists
    if (!devMode && nuiCallback) {
      nuiCallback('closeApp', {});
    }
    
    toast({
      title: "Logged Out",
      description: `You have been logged out of the ${userType === 'police' ? 'MDT' : 'Magistrate Portal'}`,
    });
  };

  const handleChangeStatus = (status: OfficerStatus) => {
    setCurrentStatus(status);
    
    // Only call NUI callback if not in dev mode and callback exists
    if (!devMode && nuiCallback) {
      nuiCallback('changeStatus', { status });
    }
    
    toast({
      title: "Status Updated",
      description: `Status set to: ${status}`,
    });
  };

  const handleFlagStolen = () => {
    // Only call NUI callback if not in dev mode and callback exists
    if (!devMode && nuiCallback) {
      nuiCallback('flagStolen', {});
    }
    
    toast({
      title: "Vehicle Flagged",
      description: "Police unit has been flagged as stolen",
      variant: "destructive",
    });
  };

  const handleDuress = () => {
    // Only call NUI callback if not in dev mode and callback exists
    if (!devMode && nuiCallback) {
      nuiCallback('duress', {});
    }
    
    toast({
      title: "DURESS ALERT ACTIVATED",
      description: "All available units have been notified of your location",
      variant: "destructive",
    });
  };

  const switchToMagistrateLogin = () => {
    setLoggedIn(false);
    setCurrentScreen('magistrate-login');
    setUserType('magistrate');
  };

  const switchToPoliceLogin = () => {
    setLoggedIn(false);
    setCurrentScreen('login');
    setUserType('police');
  };

  if (!loggedIn) {
    if (currentScreen === 'magistrate-login') {
      return (
        <div className="mdt-container">
          <MagistrateLogin onLogin={handleMagistrateLogin} onSwitchToPolice={switchToPoliceLogin} />
          <div className="screen-overlay"></div>
          {devMode && (
            <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
              Dev Mode Active
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="mdt-container">
        <LoginScreen onLogin={handleLogin} onSwitchToMagistrate={switchToMagistrateLogin} />
        <div className="screen-overlay"></div>
        {devMode && (
          <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
            Dev Mode Active
          </div>
        )}
      </div>
    );
  }

  // Render the Magistrate Dashboard if logged in as magistrate
  if (userType === 'magistrate') {
    return (
      <div className="mdt-container">
        <MagistrateDashboard 
          magistrateId={magistrateId}
          onLogout={handleLogout}
        />
        <div className="screen-overlay"></div>
        {devMode && (
          <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
            Dev Mode Active - Magistrate {magistrateId}
          </div>
        )}
      </div>
    );
  }

  // Render police MDT
  return (
    <div className="mdt-container">
      <div className="mdt-main">
        <MainSidebar 
          callsign={callsign}
          currentStatus={currentStatus}
          onStatusChange={handleChangeStatus}
          onDuress={handleDuress}
          onFlagStolen={handleFlagStolen}
          onLogout={handleLogout}
        />
        
        <NavigationSidebar 
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
        />
        
        <div className="mdt-content">
          <ContentRenderer 
            currentScreen={currentScreen} 
            mockData={devMode ? mockData : undefined} 
          />
        </div>
      </div>
      <div className="screen-overlay"></div>
      {devMode && (
        <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
          Dev Mode Active - {callsign}
        </div>
      )}
    </div>
  );
};

export default MDTApp;
