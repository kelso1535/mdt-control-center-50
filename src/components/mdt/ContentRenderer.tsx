
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

interface ContentRendererProps {
  currentScreen: Screen;
  mockData?: {
    warrants?: any[];
    officers?: any[];
    vehicles?: any[];
    [key: string]: any; // For any other mock data
  };
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ currentScreen, mockData }) => {
  switch (currentScreen) {
    case 'people':
      return <PeopleSearch />;
    case 'vehicles':
      return <VehicleSearch mockData={mockData?.vehicles} />;
    case 'history':
      return <SearchHistory />;
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
      return <Admin />;
    default:
      return <PeopleSearch />;
  }
};

export default ContentRenderer;
