
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { fetchWantedPersons, WantedPerson } from '@/mockServices/wantedService';

const WantedPage: React.FC = () => {
  const [wantedPersons, setWantedPersons] = useState<WantedPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const loadWantedPersons = async () => {
    setIsLoading(true);
    try {
      const data = await fetchWantedPersons();
      setWantedPersons(data);
    } catch (error) {
      console.error('Failed to fetch wanted persons:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load wanted persons data."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWantedPersons();
  }, []);

  const handleRefresh = () => {
    loadWantedPersons();
    toast({
      title: "Refreshed",
      description: "Wanted persons list has been refreshed."
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1F2C] text-blue-400 font-mono p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Active Warrants</h1>
        <Button 
          variant="ghost" 
          onClick={handleRefresh}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="overflow-auto flex-grow bg-[#1A1F2C]/80 border border-blue-900/50 rounded">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-900/50">
              <th className="text-left p-3 text-blue-400">Name</th>
              <th className="text-left p-3 text-blue-400">Status</th>
              <th className="text-left p-3 text-blue-400">Warrant Count</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center p-4">Loading...</td>
              </tr>
            ) : wantedPersons.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center p-4">No active warrants found</td>
              </tr>
            ) : (
              wantedPersons.map((person) => (
                <tr key={person.id} className="border-b border-blue-900/30 hover:bg-blue-900/10">
                  <td className="p-3">{person.name}</td>
                  <td className="p-3">
                    <span className="text-red-500 font-bold">{person.status}</span>
                  </td>
                  <td className="p-3">{person.warrantCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WantedPage;
