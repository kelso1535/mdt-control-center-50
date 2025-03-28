
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
import Units from '../screens/Units';
import Warrants from '../screens/Warrants';
import Admin from '../screens/Admin';
import ANPR from '../screens/ANPR';
import Wanted from '../screens/Wanted';

interface CustomContentRendererProps {
  activeContent: string;
}

const CustomContentRenderer: React.FC<CustomContentRendererProps> = ({ activeContent }) => {
  // Add content renderer based on active content
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
        return <Units />;
      case 'WARRANTS':
        return <Warrants />;
      case 'WANTED':
        return <Wanted />;
      case 'ANPR':
        return <ANPR />;
      case 'ADMIN':
        return <Admin permissions={{
          canManageWarrants: true,
          canManageFines: true,
          canManageOfficers: true,
          canManageTemplates: true,
          canManageFlags: true,
          canAccessAdminPanel: true,
          canViewAllRecords: true,
          canEditRecords: true,
          canManageRanks: true
        }} />;
      default:
        return (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <h3 className="text-xl mb-2">Police Department MDT</h3>
              <p className="text-muted-foreground">Select an option from the sidebar to get started</p>
            </div>
          </div>
        );
    }
  };

  return <div className="mdt-content flex-1 p-4 overflow-y-auto">{renderContent()}</div>;
};

export default CustomContentRenderer;
