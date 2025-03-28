
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
}

export const CustomNavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeContent,
  setActiveContent,
  openStatusMenu,
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
            label="SEARCH PEOPLE"
            isActive={activeContent === 'PEOPLE_SEARCH'}
            onClick={() => setActiveContent('PEOPLE_SEARCH')}
          />
          <SidebarButton
            icon={<Car />}
            label="SEARCH VEHICLE"
            isActive={activeContent === 'VEHICLE_SEARCH'}
            onClick={() => setActiveContent('VEHICLE_SEARCH')}
          />
          <SidebarButton
            icon={<ScanLine />}
            label="SEARCH SERIALS"
            isActive={activeContent === 'SERIAL_SEARCH'}
            onClick={() => setActiveContent('SERIAL_SEARCH')}
          />
        </div>

        <div className="p-2 mt-4">
          <div className="text-xs text-slate-400 mb-2 px-2">RECORDS</div>
          <SidebarButton
            icon={<FileWarning />}
            label="CRIM HIST"
            isActive={activeContent === 'CRIMINAL_HISTORY'}
            onClick={() => setActiveContent('CRIMINAL_HISTORY')}
          />
          <SidebarButton
            icon={<FileBarChart />}
            label="TRAFFIC OFFENCES"
            isActive={activeContent === 'TRAFFIC_OFFENCES'}
            onClick={() => setActiveContent('TRAFFIC_OFFENCES')}
          />
          <SidebarButton
            icon={<FileText />}
            label="REPORTS"
            isActive={activeContent === 'REPORTS'}
            onClick={() => setActiveContent('REPORTS')}
          />
          <SidebarButton
            icon={<Banknote />}
            label="FIN. RECORDS"
            isActive={activeContent === 'FINANCIAL_RECORDS'}
            onClick={() => setActiveContent('FINANCIAL_RECORDS')}
          />
          <SidebarButton
            icon={<Clock />}
            label="SEARCH HISTORY"
            isActive={activeContent === 'SEARCH_HISTORY'}
            onClick={() => setActiveContent('SEARCH_HISTORY')}
          />
          <SidebarButton
            icon={<AlertTriangle />}
            label="WANTED"
            isActive={activeContent === 'WANTED'}
            onClick={() => setActiveContent('WANTED')}
          />
        </div>

        <div className="p-2 mt-4">
          <div className="text-xs text-slate-400 mb-2 px-2">SYSTEM</div>
          <SidebarButton
            icon={<ShieldAlert />}
            label="ACTIONS"
            isActive={activeContent === 'ACTIONS'}
            onClick={() => setActiveContent('ACTIONS')}
          />
          <SidebarButton
            icon={<User />}
            label="SUPERVISOR"
            isActive={activeContent === 'SUPERVISOR'}
            onClick={() => setActiveContent('SUPERVISOR')}
          />
          <SidebarButton
            icon={<AlertTriangle />}
            label="WANTED"
            isActive={activeContent === 'WARRANTS'}
            onClick={() => setActiveContent('WARRANTS')}
          />
          <SidebarButton
            icon={<Settings />}
            label="ADMIN"
            isActive={activeContent === 'ADMIN'}
            onClick={() => setActiveContent('ADMIN')}
          />
          <SidebarButton
            icon={<LogOut />}
            label="EXIT"
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="text-sm text-blue-400 font-mono">
          <div className="flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span>Officer: 1</span>
          </div>
          <div className="text-xs mt-1 text-center">
            Status: Code 1: On Patrol
          </div>
        </div>
      </div>
    </div>
  );
};
