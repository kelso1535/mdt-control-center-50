
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, User, Users, Car, AlertTriangle, FileBadge } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdminProps {
  permissions?: {
    canManageWarrants?: boolean;
    canManageFines?: boolean;
    canManageOfficers?: boolean;
    canManageTemplates?: boolean;
    canManageFlags?: boolean;
    canAccessAdminPanel?: boolean;
    canViewAllRecords?: boolean;
    canEditRecords?: boolean;
    canManageRanks?: boolean;
  };
}

const Admin: React.FC<AdminProps> = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [adminPassword, setAdminPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    // In a real application, this would verify against a server
    // For now, we'll use a simple check
    if (adminPassword === 'admin123') {
      setIsVerified(true);
      toast.success("Admin access granted");
    } else {
      toast.error("Invalid admin password");
    }
  };

  if (!isVerified) {
    return (
      <div className="bg-card border border-border rounded-md p-6 max-w-xl mx-auto">
        <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold mb-6">Admin Authentication</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-foreground mb-1">Admin Password</label>
            <Input 
              id="admin-password" 
              type="password" 
              placeholder="Enter admin password" 
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleVerify} 
            className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Verify
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/30 border border-border rounded-md p-4">
      <h2 className="text-[hsl(var(--police-blue))] text-2xl font-bold mb-3">Admin Panel</h2>
      
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 mb-4">
          <TabsTrigger value="templates" className="text-xs">
            Templates
          </TabsTrigger>
          <TabsTrigger value="people" className="text-xs">
            People
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="text-xs">
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="serials" className="text-xs">
            Serials
          </TabsTrigger>
          <TabsTrigger value="fines" className="text-xs">
            Fines
          </TabsTrigger>
          <TabsTrigger value="officers" className="text-xs">
            Officers
          </TabsTrigger>
          <TabsTrigger value="system" className="text-xs">
            System
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Add New Template</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Template Name</label>
                <Input placeholder="Enter template name" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Template Type</label>
                <Select defaultValue="warrant">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="warrant">Warrant</SelectItem>
                    <SelectItem value="arrest-report">Arrest Report</SelectItem>
                    <SelectItem value="citation">Citation</SelectItem>
                    <SelectItem value="incident">Incident Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Section 1 Content</label>
                <Textarea placeholder="Enter template section 1 content" className="min-h-[100px] w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground">Section 2 Content</label>
                <Textarea placeholder="Enter template section 2 content" className="min-h-[100px] w-full" />
              </div>
              
              <Button className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80">
                Add Template
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="people" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">People Management</h3>
            <p>Manage citizen records, criminal histories, and personal flags.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="vehicles" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Vehicle Management</h3>
            <p>Manage vehicle registrations, stolen vehicles, and impound records.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="serials" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Serial Number Management</h3>
            <p>Manage weapon serial numbers, stolen weapons, and registered items.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="fines" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Fine Management</h3>
            <p>Configure fine amounts and categories for citations.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="officers" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Officer Management</h3>
            <p>Manage officer accounts, ranks, and permissions.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="p-0">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">System Configuration</h3>
            <p>Configure system-wide settings and parameters.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
