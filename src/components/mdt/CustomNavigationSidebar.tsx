
import React from 'react';
import SidebarButton from '../SidebarButton';
import { 
  Search, FileText, AlertTriangle, ShieldAlert, 
  User, FileBarChart, Clock, Banknote, AlarmClock, 
  Shield, Settings, LogOut, BarChartHorizontal, Car, 
  ScanLine, UserSearch, FileWarning, Gavel 
} from 'lucide-react';

interface NavigationSidebarProps {
  activeContent: string;
  setActiveContent: (content: string) => void;
  openStatusMenu: () => void;
  callsign?: string;
}

export const CustomNavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeContent,
  setActiveContent,
  openStatusMenu,
  callsign = 'Unknown',
}) => {
  return (
    <div className="w-64 h-full bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-4 text-center text-blue-400">
        <img src="/lovable-uploads/6cf11c8a-d8bf-4540-870b-1e3847c08fd2.png" className="mx-auto w-14 h-14 mb-2" alt="Police Department" />
        <h2 className="text-xl font-mono">POLICE DEPARTMENT</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <SidebarButton
            icon={<UserSearch />}
            isActive={activeContent === 'people-search'}
            onClick={() => setActiveContent('people-search')}
          >
            SEARCH PEOPLE
          </SidebarButton>
          <SidebarButton
            icon={<Car />}
            isActive={activeContent === 'vehicle-search'}
            onClick={() => setActiveContent('vehicle-search')}
          >
            SEARCH VEHICLE
          </SidebarButton>
          <SidebarButton
            icon={<ScanLine />}
            isActive={activeContent === 'serial-search'}
            onClick={() => setActiveContent('serial-search')}
          >
            SEARCH SERIALS
          </SidebarButton>
        </div>

        <div className="p-2 mt-4">
          <div className="text-xs text-slate-400 mb-2 px-2">RECORDS</div>
          <SidebarButton
            icon={<FileWarning />}
            isActive={activeContent === 'criminal-history'}
            onClick={() => setActiveContent('criminal-history')}
          >
            CRIM HIST
          </SidebarButton>
          <SidebarButton
            icon={<FileBarChart />}
            isActive={activeContent === 'traffic'}
            onClick={() => setActiveContent('traffic')}
          >
            TRAFFIC OFFENCES
          </SidebarButton>
          <SidebarButton
            icon={<FileText />}
            isActive={activeContent === 'reports'}
            onClick={() => setActiveContent('reports')}
          >
            REPORTS
          </SidebarButton>
          <SidebarButton
            icon={<Banknote />}
            isActive={activeContent === 'financial'}
            onClick={() => setActiveContent('financial')}
          >
            FIN. RECORDS
          </SidebarButton>
          <SidebarButton
            icon={<Clock />}
            isActive={activeContent === 'search-history'}
            onClick={() => setActiveContent('search-history')}
          >
            SEARCH HISTORY
          </SidebarButton>
          <SidebarButton
            icon={<AlertTriangle />}
            isActive={activeContent === 'wanted'}
            onClick={() => setActiveContent('wanted')}
          >
            WANTED
          </SidebarButton>
          <SidebarButton
            icon={<Gavel />}
            isActive={activeContent === 'magistrate'}
            onClick={() => setActiveContent('magistrate')}
          >
            MAGISTRATE
          </SidebarButton>
        </div>

        <div className="p-2 mt-4">
          <div className="text-xs text-slate-400 mb-2 px-2">SYSTEM</div>
          <SidebarButton
            icon={<ShieldAlert />}
            isActive={activeContent === 'actions'}
            onClick={() => setActiveContent('actions')}
          >
            ACTIONS
          </SidebarButton>
          <SidebarButton
            icon={<User />}
            isActive={activeContent === 'units'}
            onClick={() => setActiveContent('units')}
          >
            SUPERVISOR
          </SidebarButton>
          <SidebarButton
            icon={<AlertTriangle />}
            isActive={activeContent === 'warrants'}
            onClick={() => setActiveContent('warrants')}
          >
            WARRANTS
          </SidebarButton>
          <SidebarButton
            icon={<Settings />}
            isActive={activeContent === 'admin'}
            onClick={() => setActiveContent('admin')}
          >
            ADMIN
          </SidebarButton>
          <SidebarButton
            icon={<LogOut />}
            onClick={() => {}}
          >
            EXIT
          </SidebarButton>
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="text-sm text-blue-400 font-mono">
          <div className="flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span>Officer: {callsign}</span>
          </div>
          <div className="text-xs mt-1 text-center">
            Status: Code 1: On Patrol
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNavigationSidebar;
