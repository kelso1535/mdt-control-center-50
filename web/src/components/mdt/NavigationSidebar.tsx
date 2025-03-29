
import React from 'react';
import { 
  Users, Car, History, FileText, Scale, ScanSearch, 
  Briefcase, Star, FileBarChart2, AlertTriangle, Cog, LogOut
} from 'lucide-react';

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
  | 'wanted'
  | 'admin';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, onClick, isActive }) => {
  return (
    <button
      className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
        isActive
          ? 'bg-blue-900/30 text-blue-400'
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
      }`}
      onClick={onClick}
    >
      <span className="h-5 w-5 mr-3">{icon}</span>
      {label}
    </button>
  );
};

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
  const navGroups = [
    {
      title: 'Search',
      items: [
        { id: 'people', label: 'People Search', icon: <Users className="h-5 w-5" /> },
        { id: 'vehicles', label: 'Vehicle Search', icon: <Car className="h-5 w-5" /> },
        { id: 'history', label: 'Search History', icon: <History className="h-5 w-5" /> },
      ]
    },
    {
      title: 'Records',
      items: [
        { id: 'criminal', label: 'Criminal Records', icon: <Scale className="h-5 w-5" /> },
        { id: 'traffic', label: 'Traffic Offences', icon: <FileText className="h-5 w-5" /> },
        { id: 'reports', label: 'Reports', icon: <FileBarChart2 className="h-5 w-5" /> },
        { id: 'serials', label: 'Serial Search', icon: <ScanSearch className="h-5 w-5" /> },
      ]
    },
    {
      title: 'Other',
      items: [
        { id: 'actions', label: 'Actions', icon: <Briefcase className="h-5 w-5" /> },
        { id: 'financial', label: 'Financial Records', icon: <Star className="h-5 w-5" /> },
        { id: 'supervisor', label: 'Officer Dashboard', icon: <Star className="h-5 w-5" /> },
        { id: 'wanted', label: 'Wanted Persons', icon: <AlertTriangle className="h-5 w-5" /> },
        { id: 'admin', label: 'Admin Settings', icon: <Cog className="h-5 w-5" /> },
      ]
    }
  ];

  return (
    <div className="mdt-navigation bg-gray-900/80 backdrop-blur-sm flex flex-col w-64 border-r border-gray-800 overflow-y-auto">
      <div className="flex-1 px-3 py-4 space-y-4">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={currentScreen === item.id}
                  onClick={() => onScreenChange(item.id as Screen)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-800">
        <button
          className="flex items-center w-full px-3 py-2 text-sm text-red-400 rounded-md hover:bg-red-900/20 transition-colors"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationSidebar;
