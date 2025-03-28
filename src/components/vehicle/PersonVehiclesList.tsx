
import React from 'react';
import { Vehicle, Person } from '@/types';
import { User } from 'lucide-react';
import VehicleCard from './VehicleCard';

interface PersonVehiclesListProps {
  person: Person;
}

const PersonVehiclesList: React.FC<PersonVehiclesListProps> = ({ person }) => {
  if (!person || !person.ownedVehicles || person.ownedVehicles.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-md p-2">
        <div className="flex items-center text-[hsl(var(--police-blue))] border-b border-slate-700 pb-1 mb-2">
          <User className="mr-2" size={18} />
          <h3 className="text-lg font-medium">
            Registered Vehicles: {person.name}
          </h3>
        </div>
        
        <div className="space-y-3">
          {person.ownedVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonVehiclesList;
