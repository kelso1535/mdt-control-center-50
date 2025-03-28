
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
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

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold">Active Warrants</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-card border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]" 
            size="sm"
            onClick={loadWantedPersons}
            disabled={isLoading}
          >
            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-card/30 border border-border rounded-md p-3">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Name</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Status</th>
              <th className="text-[hsl(var(--police-blue))] py-2 px-2">Warrant Count</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-8 text-center">
                  <div className="loading-dots inline-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
            ) : wantedPersons.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No active warrants found
                </td>
              </tr>
            ) : (
              wantedPersons.map((person) => (
                <tr key={person.id} className="border-t border-border/30">
                  <td className="py-2 px-2 text-white">{person.name}</td>
                  <td className="py-2 px-2">
                    <span className="text-red-500 font-bold">{person.status}</span>
                  </td>
                  <td className="py-2 px-2 text-white">{person.warrantCount}</td>
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
