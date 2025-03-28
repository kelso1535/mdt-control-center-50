
import React from 'react';
import SidebarButton from '../SidebarButton';
import { 
  Search, FileText, AlertTriangle, ShieldAlert, 
  User, FileBarChart, Clock, Banknote, AlarmClock, 
  Shield, Settings, LogOut, BarChartHorizontal, Car, 
  ScanLine, UserSearch, FileWarning 
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
            isActive={activeContent === 'PEOPLE_SEARCH'}
            onClick={() => setActiveContent('PEOPLE_SEARCH')}
          >
            SEARCH PEOPLE
          </SidebarButton>
          <SidebarButton
            icon={<Car />}
            isActive={activeContent === 'VEHICLE_SEARCH'}
            onClick={() => setActiveContent('VEHICLE_SEARCH')}
          >
            SEARCH VEHICLE
          </SidebarButton>
          <SidebarButton
            icon={<ScanLine />}
            isActive={activeContent === 'SERIAL_SEARCH'}
            onClick={() => setActiveContent('SERIAL_SEARCH')}
          >
            SEARCH SERIALS
          </SidebarButton>
        </div>

        <div className="p-2 mt-4">
          <div className="text-xs text-slate-400 mb-2 px-2">RECORDS</div>
          <SidebarButton
            icon={<FileWarning />}
            isActive={activeContent === 'CRIMINAL_HISTORY'}
            onClick={() => setActiveContent('CRIMINAL_HISTORY')}
          >
            CRIM HIST
          </SidebarButton>
          <SidebarButton
            icon={<FileBarChart />}
            isActive={activeContent === 'TRAFFIC_OFFENCES'}
            onClick={() => setActiveContent('TRAFFIC_OFFENCES')}
          >
            TRAFFIC OFFENCES
          </SidebarButton>
          <SidebarButton
            icon={<FileText />}
            isActive={activeContent === 'REPORTS'}
            onClick={() => setActiveContent('REPORTS')}
          >
            REPORTS
          </SidebarButton>
          <SidebarButton
            icon={<Banknote />}
            isActive={activeContent === 'FINANCIAL_RECORDS'}
            onClick={() => setActiveContent('FINANCIAL_RECORDS')}
          >
            FIN. RECORDS
          </SidebarButton>
          <SidebarButton
            icon={<Clock />}
            isActive={activeContent === 'SEARCH_HISTORY'}
            onClick={() => setActiveContent('SEARCH_HISTORY')}
          >
            SEARCH HISTORY
          </SidebarButton>
          <SidebarButton
            icon={<AlertTriangle />}
            isActive={activeContent === 'WANTED'}
            onClick={() => setActiveContent('WANTED')}
          >
            WANTED
          </SidebarButton>
        </div>

        <div className="p-2 mt-4">
          <div className="text-xs text-slate-400 mb-2 px-2">SYSTEM</div>
          <SidebarButton
            icon={<ShieldAlert />}
            isActive={activeContent === 'ACTIONS'}
            onClick={() => setActiveContent('ACTIONS')}
          >
            ACTIONS
          </SidebarButton>
          <SidebarButton
            icon={<User />}
            isActive={activeContent === 'SUPERVISOR'}
            onClick={() => setActiveContent('SUPERVISOR')}
          >
            SUPERVISOR
          </SidebarButton>
          <SidebarButton
            icon={<AlertTriangle />}
            isActive={activeContent === 'WARRANTS'}
            onClick={() => setActiveContent('WARRANTS')}
          >
            WANTED
          </SidebarButton>
          <SidebarButton
            icon={<Settings />}
            isActive={activeContent === 'ADMIN'}
            onClick={() => setActiveContent('ADMIN')}
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
