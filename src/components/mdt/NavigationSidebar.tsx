
import React from 'react';
import { AlertTriangle, Clipboard, Clock, Database, FileSearch, LogOut, Search, Settings, Shield, Users, Radio } from 'lucide-react';

interface NavigationSidebarProps {
  currentScreen?: string;
  activeContent?: string;
  onScreenChange?: (screen: any) => void;
  onLogout?: () => void;
  setActiveContent?: (content: string) => void;
  openStatusMenu?: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentScreen,
  activeContent,
  onScreenChange,
  onLogout,
  setActiveContent,
  openStatusMenu
}) => {
  // Use the appropriate prop based on what's available
  const handleScreenChange = (screen: any) => {
    if (onScreenChange) {
      onScreenChange(screen);
    } else if (setActiveContent) {
      setActiveContent(screen);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return <div className="mdt-sidebar bg-sidebar/80 backdrop-blur-sm" style={{
    width: '210px'
  }}>
      <div className="text-sm font-bold text-muted-foreground mb-2 flex items-center">
        <Shield className="h-4 w-4 mr-1 text-[hsl(var(--police-blue))]" />
        POLICE DEPARTMENT
      </div>
      
      <div className={`nav-item ${(currentScreen === 'people' || activeContent === 'people') ? 'active' : ''}`} onClick={() => handleScreenChange('people')}>
        <Search className="mdt-sidebar-icon" />
        <span>SEARCH PEOPLE</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'vehicles' || activeContent === 'vehicles') ? 'active' : ''}`} onClick={() => handleScreenChange('vehicles')}>
        <Search className="mdt-sidebar-icon" />
        <span>SEARCH VEHICLE</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'serials' || activeContent === 'serials') ? 'active' : ''}`} onClick={() => handleScreenChange('serials')}>
        <Search className="mdt-sidebar-icon" />
        <span>SEARCH SERIALS</span>
      </div>
      
      <div className="mdt-hr my-2"></div>
      
      <div className="text-sm font-bold text-muted-foreground mb-2 mt-1 flex items-center">
        <Clipboard className="h-4 w-4 mr-1 text-[hsl(var(--police-blue))]" />
        RECORDS
      </div>
      
      <div className={`nav-item ${(currentScreen === 'criminal' || activeContent === 'criminal') ? 'active' : ''}`} onClick={() => handleScreenChange('criminal')}>
        <Clipboard className="mdt-sidebar-icon" />
        <span>CRIM HIST</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'traffic' || activeContent === 'traffic') ? 'active' : ''}`} onClick={() => handleScreenChange('traffic')}>
        <Clipboard className="mdt-sidebar-icon" />
        <span>TRAFFIC OFFENCES</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'reports' || activeContent === 'reports') ? 'active' : ''}`} onClick={() => handleScreenChange('reports')}>
        <Clipboard className="mdt-sidebar-icon" />
        <span>REPORTS</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'financial' || activeContent === 'financial') ? 'active' : ''}`} onClick={() => handleScreenChange('financial')}>
        <Database className="mdt-sidebar-icon" />
        <span>FIN. RECORDS</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'history' || activeContent === 'history') ? 'active' : ''}`} onClick={() => handleScreenChange('history')}>
        <Clock className="mdt-sidebar-icon" />
        <span>SEARCH HISTORY</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'anpr' || activeContent === 'anpr') ? 'active' : ''}`} onClick={() => handleScreenChange('anpr')}>
        <Radio className="mdt-sidebar-icon" />
        <span>ANPR</span>
      </div>
      
      <div className="mdt-hr my-2"></div>
      
      <div className="text-sm font-bold text-muted-foreground mb-2 mt-1 flex items-center">
        <AlertTriangle className="h-4 w-4 mr-1 text-[hsl(var(--police-blue))]" />
        SYSTEM
      </div>
      
      <div className={`nav-item ${(currentScreen === 'actions' || activeContent === 'actions') ? 'active' : ''}`} onClick={() => handleScreenChange('actions')}>
        <AlertTriangle className="mdt-sidebar-icon" />
        <span>ACTIONS</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'supervisor' || activeContent === 'supervisor') ? 'active' : ''}`} onClick={() => handleScreenChange('supervisor')}>
        <Users className="mdt-sidebar-icon" />
        <span>SUPERVISOR</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'wanted' || activeContent === 'wanted') ? 'active' : ''}`} onClick={() => handleScreenChange('wanted')}>
        <AlertTriangle className="mdt-sidebar-icon" />
        <span>WANTED</span>
      </div>
      
      <div className={`nav-item ${(currentScreen === 'admin' || activeContent === 'admin') ? 'active' : ''}`} onClick={() => handleScreenChange('admin')}>
        <Settings className="mdt-sidebar-icon" />
        <span>ADMIN</span>
      </div>
      
      <div className="my-1"></div>
      
      <div className="nav-item" onClick={handleLogout}>
        <LogOut className="mdt-sidebar-icon" />
        <span>EXIT</span>
      </div>
    </div>;
};

export default NavigationSidebar;
