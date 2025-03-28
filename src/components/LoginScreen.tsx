
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (callsign: string) => void;
  onSwitchToMagistrate?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSwitchToMagistrate }) => {
  const [callsign, setCallsign] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!callsign) {
      toast.error('Please enter your callsign');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      onLogin(callsign);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-900/30 p-3 rounded-full">
            <Shield className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-2">Police MDT</h1>
        <p className="text-center text-slate-400 mb-6">Access the Mobile Data Terminal</p>
        
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="callsign" className="block text-sm font-medium text-slate-300 mb-1">
                Callsign
              </label>
              <Input
                id="callsign"
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                placeholder="Enter your callsign"
                autoComplete="off"
              />
            </div>
            
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-slate-300 mb-1">
                PIN
              </label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                placeholder="Enter your PIN"
              />
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Login to MDT'}
              </Button>
            </div>
          </div>
        </form>
        
        {onSwitchToMagistrate && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Access as magistrate? <button onClick={onSwitchToMagistrate} className="text-[#9b87f5] hover:underline">Switch to Magistrate Login</button>
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-500">
        <p>Police Department Mobile Data Terminal</p>
        <p className="mt-1">For authorized personnel only</p>
      </div>
    </div>
  );
};

export default LoginScreen;
