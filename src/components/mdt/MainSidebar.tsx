
import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, Flag, LogOut, Shield, X } from 'lucide-react';
import { OfficerStatus } from '@/types';
import MDTLogo from '../MDTLogo';
import SidebarButton from '../SidebarButton';
import StatusMenu from './StatusMenu';

interface MainSidebarProps {
  callsign: string;
  currentStatus: OfficerStatus;
  onStatusChange: (status: OfficerStatus) => void;
  onDuress: () => void;
  onFlagStolen: () => void;
  onLogout: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  callsign,
  currentStatus,
  onStatusChange,
  onDuress,
  onFlagStolen,
  onLogout
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  
  const handleChangeStatus = (status: OfficerStatus) => {
    onStatusChange(status);
    setShowStatusMenu(false);
  };

  return (
    <div className="mdt-sidebar bg-sidebar/90 backdrop-blur-sm flex flex-col">
      <div className="mdt-logo flex justify-center">
        <MDTLogo />
      </div>
      
      <div className="flex-1"></div>
      
      <div className="mt-2 mb-3">
        <div className="relative mb-2">
          <SidebarButton 
            icon={<ChevronDown className="w-full h-full" />}
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            variant="blue"
          >
            Change Status
          </SidebarButton>
          
          <StatusMenu 
            isOpen={showStatusMenu} 
            onSelect={handleChangeStatus} 
          />
        </div>
        
        <SidebarButton 
          icon={<AlertTriangle className="w-full h-full" />}
          variant="alert"
          onClick={onDuress}
        >
          [- DURESS -]
        </SidebarButton>
        
        <div className="my-1"></div>
        
        <SidebarButton 
          icon={<Flag className="w-full h-full" />}
          onClick={onFlagStolen}
        >
          Flag Police Unit Stolen
        </SidebarButton>
        
        <div className="my-1"></div>
        
        <SidebarButton 
          icon={<LogOut className="w-full h-full" />}
          onClick={onLogout}
        >
          Logout of MDT
        </SidebarButton>
        
        <div className="my-1"></div>
        
        <SidebarButton 
          icon={<X className="w-full h-full" />}
          onClick={onLogout}
        >
          Exit
        </SidebarButton>
      </div>
      
      <div className="flex flex-col items-center p-2 mb-2 bg-[hsl(var(--police-blue))]/10 rounded-md border border-[hsl(var(--police-blue))]/20">
        <Shield className="h-4 w-4 text-[hsl(var(--police-blue))] mb-1" />
        <div className="text-xs">
          <span className="text-muted-foreground">Officer:</span> <span className="text-[hsl(var(--police-blue))] font-bold">{callsign}</span>
        </div>
        <div className="text-xs mt-1">
          <span className="text-muted-foreground">Status:</span> <span className="text-[hsl(var(--police-blue))]">{currentStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
