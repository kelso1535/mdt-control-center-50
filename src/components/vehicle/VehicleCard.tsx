
import React from 'react';
import { Vehicle } from '@/types';
import DashedDivider from '../DashedDivider';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
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
};

export default VehicleCard;
