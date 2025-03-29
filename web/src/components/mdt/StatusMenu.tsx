
import React from 'react';
import { OfficerStatus } from '@/types';

interface StatusMenuProps {
  isOpen: boolean;
  onSelect: (status: OfficerStatus) => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({ isOpen, onSelect }) => {
  const statuses: OfficerStatus[] = [
    'Code 1 On Patrol',
    'Code 2 Arrived at Station',
    'Code 4 Traffic Stop',
    'Code 5 Arrived on Scene',
    'Code 6 Unavailable'
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 rounded-md bg-gray-800 border border-gray-700 shadow-lg z-10 overflow-hidden">
      <div className="py-1 max-h-48 overflow-y-auto">
        {statuses.map((status) => (
          <button
            key={status}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => onSelect(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusMenu;
