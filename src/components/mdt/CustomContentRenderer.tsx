
import React from 'react';
import PeopleSearch from '../screens/PeopleSearch';
import VehicleSearch from '../screens/VehicleSearch';
import SerialSearch from '../screens/SerialSearch';
import CriminalHistory from '../screens/CriminalHistory';
import TrafficOffences from '../screens/TrafficOffences';
import Reports from '../screens/Reports';
import FinancialRecords from '../screens/FinancialRecords';
import SearchHistory from '../screens/SearchHistory';
import Actions from '../screens/Actions';
import Supervisor from '../screens/Units';
import Admin from '../screens/Admin';
import ANPR from '../screens/ANPR';
import Warrants from '../screens/Warrants';
import Wanted from '../screens/Wanted';

interface ContentRendererProps {
  activeContent: string;
}

const CustomContentRenderer: React.FC<ContentRendererProps> = ({ activeContent }) => {
  // Define default permissions for the Admin component
  const defaultPermissions = {
    canManageWarrants: true,
    canManageFines: true,
    canManageOfficers: true,
    canManageTemplates: true,
    canManageFlags: true,
    canAccessAdminPanel: true,
    canViewAllRecords: true,
    canEditRecords: true,
    canManageRanks: true
  };

  // Render content based on activeContent string
  const renderContent = () => {
    switch (activeContent) {
      case 'PEOPLE_SEARCH':
        return <PeopleSearch />;
      case 'VEHICLE_SEARCH':
        return <VehicleSearch />;
      case 'SERIAL_SEARCH':
        return <SerialSearch />;
      case 'CRIMINAL_HISTORY':
        return <CriminalHistory />;
      case 'TRAFFIC_OFFENCES':
        return <TrafficOffences />;
      case 'REPORTS':
        return <Reports />;
      case 'FINANCIAL_RECORDS':
        return <FinancialRecords />;
      case 'SEARCH_HISTORY':
        return <SearchHistory />;
      case 'ACTIONS':
        return <Actions />;
      case 'SUPERVISOR':
        return <Supervisor />;
      case 'ADMIN':
        return <Admin permissions={defaultPermissions} />;
      case 'ANPR':
        return <ANPR />;
      case 'WARRANTS':
        return <Warrants />;
      case 'WANTED':
        return <Wanted />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return <div className="flex-1 overflow-auto">{renderContent()}</div>;
};

export default CustomContentRenderer;
