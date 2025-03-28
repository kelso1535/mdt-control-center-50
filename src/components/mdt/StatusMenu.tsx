
import React from 'react';
import { OfficerStatus } from '@/types';

interface StatusMenuProps {
  isOpen: boolean;
  onClose?: () => void;
  onSelect?: (status: OfficerStatus) => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;
  
  const handleSelect = (status: OfficerStatus) => {
    if (onSelect) onSelect(status);
    if (onClose) onClose();
  };
  
  return (
    <div className="absolute top-full left-0 w-full bg-popover border border-border z-10 rounded-md mt-1 py-1 shadow-xl animate-fade-in">
      <button 
        className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
        onClick={() => handleSelect('Code 1 On Patrol')}
      >
        Code 1 On Patrol
      </button>
      <button 
        className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
        onClick={() => handleSelect('Code 2 Arrived at Station')}
      >
        Code 2 Arrived at Station
      </button>
      <button 
        className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
        onClick={() => handleSelect('Code 4 Traffic Stop')}
      >
        Code 4 Traffic Stop
      </button>
      <button 
        className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
        onClick={() => handleSelect('Code 5 Arrived on Scene')}
      >
        Code 5 Arrived on Scene
      </button>
      <button 
        className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
        onClick={() => handleSelect('Code 6 Unavailable')}
      >
        Code 6 Unavailable
      </button>
    </div>
  );
};

export default StatusMenu;
