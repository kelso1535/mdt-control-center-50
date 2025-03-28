
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar, LogOut, Settings
} from 'lucide-react';
import MagistrateAvailability from './MagistrateAvailability';
import MagistrateAdmin from './MagistrateAdmin';

interface MagistrateDashboardProps {
  magistrateId: string;
  onLogout: () => void;
}

const MagistrateDashboard: React.FC<MagistrateDashboardProps> = ({ 
  magistrateId, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState("availability");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-[#9b87f5] mr-2" />
            <h1 className="text-xl font-bold text-[#9b87f5]">Magistrate Portal</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm">Magistrate ID: {magistrateId}</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#9b87f5]/30 text-[#9b87f5]"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-4">
        <Tabs defaultValue="availability" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="availability" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Availability Calendar
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Administration
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <TabsContent value="availability" className="p-0">
              <MagistrateAvailability />
            </TabsContent>
            
            <TabsContent value="admin" className="p-0">
              <MagistrateAdmin />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default MagistrateDashboard;
