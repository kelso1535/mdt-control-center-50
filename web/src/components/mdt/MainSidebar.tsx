
import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, Flag, LogOut, Shield, X } from 'lucide-react';
import { OfficerStatus } from '@/types';
import MDTLogo from '../MDTLogo';
import StatusMenu from './StatusMenu';

interface SidebarButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'blue' | 'alert';
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  icon, 
  children, 
  onClick, 
  variant = 'default' 
}) => {
  const baseClasses = "flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm w-full transition-colors";
  
  const variantClasses = {
    default: "bg-gray-800/50 text-gray-200 hover:bg-gray-700/50",
    blue: "bg-blue-900/20 text-blue-400 hover:bg-blue-800/30 border border-blue-800/40",
    alert: "bg-red-900/20 text-red-400 hover:bg-red-800/30 border border-red-800/40 animate-pulse"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      <span className="flex-1">{children}</span>
      <span className="w-5 h-5 ml-2 flex-shrink-0">
        {icon}
      </span>
    </button>
  );
};

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
    <div className="mdt-sidebar bg-gray-900/90 backdrop-blur-sm flex flex-col w-64 p-4">
      <div className="mdt-logo flex justify-center">
        <MDTLogo />
      </div>
      
      <div className="flex-1"></div>
      
      <div className="mt-2 mb-3 space-y-2">
        <div className="relative mb-2">
          <SidebarButton 
            icon={<ChevronDown className="w-full h-full" />}
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            variant="blue"
          >
            Change Status
          </SidebarButton>
          
          {showStatusMenu && (
            <StatusMenu 
              isOpen={showStatusMenu} 
              onSelect={handleChangeStatus} 
            />
          )}
        </div>
        
        <SidebarButton 
          icon={<AlertTriangle className="w-full h-full" />}
          variant="alert"
          onClick={onDuress}
        >
          [- DURESS -]
        </SidebarButton>
        
        <SidebarButton 
          icon={<Flag className="w-full h-full" />}
          onClick={onFlagStolen}
        >
          Flag Police Unit Stolen
        </SidebarButton>
        
        <SidebarButton 
          icon={<LogOut className="w-full h-full" />}
          onClick={onLogout}
        >
          Logout of MDT
        </SidebarButton>
        
        <SidebarButton 
          icon={<X className="w-full h-full" />}
          onClick={onLogout}
        >
          Exit
        </SidebarButton>
      </div>
      
      <div className="flex flex-col items-center p-2 mb-2 bg-blue-500/10 rounded-md border border-blue-500/20">
        <Shield className="h-4 w-4 text-blue-500 mb-1" />
        <div className="text-xs">
          <span className="text-gray-400">Officer:</span> <span className="text-blue-400 font-bold">{callsign}</span>
        </div>
        <div className="text-xs mt-1">
          <span className="text-gray-400">Status:</span> <span className="text-blue-400">{currentStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
