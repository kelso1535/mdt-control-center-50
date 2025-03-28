
import React, { useState } from 'react';
import MainSidebar from './mdt/MainSidebar';
import NavigationSidebar from './mdt/NavigationSidebar';
import CustomContentRenderer from './mdt/CustomContentRenderer';
import StatusMenu from './mdt/StatusMenu';
import { OfficerStatus } from '@/types';

const CustomMDTApp: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>('');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const callsign = 'UNIT-1'; // Default callsign

  const handleStatusChange = (status: OfficerStatus) => {
    setCurrentStatus(status);
    setIsStatusMenuOpen(false);
  };

  const handleDuress = () => {
    // Placeholder for duress functionality
    console.log("Duress activated");
  };

  const handleFlagStolen = () => {
    // Placeholder for flag stolen functionality
    console.log("Flag stolen activated");
  };

  const handleLogout = () => {
    // Placeholder for logout functionality
    console.log("Logout requested");
  };

  return (
    <div className="flex h-full">
      <MainSidebar 
        callsign={callsign}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        onDuress={handleDuress}
        onFlagStolen={handleFlagStolen}
        onLogout={handleLogout}
      />
      <NavigationSidebar 
        currentScreen={activeContent as any}
        onScreenChange={setActiveContent as any}
        onLogout={handleLogout}
      />
      <CustomContentRenderer activeContent={activeContent} />
      <StatusMenu 
        isOpen={isStatusMenuOpen} 
        onSelect={handleStatusChange}
      />
    </div>
  );
};

export default CustomMDTApp;
