
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RefreshCcw } from 'lucide-react';
import { Warrant } from '@/types';
import { fetchWarrants } from '@/mockServices/warrantService';
import { Button } from '@/components/ui/button';

interface WarrantsProps {
  mockData?: Warrant[];
}

const Warrants: React.FC<WarrantsProps> = ({ mockData }) => {
  const { toast } = useToast();
  const [warrants, setWarrants] = useState<Warrant[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWarrants = async () => {
    try {
      setLoading(true);
      // Use mockData if provided, otherwise fetch from service
      const data = mockData || await fetchWarrants();
      setWarrants(data);
    } catch (error) {
      console.error('Error loading warrants:', error);
      toast({
        title: "Error",
        description: "Failed to load warrants",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWarrants();
  }, [mockData, toast]);

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Active Warrants</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]" 
            size="sm"
            onClick={loadWarrants}
            disabled={loading}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-3">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Name</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2 text-center">Status</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2 text-center">Warrant Count</th>
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
                  <td className="py-2 px-2 text-center">
                    <span className="text-red-500 font-bold">{warrant.status}</span>
                  </td>
                  <td className="py-2 px-2 text-center text-white">{warrant.count}</td>
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
