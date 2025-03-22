
import React, { useState, useEffect } from 'react';
import { Warrant } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

// This would typically come from the FiveM NUI callback
const Warrants: React.FC = () => {
  const [warrants, setWarrants] = useState<Warrant[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    
    // In a real implementation, this would use fetch to call an NUI callback
    fetch(`https://${GetParentResourceName()}/getWarrants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(resp => resp.json())
      .then(resp => {
        setWarrants(resp || []);
        setLoading(false);
      })
      .catch(() => {
        // In development environment or if fetch fails, use mock data
        console.log('Using mock warrant data (dev mode or fetch failed)');
        setTimeout(() => {
          setWarrants([
            {
              id: 'w1',
              name: 'John Smith',
              status: 'ACTIVE',
              count: 3
            },
            {
              id: 'w2',
              name: 'Jane Doe',
              status: 'ACTIVE',
              count: 1
            },
            {
              id: 'w3',
              name: 'Mike Johnson',
              status: 'ACTIVE',
              count: 2
            }
          ]);
          setLoading(false);
        }, 800);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Helper function to get the resource name in FiveM context
  function GetParentResourceName(): string {
    try {
      // @ts-ignore - This function exists in FiveM NUI context
      return window.GetParentResourceName();
    } catch (e) {
      // Fallback for dev environment
      return 'mdt-resource';
    }
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Active Warrants</h2>
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
      
      <div className="bg-card/30 border border-border rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2 font-bold">Name</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2 font-bold">Status</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2 font-bold">Warrant Count</th>
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
                  <td className="py-2 px-2 text-destructive">{warrant.status}</td>
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
