
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, Search, AlertTriangle, Plus } from 'lucide-react';
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

  return (
    <div className="data-screen">
      <div className="data-header">
        <div className="flex items-center">
          <Shield className="text-police-blue h-6 w-6 mr-2" />
          <h2 className="text-xl font-bold text-police-blue">ACTIVE WARRANTS</h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search warrants..."
              className="bg-background border-border pl-9 text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="border-police-blue text-police-blue hover:bg-police-blue/10"
          >
            <Plus className="h-4 w-4 mr-1" /> New Warrant
          </Button>
        </div>
      </div>

      <div className="data-content">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
          </div>
        ) : filteredWarrants.length > 0 ? (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th className="text-left text-police-blue">NAME</th>
                  <th className="text-center text-police-blue">STATUS</th>
                  <th className="text-center text-police-blue">CHARGES</th>
                  <th className="text-center text-police-blue">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarrants.map((warrant) => (
                  <tr key={warrant.id} className="border-b border-border">
                    <td className="py-3 text-white font-medium">{warrant.name}</td>
                    <td className="py-3 text-center">
                      <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded text-xs">
                        {warrant.status}
                      </span>
                    </td>
                    <td className="py-3 text-center text-white">{warrant.count}</td>
                    <td className="py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-police-blue hover:text-white hover:bg-police-blue/80"
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-police-blue hover:text-white hover:bg-police-blue/80"
                        >
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mb-2 text-police-blue" />
            {searchTerm ? (
              <p>No warrants found matching "{searchTerm}"</p>
            ) : (
              <p>No active warrants found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Warrants;
