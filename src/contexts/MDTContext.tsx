
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { OfficerStatus } from '@/types';
import { MDTScreenType } from '@/components/MDTApp';
import { useToast } from '@/hooks/use-toast';

interface MDTContextType {
  loggedIn: boolean;
  callsign: string;
  currentStatus: OfficerStatus;
  currentScreen: MDTScreenType;
  devMode: boolean;
  userType: 'police' | 'magistrate';
  magistrateId: string;
  setLoggedIn: (value: boolean) => void;
  setCallsign: (value: string) => void;
  setCurrentStatus: (value: OfficerStatus) => void;
  setCurrentScreen: (value: MDTScreenType) => void;
  setDevMode: (value: boolean) => void;
  setUserType: (value: 'police' | 'magistrate') => void;
  setMagistrateId: (value: string) => void;
  handleLogin: (callsign: string) => void;
  handleMagistrateLogin: (id: string) => void;
  handleLogout: () => void;
  handleChangeStatus: (status: OfficerStatus) => void;
  handleFlagStolen: () => void;
  handleDuress: () => void;
  switchToMagistrateLogin: () => void;
  switchToPoliceLogin: () => void;
}

const MDTContext = createContext<MDTContextType | undefined>(undefined);

export function MDTProvider({
  children,
  sendNUIMessage,
  nuiCallback,
  initialCallsign = '',
  initialScreen = 'police'
}: {
  children: ReactNode;
  sendNUIMessage?: (data: any) => void;
  nuiCallback?: (event: string, data: any) => void;
  initialCallsign?: string;
  initialScreen?: 'police' | 'magistrate';
}) {
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState(initialCallsign);
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const [currentScreen, setCurrentScreen] = useState<MDTScreenType>('login');
  const [devMode, setDevMode] = useState(false);
  const [userType, setUserType] = useState<'police' | 'magistrate'>(initialScreen);
  const [magistrateId, setMagistrateId] = useState('');

  // Replicated from MDTApp
  React.useEffect(() => {
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

  const value = {
    loggedIn,
    callsign,
    currentStatus,
    currentScreen,
    devMode,
    userType,
    magistrateId,
    setLoggedIn,
    setCallsign,
    setCurrentStatus,
    setCurrentScreen,
    setDevMode,
    setUserType,
    setMagistrateId,
    handleLogin,
    handleMagistrateLogin,
    handleLogout,
    handleChangeStatus,
    handleFlagStolen,
    handleDuress,
    switchToMagistrateLogin,
    switchToPoliceLogin,
  };

  return <MDTContext.Provider value={value}>{children}</MDTContext.Provider>;
}

export function useMDT() {
  const context = useContext(MDTContext);
  if (context === undefined) {
    throw new Error('useMDT must be used within a MDTProvider');
  }
  return context;
}
