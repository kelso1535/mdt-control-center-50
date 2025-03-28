
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Vehicle, Person } from '@/types';
import DashedDivider from '../DashedDivider';
import { Car, User } from 'lucide-react';
import { SectionHeader } from '../DataSection';

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

  // Helper to render a single vehicle result card
  const renderVehicleCard = (vehicle: Vehicle) => (
    <div key={vehicle.id} className="bg-card border border-border rounded-md p-2 mt-2 animate-slide-in">
      <div className="section-header">
        <div className="section-line"></div>
        <div className="section-title">------- VEHICLE DATABASE ENTRY -------</div>
        <div className="section-line"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
        <div className="data-line">
          <span>PLATE:</span>
          <span className="text-white">{vehicle.plate}</span>
        </div>
        <div className="data-line">
          <span>MODEL:</span>
          <span className="text-white">{vehicle.model}</span>
        </div>
        
        <div className="data-line">
          <span>COLOR:</span>
          <span className="text-white">{vehicle.color}</span>
        </div>
        <div className="data-line">
          <span>OWNER:</span>
          <span className="text-white">{vehicle.owner}</span>
        </div>
        
        <div className="data-line">
          <span>REGISTRATION:</span>
          <span className={vehicle.registration === 'VALID' ? 'text-white' : 'text-destructive'}>
            {vehicle.registration}
          </span>
        </div>
      </div>
      
      <DashedDivider />
      
      <div className="section-header">
        <div className="section-line"></div>
        <div className="section-title">------- FLAGS -------</div>
        <div className="section-line"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        <div className="data-line">
          <span>STOLEN:</span>
          <span className={vehicle.flags.stolen ? 'text-destructive' : 'text-white'}>
            {vehicle.flags.stolen ? 'YES' : 'NO'}
          </span>
        </div>
        <div className="data-line">
          <span>WANTED:</span>
          <span className={vehicle.flags.wanted ? 'text-destructive' : 'text-white'}>
            {vehicle.flags.wanted ? 'YES' : 'NO'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Search Vehicle</h2>
      
      <div className="flex space-x-2 mb-2">
        <Input
          type="text"
          placeholder="Enter plate number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Vehicle Check'}
        </Button>
      </div>
      
      {/* Display specific vehicle search result */}
      {searchResult && !showLastPersonVehicles && renderVehicleCard(searchResult)}
      
      {/* Display vehicles from last searched person */}
      {lastSearchedPerson && lastSearchedPerson.ownedVehicles && lastSearchedPerson.ownedVehicles.length > 0 && showLastPersonVehicles && (
        <div className="mt-4">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-md p-2">
            <div className="flex items-center text-[hsl(var(--police-blue))] border-b border-slate-700 pb-1 mb-2">
              <User className="mr-2" size={18} />
              <h3 className="text-lg font-medium">
                Registered Vehicles: {lastSearchedPerson.name}
              </h3>
            </div>
            
            <div className="space-y-3">
              {lastSearchedPerson.ownedVehicles.map(vehicle => renderVehicleCard(vehicle))}
            </div>
          </div>
        </div>
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
