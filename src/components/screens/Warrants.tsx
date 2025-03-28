
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { Warrant } from '@/types';
import { fetchWarrants } from '@/mockServices/warrantService';

interface WarrantsProps {
  mockData?: Warrant[];
}

const Warrants: React.FC<WarrantsProps> = ({ mockData }) => {
  const [warrants, setWarrants] = useState<Warrant[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    // Use mockData if provided, otherwise fetch from service
    setTimeout(() => {
      setWarrants(mockData || [
        { id: 'w1', name: 'John Smith', status: 'ACTIVE', count: 2 },
        { id: 'w2', name: 'Jane Doe', status: 'ACTIVE', count: 1 },
        { id: 'w3', name: 'Mike Johnson', status: 'ACTIVE', count: 3 }
      ]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, [mockData]);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Active Warrants</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]" 
            size="sm"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Name</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Status</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Warrant Count</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : warrants.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No active warrants found
                </td>
              </tr>
            ) : (
              warrants.map((warrant) => (
                <tr key={warrant.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{warrant.name}</td>
                  <td className="py-2 px-2">
                    <span className="text-red-500 font-medium">{warrant.status}</span>
                  </td>
                  <td className="py-2 px-2 text-white">{warrant.count}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warrants;
