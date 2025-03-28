
import React from 'react';
import LoginScreen from '../LoginScreen';

interface MDTLoginScreenProps {
  onLogin: (callsign: string) => void;
  onSwitchToMagistrate: () => void;
  devMode?: boolean;
}

const MDTLoginScreen: React.FC<MDTLoginScreenProps> = ({ 
  onLogin, 
  onSwitchToMagistrate,
  devMode = false
}) => {
  return (
    <div className="mdt-container">
      <LoginScreen 
        onLogin={onLogin} 
        onSwitchToMagistrate={onSwitchToMagistrate} 
      />
      <div className="screen-overlay"></div>
      {devMode && (
        <div className="absolute bottom-2 right-2 text-xs text-blue-400 bg-black/50 px-2 py-1 rounded">
          Dev Mode Active
        </div>
      )}
    </div>
  );
};

export default MDTLoginScreen;
