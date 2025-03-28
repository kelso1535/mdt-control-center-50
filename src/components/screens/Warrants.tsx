
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
    <div className="data-screen h-full">
      <div className="data-header flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-blue-500">Active Warrants</h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search warrants..."
              className="w-full bg-black/20 border border-blue-900/50 rounded pl-9 py-1 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
        </div>
      </div>

      <div className="data-content mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full text-left">
              <thead>
                <tr className="text-blue-400 border-b border-blue-900/30">
                  <th className="py-2 px-4 w-1/2">Name</th>
                  <th className="py-2 px-4 text-center">Status</th>
                  <th className="py-2 px-4 text-center">Warrant Count</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarrants.map((warrant) => (
                  <tr key={warrant.id} className="border-b border-blue-900/20 hover:bg-blue-900/10">
                    <td className="py-3 px-4 text-white">{warrant.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 text-red-500 font-mono">
                        {warrant.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-white">{warrant.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Warrants;
