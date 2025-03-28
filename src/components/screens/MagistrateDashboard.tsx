import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar, LogOut, UserCog, Gavel, Settings
} from 'lucide-react';
import MagistrateAvailability from './MagistrateAvailability';
import LicenseManagement from './LicenseManagement';
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
            <Gavel className="h-6 w-6 text-[#9b87f5] mr-2" />
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
              Court Availability
            </TabsTrigger>
            <TabsTrigger value="licenses" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              <UserCog className="h-4 w-4 mr-2" />
              License Management
            </TabsTrigger>
            <TabsTrigger value="warrants" className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white">
              <Gavel className="h-4 w-4 mr-2" />
              Warrant Approval
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
            
            <TabsContent value="licenses" className="p-0">
              <LicenseManagement />
            </TabsContent>
            
            <TabsContent value="warrants" className="p-0">
              <div className="bg-card/30 border border-border rounded-md p-4">
                <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold mb-3">Warrant Approval</h2>
                <p className="text-slate-400 mb-4">Review and approve/reject warrant applications submitted by law enforcement.</p>
                
                <div className="bg-slate-800/50 p-4 rounded-md mb-4 border border-slate-700">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-white">Warrant #W-2023-089</h3>
                      <p className="text-sm text-slate-400">Requested by: Officer A-141</p>
                      <p className="text-sm text-slate-400 mt-1">Subject: Braxton Jones</p>
                      <p className="text-sm text-slate-400">Type: Search Premises</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive">Reject</Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
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
