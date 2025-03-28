
import React from 'react';
import { useMDT } from '@/contexts/MDTContext';
import PoliceMDT from './PoliceMDT';
import MagistratePortal from '../magistrate/MagistratePortal';

const MDTContainer: React.FC = () => {
  const {
    userType,
    callsign,
    currentStatus,
    currentScreen,
    devMode,
    magistrateId,
    handleChangeStatus,
    handleDuress,
    handleFlagStolen,
    handleLogout,
    setCurrentScreen
  } = useMDT();

  // Mock data for development mode
  const mockData = devMode ? {
    warrants: [
      { id: 'w1', name: 'John Smith', status: 'ACTIVE' as const, count: 3 },
      { id: 'w2', name: 'Jane Doe', status: 'ACTIVE' as const, count: 1 },
      { id: 'w3', name: 'Mike Johnson', status: 'ACTIVE' as const, count: 2 }
    ],
    officers: [
      { callsign: 'A-1', pin: '1234', name: 'Officer Smith', updated: '2023-09-01 14:30', status: 'On Patrol', location: 'Downtown', phone: '555-1234' },
      { callsign: 'B-2', pin: '4321', name: 'Officer Jones', updated: '2023-09-01 15:45', status: 'Responding', location: 'Northside', phone: '555-5678' }
    ],
    vehicles: [
      { id: 'v1', plate: 'ABC123', model: 'Sedan', color: 'Black', owner: 'John Smith', registration: 'VALID' as const, flags: { stolen: false, wanted: false } },
      { id: 'v2', plate: 'XYZ789', model: 'SUV', color: 'Red', owner: 'Jane Doe', registration: 'EXPIRED' as const, flags: { stolen: false, wanted: false } }
    ]
  } : undefined;

  // Render the Magistrate Dashboard if logged in as magistrate
  if (userType === 'magistrate') {
    return (
      <MagistratePortal 
        magistrateId={magistrateId}
        onLogout={handleLogout}
        devMode={devMode}
      />
    );
  }

  // Render police MDT
  return (
    <PoliceMDT
      callsign={callsign}
      currentStatus={currentStatus}
      currentScreen={currentScreen}
      devMode={devMode}
      onStatusChange={handleChangeStatus}
      onDuress={handleDuress}
      onFlagStolen={handleFlagStolen}
      onLogout={handleLogout}
      onScreenChange={setCurrentScreen}
      mockData={mockData}
    />
  );
};

export default MDTContainer;
