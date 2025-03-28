
import React, { useState } from 'react';
import MainSidebar from './mdt/MainSidebar';
import CustomNavigationSidebar from './mdt/CustomNavigationSidebar';
import CustomContentRenderer from './mdt/CustomContentRenderer';
import StatusMenu from './mdt/StatusMenu';

interface CustomMDTAppProps {
  callsign?: string;
}

const CustomMDTApp: React.FC<CustomMDTAppProps> = ({ callsign = 'Unknown' }) => {
  const [activeContent, setActiveContent] = useState<string>('');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>('Code 1 On Patrol');

  return (
    <div className="flex h-full">
      <MainSidebar 
        setActiveContent={setActiveContent}
        callsign={callsign}
        currentStatus={currentStatus}
      />
      <CustomNavigationSidebar 
        activeContent={activeContent} 
        setActiveContent={setActiveContent} 
        openStatusMenu={() => setIsStatusMenuOpen(true)}
        callsign={callsign}
      />
      <CustomContentRenderer activeContent={activeContent} />
      <StatusMenu 
        isOpen={isStatusMenuOpen} 
        onClose={() => setIsStatusMenuOpen(false)} 
        onSelect={(status) => setCurrentStatus(status)}
      />
    </div>
  );
};

export default CustomMDTApp;
