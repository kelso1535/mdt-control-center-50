
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Vehicle, Person } from '@/types';
import { Car } from 'lucide-react';
import VehicleSearchForm from '../vehicle/VehicleSearchForm';
import VehicleCard from '../vehicle/VehicleCard';
import PersonVehiclesList from '../vehicle/PersonVehiclesList';

interface VehicleSearchProps {
  mockData?: Vehicle[];
  lastSearchedPerson?: Person | null;
}

const mockVehicle: Vehicle = {
  id: 'v12345',
  plate: 'ABC123',
  model: 'BUFFALO STX',
  color: 'BLACK',
  owner: 'JOHN DOE',
  registration: 'VALID',
  flags: {
    stolen: false,
    wanted: false
  }
};

const VehicleSearch: React.FC<VehicleSearchProps> = ({ mockData, lastSearchedPerson }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLastPersonVehicles, setShowLastPersonVehicles] = useState(true);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a plate number to search');
      return;
    }
    
    setLoading(true);
    setShowLastPersonVehicles(false); // Hide person vehicles when searching for a specific plate
    
    // Simulate API call
    setTimeout(() => {
      // Use mockData if provided, otherwise use default mock
      const vehicleToUse = mockData && mockData.length > 0 
        ? mockData.find(v => v.plate.toLowerCase() === searchQuery.toLowerCase()) || mockVehicle
        : mockVehicle;
      
      setSearchResult(vehicleToUse);
      setLoading(false);
      toast.success(`Search complete for plate "${searchQuery}"`);
    }, 800);
  };

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Search Vehicle</h2>
      
      <VehicleSearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
      />
      
      {/* Display specific vehicle search result */}
      {searchResult && !showLastPersonVehicles && (
        <VehicleCard vehicle={searchResult} />
      )}
      
      {/* Display vehicles from last searched person */}
      {lastSearchedPerson && showLastPersonVehicles && (
        <PersonVehiclesList person={lastSearchedPerson} />
      )}
      
      {/* Show message when no vehicles are found */}
      {!searchResult && (!lastSearchedPerson?.ownedVehicles || lastSearchedPerson.ownedVehicles.length === 0) && (
        <div className="text-center py-8">
          <p className="text-slate-300">No vehicle records found. Search for a plate or person.</p>
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;
