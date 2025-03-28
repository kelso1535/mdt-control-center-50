
import React from 'react';
import VehicleSearch from '@/components/screens/VehicleSearch';
import PeopleSearch from '@/components/screens/PeopleSearch';
import SerialSearch from '@/components/screens/SerialSearch';
import Actions from '@/components/screens/Actions';
import ANPR from '@/components/screens/ANPR';
import Wanted from '@/components/screens/Wanted';
import Warrants from '@/components/screens/Warrants';
import Reports from '@/components/screens/Reports';
import SearchHistory from '@/components/screens/SearchHistory';
import Units from '@/components/screens/Units';
import CriminalHistory from '@/components/screens/CriminalHistory';
import TrafficOffences from '@/components/screens/TrafficOffences';
import FinancialRecords from '@/components/screens/FinancialRecords';
import MagistrateAvailability from '@/components/screens/MagistrateAvailability';
import Admin from '@/components/screens/Admin';
import CourtCaseBooking from '@/components/screens/CourtCaseBooking';
import { PermissionLevel } from '@/types';
import { useMDTSearchState } from '@/hooks/useMDTSearchState';

interface CustomContentRendererProps {
  activeContent: string;
  callsign?: string;
}

// Complete admin permissions with all required properties
const adminPermissions: PermissionLevel = {
  canAccessAdminPanel: true,
  canManageOfficers: true,
  canManageTemplates: true,
  canManageFlags: true,
  canManageFines: true,
  canManageWarrants: true,
  canViewAllRecords: true,
  canEditRecords: true,
  canManageRanks: true
};

const CustomContentRenderer: React.FC<CustomContentRendererProps> = ({ 
  activeContent, 
  callsign = 'Unknown'
}) => {
  // Use our shared state hook
  const mdtSearchState = useMDTSearchState();

  return (
    <div className="flex-1 bg-slate-900 p-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {activeContent === 'vehicle-search' && (
          <VehicleSearch 
            lastSearchedPerson={mdtSearchState.lastSearchedPerson}
          />
        )}
        {activeContent === 'people-search' && (
          <PeopleSearch 
            onPersonFound={mdtSearchState.storePersonSearch}
          />
        )}
        {activeContent === 'serial-search' && <SerialSearch />}
        {activeContent === 'actions' && <Actions />}
        {activeContent === 'anpr' && <ANPR callsign={callsign} />}
        {activeContent === 'wanted' && <Wanted />}
        {activeContent === 'warrants' && <Warrants />}
        {activeContent === 'reports' && <Reports />}
        {activeContent === 'search-history' && <SearchHistory />}
        {activeContent === 'units' && <Units />}
        {activeContent === 'criminal-history' && <CriminalHistory />}
        {activeContent === 'traffic' && <TrafficOffences />}
        {activeContent === 'financial' && <FinancialRecords />}
        {activeContent === 'magistrate' && <MagistrateAvailability />}
        {activeContent === 'court-booking' && <CourtCaseBooking />}
        {activeContent === 'admin' && <Admin permissions={adminPermissions} />}
        {!activeContent && (
          <div className="text-center py-8">
            <h2 className="text-lg font-semibold text-blue-400 mb-2">Welcome to Police MDT</h2>
            <p className="text-slate-300">Select an option from the navigation sidebar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomContentRenderer;
