
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { RefreshCcw } from 'lucide-react';
import { Warrant } from '@/types';
import { fetchWarrants } from '@/mockServices/warrantService';

interface WarrantsProps {
  mockData?: Warrant[];
}

const Warrants: React.FC<WarrantsProps> = ({ mockData }) => {
  const [warrants, setWarrants] = useState<Warrant[]>([]);
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
        toast.error("Failed to load warrants");
      } finally {
        setLoading(false);
      }
    };

    loadWarrants();
  }, [mockData]);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const freshData = await fetchWarrants();
      setWarrants(freshData);
      toast.success("Warrant data has been updated");
    } catch (error) {
      toast.error("Failed to refresh warrants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-blue-400 font-bold">Active Warrants</h2>
        <button 
          onClick={handleRefresh}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <RefreshCcw className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>

      <div className="bg-slate-900/80 border border-blue-900/50 rounded">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-blue-900/50">
              <th className="py-3 px-4 text-blue-400">Name</th>
              <th className="py-3 px-4 text-center text-blue-400">Status</th>
              <th className="py-3 px-4 text-center text-blue-400">Warrant Count</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : warrants.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-white">
                  No active warrants found
                </td>
              </tr>
            ) : (
              warrants.map((warrant) => (
                <tr key={warrant.id} className="border-b border-blue-900/30 hover:bg-blue-900/10">
                  <td className="py-3 px-4 text-white">{warrant.name}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-red-500 font-bold">{warrant.status}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-white">{warrant.count}</td>
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
