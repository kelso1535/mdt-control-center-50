
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Shield, Search, RefreshCw } from 'lucide-react';
import { Warrant } from '@/types';
import { fetchWarrants } from '@/mockServices/warrantService';

interface WarrantsProps {
  mockData?: Warrant[];
}

const Warrants: React.FC<WarrantsProps> = ({ mockData }) => {
  const { toast } = useToast();
  const [warrants, setWarrants] = useState<Warrant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    loadWarrants();
  }, [mockData, toast]);

  const filteredWarrants = warrants.filter(warrant => 
    warrant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const freshData = await fetchWarrants();
      setWarrants(freshData);
      toast({
        title: "Refreshed",
        description: "Warrant data has been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh warrants",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold">Active Warrants</h2>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1 rounded text-sm bg-card border border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/10 transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-card border border-[hsl(var(--police-blue))]/30 rounded-md p-4">
        <div className="mb-4 flex items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search warrants..."
              className="w-full bg-black/20 border border-[hsl(var(--police-blue))]/30 rounded pl-9 py-1.5 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading-dots inline-flex">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <table className="w-full text-left font-mono text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--police-blue))]/30">
                  <th className="py-2 px-4 text-[hsl(var(--police-blue))]">Name</th>
                  <th className="py-2 px-4 text-center text-[hsl(var(--police-blue))]">Status</th>
                  <th className="py-2 px-4 text-center text-[hsl(var(--police-blue))]">Warrant Count</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarrants.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-white">
                      No active warrants found
                    </td>
                  </tr>
                ) : (
                  filteredWarrants.map((warrant) => (
                    <tr key={warrant.id} className="border-b border-[hsl(var(--police-blue))]/10 hover:bg-[hsl(var(--police-blue))]/5">
                      <td className="py-2.5 px-4 text-white">{warrant.name}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="px-2 py-1 bg-destructive/20 text-destructive border border-destructive/30 rounded font-mono inline-block min-w-[80px]">
                          {warrant.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center text-white">{warrant.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Warrants;
