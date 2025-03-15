
import React from 'react';
import { AlertTriangle, Clipboard, Clock, Database, FileSearch, LogOut, Search, Shield, Users } from 'lucide-react';

type Screen = 
  | 'login'
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
  | 'wanted';

interface NavigationSidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onLogout: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentScreen,
  onScreenChange,
  onLogout
}) => {
  return (
    <div className="mdt-sidebar bg-sidebar/80 backdrop-blur-sm" style={{ width: '200px' }}>
      <div className="text-sm font-bold text-muted-foreground mb-3 flex items-center">
        <Shield className="h-4 w-4 mr-1 text-[hsl(var(--police-blue))]" />
        POLICE SERVICES
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'people' ? 'active' : ''}`}
        onClick={() => onScreenChange('people')}
      >
        <Search className="mdt-sidebar-icon" />
        <span>SEARCH PEOPLE</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'vehicles' ? 'active' : ''}`}
        onClick={() => onScreenChange('vehicles')}
      >
        <Search className="mdt-sidebar-icon" />
        <span>SEARCH VEHICLE</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'history' ? 'active' : ''}`}
        onClick={() => onScreenChange('history')}
      >
        <Clock className="mdt-sidebar-icon" />
        <span>SEARCH HISTORY</span>
      </div>
      
      <div className="mdt-hr my-3"></div>
      
      <div className="text-sm font-bold text-muted-foreground mb-3 mt-2 flex items-center">
        <Clipboard className="h-4 w-4 mr-1 text-[hsl(var(--police-blue))]" />
        RECORDS
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'criminal' ? 'active' : ''}`}
        onClick={() => onScreenChange('criminal')}
      >
        <Clipboard className="mdt-sidebar-icon" />
        <span>CRIM HIST</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'traffic' ? 'active' : ''}`}
        onClick={() => onScreenChange('traffic')}
      >
        <Clipboard className="mdt-sidebar-icon" />
        <span>TRAFFIC OFFENCES</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'reports' ? 'active' : ''}`}
        onClick={() => onScreenChange('reports')}
      >
        <Clipboard className="mdt-sidebar-icon" />
        <span>REPORTS</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'serials' ? 'active' : ''}`}
        onClick={() => onScreenChange('serials')}
      >
        <FileSearch className="mdt-sidebar-icon" />
        <span>SERIALS</span>
      </div>
      
      <div className="mdt-hr my-3"></div>
      
      <div className="text-sm font-bold text-muted-foreground mb-3 mt-2 flex items-center">
        <AlertTriangle className="h-4 w-4 mr-1 text-[hsl(var(--police-blue))]" />
        SYSTEM
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'actions' ? 'active' : ''}`}
        onClick={() => onScreenChange('actions')}
      >
        <AlertTriangle className="mdt-sidebar-icon" />
        <span>ACTIONS</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'financial' ? 'active' : ''}`}
        onClick={() => onScreenChange('financial')}
      >
        <Database className="mdt-sidebar-icon" />
        <span>FIN. RECORDS</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'supervisor' ? 'active' : ''}`}
        onClick={() => onScreenChange('supervisor')}
      >
        <Users className="mdt-sidebar-icon" />
        <span>SUPERVISOR</span>
      </div>
      
      <div 
        className={`nav-item ${currentScreen === 'wanted' ? 'active' : ''}`}
        onClick={() => onScreenChange('wanted')}
      >
        <AlertTriangle className="mdt-sidebar-icon" />
        <span>WANTED</span>
      </div>
      
      <div className="my-2"></div>
      
      <div className="nav-item" onClick={onLogout}>
        <LogOut className="mdt-sidebar-icon" />
        <span>EXIT</span>
      </div>
    </div>
  );
};

export default NavigationSidebar;
