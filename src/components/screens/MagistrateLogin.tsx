
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';

const MAGISTRATE_CREDENTIALS = {
  'mag-01': 'password123',
  'mag-02': 'password123',
  'mag-03': 'password123',
};

interface MagistrateLoginProps {
  onLogin: (id: string) => void;
}

const MagistrateLogin: React.FC<MagistrateLoginProps> = ({ onLogin }) => {
  const [magistrateId, setMagistrateId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!magistrateId || !password) {
      toast.error('Please enter both Magistrate ID and password');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, this would verify against a backend service
      if (MAGISTRATE_CREDENTIALS[magistrateId as keyof typeof MAGISTRATE_CREDENTIALS] === password) {
        onLogin(magistrateId);
        toast.success(`Welcome Magistrate ${magistrateId}`);
      } else {
        toast.error('Invalid Magistrate ID or password');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-900/30 p-3 rounded-full">
            <Shield className="w-10 h-10 text-[#9b87f5]" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#9b87f5] mb-2">Magistrate Portal</h1>
        <p className="text-center text-slate-400 mb-6">Access the judicial management system</p>
        
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="magistrateId" className="block text-sm font-medium text-slate-300 mb-1">
                Magistrate ID
              </label>
              <Input
                id="magistrateId"
                type="text"
                value={magistrateId}
                onChange={(e) => setMagistrateId(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                placeholder="Enter your Magistrate ID"
                autoComplete="off"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Login to Magistrate Portal'}
              </Button>
            </div>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Not a Magistrate? <a href="#" onClick={() => window.history.back()} className="text-[#9b87f5] hover:underline">Go back</a>
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-500">
        <p>Judicial Management System | Superior Court</p>
        <p className="mt-1">For authorized personnel only</p>
      </div>
    </div>
  );
};

export default MagistrateLogin;
