
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
import { MDTScreenType } from '../MDTApp';

interface ContentRendererProps {
  currentScreen: MDTScreenType;
  officerRank?: OfficerRank;
  mockData?: {
    warrants?: Warrant[];
    officers?: PoliceUnit[];
    vehicles?: Vehicle[];
    [key: string]: any; // For any other mock data
  };
}

// Generate permissions based on rank
const getPermissions = (rank?: OfficerRank): PermissionLevel => {
  const defaultPermissions: PermissionLevel = {
    canManageWarrants: false,
    canManageFines: false,
    canManageOfficers: false,
    canManageTemplates: false,
    canManageFlags: false,
    canAccessAdminPanel: false,
    canViewAllRecords: false,
    canEditRecords: false,
    canManageRanks: false
  };

  if (!rank) return defaultPermissions;

  switch (rank) {
    case 'Chief of Police':
      return {
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
    case 'Assistant Chief':
      return {
        canManageWarrants: true,
        canManageFines: true,
        canManageOfficers: true,
        canManageTemplates: true,
        canManageFlags: true,
        canAccessAdminPanel: true,
        canViewAllRecords: true,
        canEditRecords: true,
        canManageRanks: false
      };
    case 'Captain':
      return {
        canManageWarrants: true,
        canManageFines: true,
        canManageOfficers: true,
        canManageTemplates: true,
        canManageFlags: true,
        canAccessAdminPanel: true,
        canViewAllRecords: true,
        canEditRecords: true,
        canManageRanks: false
      };
    case 'Lieutenant':
      return {
        canManageWarrants: true,
        canManageFines: true,
        canManageOfficers: true,
        canManageTemplates: false,
        canManageFlags: true,
        canAccessAdminPanel: true,
        canViewAllRecords: true,
        canEditRecords: true,
        canManageRanks: false
      };
    case 'Sergeant':
      return {
        canManageWarrants: true,
        canManageFines: true,
        canManageOfficers: false,
        canManageTemplates: false,
        canManageFlags: true,
        canAccessAdminPanel: false,
        canViewAllRecords: true,
        canEditRecords: false,
        canManageRanks: false
      };
    case 'Senior Officer':
      return {
        canManageWarrants: false,
        canManageFines: true,
        canManageOfficers: false,
        canManageTemplates: false,
        canManageFlags: false,
        canAccessAdminPanel: false,
        canViewAllRecords: false,
        canEditRecords: false,
        canManageRanks: false
      };
    case 'Officer':
    default:
      return defaultPermissions;
  }
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ currentScreen, officerRank = 'Officer', mockData }) => {
  const permissions = getPermissions(officerRank);

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
