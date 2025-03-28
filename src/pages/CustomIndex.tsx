
import React, { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import CustomMDTApp from '@/components/CustomMDTApp';

const CustomIndex: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState('');
  
  const handleLogin = (inputCallsign: string) => {
    setCallsign(inputCallsign);
    setIsLoggedIn(true);
  };
  
  return (
    <div className="mdt-container">
      <div className="police-mdt">
        {isLoggedIn ? (
          <CustomMDTApp callsign={callsign} />
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default CustomIndex;
