
import React from 'react';
import PeopleSearch from '../screens/PeopleSearch';
import VehicleSearch from '../screens/VehicleSearch';
import SearchHistory from '../screens/SearchHistory';
import CriminalHistory from '../screens/CriminalHistory';
import TrafficOffences from '../screens/TrafficOffences';
import FinancialRecords from '../screens/FinancialRecords';
import SerialSearch from '../screens/SerialSearch';
import Actions from '../screens/Actions';
import Units from '../screens/Units';
import Warrants from '../screens/Warrants';
import Reports from '../screens/Reports';
import Admin from '../screens/Admin';
import ANPR from '../screens/ANPR';
import { Warrant, Vehicle, PoliceUnit, OfficerRank, PermissionLevel } from '@/types';

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
  | 'anpr'
  | 'admin';

interface ContentRendererProps {
  currentScreen: Screen;
  officerRank?: OfficerRank;
  mockData?: {
    warrants?: Warrant[];
    officers?: PoliceUnit[];
    vehicles?: Vehicle[];
    [key: string]: any; // For any other mock data
  };
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ currentScreen, officerRank = 'Officer', mockData }) => {
  // Simplified permissions - only check if the user is leadership
  const permissions: PermissionLevel = {
    isLeadership: officerRank === 'Leadership'
  };

  switch (currentScreen) {
    case 'people':
      return <PeopleSearch />;
    case 'vehicles':
      return <VehicleSearch mockData={mockData?.vehicles} />;
    case 'history':
      return <SearchHistory />;
    case 'anpr':
      return <ANPR />;
    case 'criminal':
      return <CriminalHistory />;
    case 'traffic':
      return <TrafficOffences />;
    case 'reports':
      return <Reports />;
    case 'serials':
      return <SerialSearch />;
    case 'actions':
      return <Actions />;
    case 'financial':
      return <FinancialRecords />;
    case 'supervisor':
      return <Units mockData={mockData?.officers} />;
    case 'wanted':
      return <Warrants mockData={mockData?.warrants} />;
    case 'admin':
      return <Admin permissions={permissions} />;
    default:
      return <PeopleSearch />;
  }
};

export default ContentRenderer;
