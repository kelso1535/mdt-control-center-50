
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { User, UserCog, Gavel, Settings, ShieldCheck, CalendarDays } from 'lucide-react';

const MagistrateAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("users");
  
  return (
    <div className="bg-card/30 border border-border rounded-md p-4">
      <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold mb-3">Magistrate Administration</h2>
      
      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="users">
            <User className="h-4 w-4 mr-2" />
            Magistrate Users
          </TabsTrigger>
          <TabsTrigger value="court-settings">
            <Gavel className="h-4 w-4 mr-2" />
            Court Settings
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <CalendarDays className="h-4 w-4 mr-2" />
            Notification Settings
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="h-4 w-4 mr-2" />
            System Configuration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">Manage Magistrates</h3>
              <Button
                className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                onClick={() => toast.success("This would open a modal to add a new magistrate")}
              >
                Add Magistrate
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-border/50">
                    <th className="py-2 px-4 text-[hsl(var(--police-blue))]">ID</th>
                    <th className="py-2 px-4 text-[hsl(var(--police-blue))]">Name</th>
                    <th className="py-2 px-4 text-[hsl(var(--police-blue))]">Status</th>
                    <th className="py-2 px-4 text-[hsl(var(--police-blue))]">Last Active</th>
                    <th className="py-2 px-4 text-[hsl(var(--police-blue))]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border/30">
                    <td className="py-2 px-4 text-white">MAG-001</td>
                    <td className="py-2 px-4 text-white">Judge Smith</td>
                    <td className="py-2 px-4">
                      <span className="px-2 py-1 bg-green-900/50 text-green-200 rounded-md text-xs">ACTIVE</span>
                    </td>
                    <td className="py-2 px-4 text-white">2023-09-20 14:30</td>
                    <td className="py-2 px-4">
                      <Button variant="ghost" size="sm" className="mr-1">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-400">Disable</Button>
                    </td>
                  </tr>
                  <tr className="border-t border-border/30">
                    <td className="py-2 px-4 text-white">MAG-002</td>
                    <td className="py-2 px-4 text-white">Judge Johnson</td>
                    <td className="py-2 px-4">
                      <span className="px-2 py-1 bg-green-900/50 text-green-200 rounded-md text-xs">ACTIVE</span>
                    </td>
                    <td className="py-2 px-4 text-white">2023-09-19 09:15</td>
                    <td className="py-2 px-4">
                      <Button variant="ghost" size="sm" className="mr-1">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-400">Disable</Button>
                    </td>
                  </tr>
                  <tr className="border-t border-border/30">
                    <td className="py-2 px-4 text-white">MAG-003</td>
                    <td className="py-2 px-4 text-white">Judge Davis</td>
                    <td className="py-2 px-4">
                      <span className="px-2 py-1 bg-amber-800/50 text-amber-200 rounded-md text-xs">INACTIVE</span>
                    </td>
                    <td className="py-2 px-4 text-white">2023-08-30 16:45</td>
                    <td className="py-2 px-4">
                      <Button variant="ghost" size="sm" className="mr-1">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-green-400">Enable</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="court-settings" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Court Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Court Name</label>
                <Input defaultValue="Los Santos Superior Court" className="max-w-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Default Session Duration</label>
                <Select defaultValue="20">
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Select minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Court Location</label>
                <Input defaultValue="Alta Street, Los Santos" className="max-w-md" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Court Rules</label>
                <Textarea 
                  defaultValue="1. All parties must appear promptly at the scheduled time.\n2. Professional attire is required.\n3. Respectful behavior is expected at all times.\n4. No weapons allowed in the courtroom." 
                  rows={5}
                />
              </div>
              
              <Button 
                className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                onClick={() => toast.success("Court settings saved successfully")}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between max-w-md p-3 border border-border rounded-md">
                <div>
                  <h4 className="font-medium">Discord Notifications</h4>
                  <p className="text-sm text-slate-400">Post court bookings to Discord</p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="discord-notifications"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between max-w-md p-3 border border-border rounded-md">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-slate-400">Send SMS reminders for bookings</p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="sms-notifications"
                    type="checkbox"
                    defaultChecked
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between max-w-md p-3 border border-border rounded-md">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-slate-400">Send email confirmations</p>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="mt-2">
                <label className="block text-sm font-medium text-muted-foreground mb-1">Notification Lead Time</label>
                <Select defaultValue="15">
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Select minutes before" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes before</SelectItem>
                    <SelectItem value="10">10 minutes before</SelectItem>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
                onClick={() => toast.success("Notification settings saved successfully")}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">System Configuration</h3>
            
            <div className="space-y-4 max-w-lg">
              <div>
                <h4 className="font-medium">System Information</h4>
                <div className="bg-slate-800 p-3 rounded-md mt-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-700">
                    <span className="text-slate-400">System Version:</span>
                    <span>1.2.4</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700">
                    <span className="text-slate-400">Last Updated:</span>
                    <span>2023-09-15</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Database Status:</span>
                    <span className="text-green-400">Connected</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Access Permissions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">Access Control</label>
                    <Select defaultValue="strict">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">Login Attempts</label>
                    <Select defaultValue="3">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select attempts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 mr-2"
                  onClick={() => toast.success("System settings saved successfully")}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
                
                <Button
                  variant="outline"
                  className="border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))]"
                  onClick={() => toast.info("System diagnostics check initiated")}
                >
                  Run Diagnostics
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MagistrateAdmin;
