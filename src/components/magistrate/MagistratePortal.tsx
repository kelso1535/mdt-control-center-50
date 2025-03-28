
import React from 'react';
import MagistrateDashboard from '../screens/MagistrateDashboard';

interface MagistratePortalProps {
  magistrateId: string;
  onLogout: () => void;
  devMode?: boolean;
}

const MagistratePortal: React.FC<MagistratePortalProps> = ({ 
  magistrateId, 
  onLogout,
  devMode = false
}) => {
  return (
    <div className="mdt-container">
      <MagistrateDashboard 
        magistrateId={magistrateId}
        onLogout={onLogout}
      />
      <div className="screen-overlay"></div>
      {devMode && (
        <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
          Dev Mode Active - Magistrate {magistrateId}
        </div>
      )}
    </div>
  );
};

export default MagistratePortal;
