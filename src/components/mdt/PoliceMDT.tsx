
import React from 'react';
import { OfficerStatus } from '@/types';
import MainSidebar from './MainSidebar';
import NavigationSidebar from './NavigationSidebar';
import ContentRenderer from './ContentRenderer';
import { MDTScreenType } from '../MDTApp';

interface PoliceMDTProps {
  callsign: string;
  currentStatus: OfficerStatus;
  currentScreen: MDTScreenType;
  devMode?: boolean;
  onStatusChange: (status: OfficerStatus) => void;
  onDuress: () => void;
  onFlagStolen: () => void;
  onLogout: () => void;
  onScreenChange: (screen: MDTScreenType) => void;
  mockData?: {
    warrants?: any[];
    officers?: any[];
    vehicles?: any[];
    [key: string]: any;
  };
}

const PoliceMDT: React.FC<PoliceMDTProps> = ({
  callsign,
  currentStatus,
  currentScreen,
  devMode = false,
  onStatusChange,
  onDuress,
  onFlagStolen,
  onLogout,
  onScreenChange,
  mockData
}) => {
  return (
    <div className="mdt-container">
      <div className="mdt-main">
        <MainSidebar 
          callsign={callsign}
          currentStatus={currentStatus}
          onStatusChange={onStatusChange}
          onDuress={onDuress}
          onFlagStolen={onFlagStolen}
          onLogout={onLogout}
        />
        
        <NavigationSidebar 
          currentScreen={currentScreen}
          onScreenChange={onScreenChange}
          onLogout={onLogout}
        />
        
        <div className="mdt-content">
          <ContentRenderer 
            currentScreen={currentScreen} 
            mockData={mockData} 
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

export default PoliceMDT;
