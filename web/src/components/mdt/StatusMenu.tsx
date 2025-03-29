
import React from 'react';
import { OfficerStatus } from '@/types';

interface StatusMenuProps {
  isOpen: boolean;
  onSelect: (status: OfficerStatus) => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({ isOpen, onSelect }) => {
  if (!isOpen) return null;
  
  const statuses: OfficerStatus[] = [
    'Code 1 On Patrol',
    'Code 2 Arrived at Station',
    'Code 4 Traffic Stop',
    'Code 5 Arrived on Scene',
    'Code 6 Unavailable'
  ];
  
  return (
    <div className="absolute top-full left-0 w-full bg-popover border border-border z-10 rounded-md mt-1 py-1 shadow-xl animate-fade-in">
      {statuses.map(status => (
        <button 
          key={status}
          className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
          onClick={() => onSelect(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusMenu;
