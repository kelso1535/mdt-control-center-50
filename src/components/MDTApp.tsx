
import React from 'react';
import { MDTProvider, useMDT } from '@/contexts/MDTContext';
import MDTLoginContainer from './mdt/MDTLoginContainer';
import MDTContainer from './mdt/MDTContainer';

// Define Screen type for the MDT app
export type MDTScreenType = 
  | 'login'
  | 'magistrate-login'
  | 'magistrate-dashboard'
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
  | 'court'
  | 'admin';

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
  return (
    <MDTProvider 
      sendNUIMessage={sendNUIMessage} 
      nuiCallback={nuiCallback} 
      initialCallsign={initialCallsign} 
      initialScreen={initialScreen}
    >
      <MDTAppContent />
    </MDTProvider>
  );
};

const MDTAppContent: React.FC = () => {
  const { loggedIn } = useMDT();
  return loggedIn ? <MDTContainer /> : <MDTLoginContainer />;
};

export default MDTApp;
