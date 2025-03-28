
import React from 'react';
import { useMDT } from '@/contexts/MDTContext';
import MDTLoginScreen from './MDTLoginScreen';
import MagistrateLoginScreen from '../magistrate/MagistrateLoginScreen';

const MDTLoginContainer: React.FC = () => {
  const { 
    currentScreen,
    devMode, 
    handleLogin, 
    handleMagistrateLogin, 
    switchToPoliceLogin, 
    switchToMagistrateLogin 
  } = useMDT();
  
  if (currentScreen === 'magistrate-login') {
    return (
      <MagistrateLoginScreen 
        onLogin={handleMagistrateLogin} 
        onSwitchToPolice={switchToPoliceLogin}
        devMode={devMode}
      />
    );
  }
  
  return (
    <MDTLoginScreen 
      onLogin={handleLogin} 
      onSwitchToMagistrate={switchToMagistrateLogin}
      devMode={devMode}
    />
  );
};

export default MDTLoginContainer;
