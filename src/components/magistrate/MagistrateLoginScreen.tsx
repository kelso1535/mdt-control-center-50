
import React from 'react';
import MagistrateLogin from '../screens/MagistrateLogin';

interface MagistrateLoginScreenProps {
  onLogin: (id: string) => void;
  onSwitchToPolice: () => void;
  devMode?: boolean;
}

const MagistrateLoginScreen: React.FC<MagistrateLoginScreenProps> = ({ 
  onLogin, 
  onSwitchToPolice,
  devMode = false
}) => {
  return (
    <div className="mdt-container">
      <MagistrateLogin onLogin={onLogin} onSwitchToPolice={onSwitchToPolice} />
      <div className="screen-overlay"></div>
      {devMode && (
        <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
          Dev Mode Active
        </div>
      )}
    </div>
  );
};

export default MagistrateLoginScreen;
