
import React, { useState } from 'react';
import { MainSidebar } from './mdt/MainSidebar';
import { NavigationSidebar } from './mdt/NavigationSidebar';
import CustomContentRenderer from './mdt/CustomContentRenderer';
import { StatusMenu } from './mdt/StatusMenu';

const CustomMDTApp: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>('');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState<boolean>(false);

  return (
    <div className="flex h-full">
      <MainSidebar setActiveContent={setActiveContent} />
      <NavigationSidebar 
        activeContent={activeContent} 
        setActiveContent={setActiveContent} 
        openStatusMenu={() => setIsStatusMenuOpen(true)}
      />
      <CustomContentRenderer activeContent={activeContent} />
      <StatusMenu isOpen={isStatusMenuOpen} onClose={() => setIsStatusMenuOpen(false)} />
    </div>
  );
};

export default CustomMDTApp;
