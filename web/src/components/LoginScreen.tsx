
import React, { useState, useEffect } from 'react';
import MDTLogo from './MDTLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (callsign: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [callsign, setCallsign] = useState('');
  const [loading, setLoading] = useState(false);
  const [devMode, setDevMode] = useState(false);

  // Check if we're in development mode (not in FiveM)
  useEffect(() => {
    const isDevMode = !window.invokeNative;
    setDevMode(isDevMode);
  }, []);

  const handleLogin = () => {
    if (!callsign.trim()) {
      toast.error('Please enter a valid callsign');
      return;
    }
    
    setLoading(true);
    
    // In dev mode, we just simulate a login
    // In FiveM mode, this would typically involve a server callback
    setTimeout(() => {
      onLogin(callsign);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-screen bg-gradient-to-b from-gray-900/50 to-gray-900/95">
      <div className="mb-8 animate-fade-in">
        <MDTLogo />
      </div>
      <div className="w-full max-w-md p-6 space-y-6 animate-slide-in backdrop-blur-sm bg-gray-800/30 border border-gray-700/30 rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl text-center font-bold">
            <span className="terminal-effect text-blue-500">POLICE MDT</span>
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your callsign"
              value={callsign}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCallsign(e.target.value)}
              className="bg-gray-700/50 border-gray-600/50 backdrop-blur-sm text-white"
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            className="w-full glass-button bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </span>
            ) : 'Secure Login'}
          </Button>
          
          <div className="text-xs text-center text-gray-400 mt-2">
            Authorized personnel only
            {devMode && <span className="ml-1 text-blue-400">(Dev Mode)</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
