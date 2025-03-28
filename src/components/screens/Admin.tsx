import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Trash, X, Ban, ShieldX, Users, BadgeAlert, FileWarning, CircleDollarSign, UserCog, ShieldCheck } from 'lucide-react';
import { OfficerRank, PermissionLevel } from '@/types';

interface Template {
  id: string;
  name: string;
  section1: string;
  section2: string;
  type: string;
}

interface AdminProps {
  permissions: PermissionLevel;
}

const Admin: React.FC<AdminProps> = ({ permissions }) => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 'template1',
      name: 'Pursuit Template',
      type: 'Warrant',
      section1: 'Outstanding Warrant for Questioning - FIRSTNAME LASTNAME\n\nList of Charges and/or PINS:\n- Engage in a Police pursuit / Evade Police',
      section2: 'Preliminary Details\nTime: xxxx HRS\nDate: xx/xx/20\n\nWarrant Details:\n[CALL SIGN] signalled for [VEHICLE DESCRIPTION] to stop. The driver of the vehicle deliberately increased their speed and engaged in a police pursuit. The vehicle was successful in evading police. The registered owner of the vehicle is [REGISTERED OWNER\'S NAME] and the vehicle was NOT listed as stolen at the time of the pursuit. The accused is required to provide evidence of the driver at the time of the incident or they are to be charged with the above charges as the registered owner of the vehicle.\n\nEvidence:\nEvidence Locker: \n\n- Example: Highway Patrol Radar Print Out\n\nANPR Hits:\nIf applicable - to be copied from your MDT\n\nVicRoads Profile:\nTo be copied and pasted after running a vehicle check on the license plate\n\nSigned,\nFIRSTNAME LASTNAME\nRank | Callsign\nVictoria Police'
    },
    {
      id: 'template2',
      name: 'Stolen Weapon Template',
      type: 'Serial# KALOF',
      section1: 'SERIAL KALOF - Reported stolen\n\nCHARGES: \n-Robbery\n-Possess a [Class A / B / C] firearm without legal authority',
      section2: 'Preliminary Details:\nTime: xxxx HRS\nDate: xx/xx/20\n\nAt Approx. [TIME]hrs [CALL SIGN] responded to a 000 call in relation to a stolen weapon. After discussing with [REGISTERED OWNER], it was ascertained that they had complied with their weapons license and had their [Weapon type] stolen by an individual, [NAME|DESCRIPTION|UNKOWN]. \n\n[Serial information to be Copy and Pasted here]\n\nWhoever is found in possession of this firearm is to be charged with the above offence(s) and any others attached to this firearm serial.'
    }
  ]);

  const [newTemplate, setNewTemplate] = useState<Omit<Template, 'id'>>({
    name: '',
    type: 'Warrant',
    section1: '',
    section2: ''
  });

  const [personId, setPersonId] = useState('');
  const [personName, setPersonName] = useState('');
  const [personFlags, setPersonFlags] = useState({
    wanted: false,
    bail: false,
    possessWeapon: false,
    violencePolice: false,
    violence: false
  });

  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('');
  const [vehicleFlags, setVehicleFlags] = useState({
    stolen: false,
    wanted: false
  });

  const [serialNumber, setSerialNumber] = useState('');
  const [serialType, setSerialType] = useState('');
  const [serialOwner, setSerialOwner] = useState('');
  const [serialFlags, setSerialFlags] = useState({
    stolen: false,
    wanted: false
  });

  const [citizenId, setCitizenId] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [fineReason, setFineReason] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [revocationCitizenId, setRevocationCitizenId] = useState('');
  const [revocationType, setRevocationType] = useState('fine');

  const [officerId, setOfficerId] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [officerCallsign, setOfficerCallsign] = useState('');
  const [officerRank, setOfficerRank] = useState<OfficerRank>('Officer');
  const [officerStatus, setOfficerStatus] = useState('On Duty');
  const [officers, setOfficers] = useState([
    { id: '1', name: 'John Smith', callsign: 'L-30', rank: 'Lieutenant', status: 'On Duty' },
    { id: '2', name: 'Jane Doe', callsign: 'S-20', rank: 'Sergeant', status: 'On Duty' },
    { id: '3', name: 'Mike Johnson', callsign: 'O-10', rank: 'Officer', status: 'Off Duty' }
  ]);

  const [totalFines, setTotalFines] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [monthlyCollection, setMonthlyCollection] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [15000, 22000, 18500, 25000, 30000, 28000]
  });
  const [topOffenders, setTopOffenders] = useState([
    { id: 'off1', name: 'John Smith', amount: 35000 },
    { id: 'off2', name: 'Sarah Johnson', amount: 28000 },
    { id: 'off3', name: 'Michael Brown', amount: 22000 },
    { id: 'off4', name: 'Emily Davis', amount: 18500 },
    { id: 'off5', name: 'David Wilson', amount: 15000 }
  ]);

  const handleAuthenticate = () => {
    if (password === 'admin123') {
      setAuthenticated(true);
      toast.success('Admin authentication successful');
    } else {
      toast.error('Invalid admin password');
    }
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.section1 || !newTemplate.section2) {
      toast.error('Please fill all template fields');
      return;
    }

    const newTemplateWithId = {
      ...newTemplate,
      id: `template${Date.now()}`
    };

    setTemplates([...templates, newTemplateWithId]);
    setNewTemplate({
      name: '',
      type: 'Warrant',
      section1: '',
      section2: ''
    });

    toast.success('Template added successfully');
  };

  const handleEditTemplate = (template: Template) => {
    setNewTemplate({
      name: template.name,
      type: template.type,
      section1: template.section1,
      section2: template.section2
    });
    setSelectedTemplate(template.id);
    setEditMode(true);
  };

  const handleUpdateTemplate = () => {
    if (!selectedTemplate) return;

    const updatedTemplates = templates.map(template => 
      template.id === selectedTemplate 
        ? { ...template, ...newTemplate } 
        : template
    );

    setTemplates(updatedTemplates);
    setNewTemplate({
      name: '',
      type: 'Warrant',
      section1: '',
      section2: ''
    });
    setSelectedTemplate(null);
    setEditMode(false);
    toast.success('Template updated successfully');
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast.success('Template deleted successfully');
  };

  const handleIssueFine = () => {
    if (!citizenId || !fineAmount || !fineReason) {
      toast.error('Please fill all fine fields');
      return;
    }

    toast.success(`Fine of $${fineAmount} issued to ${citizenId} for ${fineReason}`);
    setCitizenId('');
    setFineAmount('');
    setFineReason('');
  };

  const handleUpdatePerson = () => {
    if (!personId || !personName) {
      toast.error('Please enter person ID and name');
      return;
    }
    toast.success(`Person record for ${personName} updated successfully`);
    setPersonId('');
    setPersonName('');
    setPersonFlags({
      wanted: false,
      bail: false,
      possessWeapon: false,
      violencePolice: false,
      violence: false
    });
  };

  const handleUpdateVehicle = () => {
    if (!vehiclePlate || !vehicleModel || !vehicleOwner) {
      toast.error('Please fill all vehicle fields');
      return;
    }
    toast.success(`Vehicle record for ${vehiclePlate} updated successfully`);
    setVehiclePlate('');
    setVehicleModel('');
    setVehicleOwner('');
    setVehicleFlags({
      stolen: false,
      wanted: false
    });
  };

  const handleUpdateSerial = () => {
    if (!serialNumber || !serialType || !serialOwner) {
      toast.error('Please fill all serial fields');
      return;
    }
    toast.success(`Serial record ${serialNumber} updated successfully`);
    setSerialNumber('');
    setSerialType('');
    setSerialOwner('');
    setSerialFlags({
      stolen: false,
      wanted: false
    });
  };

  const handleClearHistory = () => {
    toast.success('Search history cleared successfully');
  };

  const handleRevokeAction = () => {
    if (!revocationCitizenId) {
      toast.error('Please enter a citizen ID');
      return;
    }
    
    let successMessage = '';
    switch (revocationType) {
      case 'fine':
        successMessage = `Fine removed for citizen ${revocationCitizenId}`;
        break;
      case 'bail':
        successMessage = `Bail conditions removed for citizen ${revocationCitizenId}`;
        break;
      case 'warrant':
        successMessage = `Warrant removed for citizen ${revocationCitizenId}`;
        break;
      case 'flag':
        successMessage = `Flags removed for citizen ${revocationCitizenId}`;
        break;
      default:
        successMessage = `Action successfully revoked for citizen ${revocationCitizenId}`;
    }
    
    toast.success(successMessage);
    setRevocationCitizenId('');
  };

  const handleAddOfficer = () => {
    if (!officerName || !officerCallsign) {
      toast.error('Please fill all officer fields');
      return;
    }

    const newOfficer = {
      id: `officer-${Date.now()}`,
      name: officerName,
      callsign: officerCallsign,
      rank: officerRank,
      status: officerStatus
    };

    setOfficers([...officers, newOfficer]);
    toast.success(`Officer ${officerName} added successfully`);
    setOfficerName('');
    setOfficerCallsign('');
    setOfficerRank('Officer');
    setOfficerStatus('On Duty');
  };

  const handleUpdateOfficer = () => {
    if (!officerId) {
      toast.error('No officer selected for update');
      return;
    }

    const updatedOfficers = officers.map(officer => 
      officer.id === officerId 
        ? { 
            ...officer, 
            name: officerName || officer.name, 
            callsign: officerCallsign || officer.callsign,
            rank: officerRank || officer.rank as OfficerRank,
            status: officerStatus || officer.status
          } 
        : officer
    );

    setOfficers(updatedOfficers);
    toast.success(`Officer updated successfully`);
    setOfficerId('');
    setOfficerName('');
    setOfficerCallsign('');
    setOfficerRank('Officer');
    setOfficerStatus('On Duty');
  };

  const handleRemoveOfficer = (id: string) => {
    setOfficers(officers.filter(officer => officer.id !== id));
    toast.success('Officer removed successfully');
  };

  const loadFinancialData = () => {
    setTotalFines(485000);
    setTotalPaid(325000);
    setTotalOutstanding(160000);
  };

  useEffect(() => {
    if (authenticated && permissions.canAccessAdminPanel) {
      loadFinancialData();
    }
  }, [authenticated, permissions.canAccessAdminPanel]);

  if (!authenticated && !permissions.canAccessAdminPanel) {
    return (
      <div className="fade-in p-4">
        <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-6">Admin Authentication</h2>
        
        <div className="bg-card/30 border border-border rounded-md p-6 max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
              Admin Password
            </label>
            <Input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-border text-white"
              placeholder="Enter admin password"
            />
          </div>
          
          <Button 
            onClick={handleAuthenticate}
            className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
          >
            Authenticate
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-3">Admin Panel</h2>
      <div className="text-sm text-muted-foreground mb-4">
        Access level: {Object.entries(permissions).filter(([_, v]) => v).length} / {Object.keys(permissions).length} permissions
      </div>
      
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid grid-cols-8 mb-4">
          <TabsTrigger value="templates" disabled={!permissions.canManageTemplates}>
            <FileWarning className="w-4 h-4 mr-1" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="people" disabled={!permissions.canManageFlags}>
            <Users className="w-4 h-4 mr-1" />
            People
          </TabsTrigger>
          <TabsTrigger value="vehicles" disabled={!permissions.canManageFlags}>
            <BadgeAlert className="w-4 h-4 mr-1" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="serials" disabled={!permissions.canManageFlags}>
            <BadgeAlert className="w-4 h-4 mr-1" />
            Serials
          </TabsTrigger>
          <TabsTrigger value="fines" disabled={!permissions.canManageFines}>
            <CircleDollarSign className="w-4 h-4 mr-1" />
            Fines
          </TabsTrigger>
          <TabsTrigger value="officers" disabled={!permissions.canManageOfficers}>
            <UserCog className="w-4 h-4 mr-1" />
            Officers
          </TabsTrigger>
          <TabsTrigger value="system" disabled={!permissions.canAccessAdminPanel}>
            <ShieldCheck className="w-4 h-4 mr-1" />
            System
          </TabsTrigger>
          <TabsTrigger value="financial" disabled={!permissions.canAccessAdminPanel}>
            <CircleDollarSign className="w-4 h-4 mr-1" />
            Financial
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                {editMode ? 'Edit Template' : 'Add New Template'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Template Name
                  </label>
                  <Input 
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="bg-black/50 border-border text-white"
                    placeholder="Enter template name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Template Type
                  </label>
                  <Select 
                    value={newTemplate.type}
                    onValueChange={(value) => setNewTemplate({...newTemplate, type: value})}
                  >
                    <SelectTrigger className="bg-black/50 border-border text-white">
                      <SelectValue placeholder="Select template type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arrest Report">Arrest Report</SelectItem>
                      <SelectItem value="Warrant">Warrant</SelectItem>
                      <SelectItem value="Serial# KALOF">Serial# KALOF</SelectItem>
                      <SelectItem value="Field Contact Report">Field Contact Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Section 1 Content
                  </label>
                  <Textarea 
                    value={newTemplate.section1}
                    onChange={(e) => setNewTemplate({...newTemplate, section1: e.target.value})}
                    className="h-32 bg-black/50 border-border text-white"
                    placeholder="Enter template section 1 content"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Section 2 Content
                  </label>
                  <Textarea 
                    value={newTemplate.section2}
                    onChange={(e) => setNewTemplate({...newTemplate, section2: e.target.value})}
                    className="h-32 bg-black/50 border-border text-white"
                    placeholder="Enter template section 2 content"
                  />
                </div>
                
                <div>
                  {editMode ? (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleUpdateTemplate}
                        className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                      >
                        Update Template
                      </Button>
                      <Button 
                        onClick={() => {
                          setEditMode(false);
                          setSelectedTemplate(null);
                          setNewTemplate({
                            name: '',
                            type: 'Warrant',
                            section1: '',
                            section2: ''
                          });
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleAddTemplate}
                      className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                    >
                      Add Template
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Template List
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="text-police-blue py-2 px-2">Name</th>
                    <th className="text-police-blue py-2 px-2">Type</th>
                    <th className="text-police-blue py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((template) => (
                    <tr key={template.id} className="border-b border-border/30">
                      <td className="py-2 px-2 text-police-blue">{template.name}</td>
                      <td className="py-2 px-2 text-police-blue">{template.type}</td>
                      <td className="py-2 px-2">
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleEditTemplate(template)}
                            variant="outline" 
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleDeleteTemplate(template.id)}
                            variant="destructive" 
                            size="sm"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="people">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Manage Person Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Person ID
                </label>
                <Input 
                  value={personId}
                  onChange={(e) => setPersonId(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter person ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Full Name
                </label>
                <Input 
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter person name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[hsl(var(--police-blue))] font-medium mb-2">Person Flags</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-wanted"
                    checked={personFlags.wanted}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, wanted: checked})}
                  />
                  <Label htmlFor="flag-wanted">Wanted</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-bail"
                    checked={personFlags.bail}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, bail: checked})}
                  />
                  <Label htmlFor="flag-bail">Bail</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-possessWeapon"
                    checked={personFlags.possessWeapon}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, possessWeapon: checked})}
                  />
                  <Label htmlFor="flag-possessWeapon">Possess Weapon</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-violencePolice"
                    checked={personFlags.violencePolice}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, violencePolice: checked})}
                  />
                  <Label htmlFor="flag-violencePolice">Violence Against Police</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="flag-violence"
                    checked={personFlags.violence}
                    onCheckedChange={(checked) => setPersonFlags({...personFlags, violence: checked})}
                  />
                  <Label htmlFor="flag-violence">Violence</Label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdatePerson}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Update Person Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="vehicles">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Manage Vehicle Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  License Plate
                </label>
                <Input 
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter license plate"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Vehicle Model
                </label>
                <Input 
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter vehicle model"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Owner Name
                </label>
                <Input 
                  value={vehicleOwner}
                  onChange={(e) => setVehicleOwner(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter owner name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[hsl(var(--police-blue))] font-medium mb-2">Vehicle Flags</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="vehicle-flag-stolen"
                    checked={vehicleFlags.stolen}
                    onCheckedChange={(checked) => setVehicleFlags({...vehicleFlags, stolen: checked})}
                  />
                  <Label htmlFor="vehicle-flag-stolen">Stolen</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="vehicle-flag-wanted"
                    checked={vehicleFlags.wanted}
                    onCheckedChange={(checked) => setVehicleFlags({...vehicleFlags, wanted: checked})}
                  />
                  <Label htmlFor="vehicle-flag-wanted">Wanted</Label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdateVehicle}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Update Vehicle Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="serials">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Manage Serial Records
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Serial Number
                </label>
                <Input 
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter serial number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Serial Type
                </label>
                <Select 
                  value={serialType}
                  onValueChange={(value) => setSerialType(value)}
                >
                  <SelectTrigger className="bg-black/50 border-border text-white">
                    <SelectValue placeholder="Select serial type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Firearm">Firearm</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                  Owner Name
                </label>
                <Input 
                  value={serialOwner}
                  onChange={(e) => setSerialOwner(e.target.value)}
                  className="bg-black/50 border-border text-white"
                  placeholder="Enter owner name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-[hsl(var(--police-blue))] font-medium mb-2">Serial Flags</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="serial-flag-stolen"
                    checked={serialFlags.stolen}
                    onCheckedChange={(checked) => setSerialFlags({...serialFlags, stolen: checked})}
                  />
                  <Label htmlFor="serial-flag-stolen">Stolen</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="serial-flag-wanted"
                    checked={serialFlags.wanted}
                    onCheckedChange={(checked) => setSerialFlags({...serialFlags, wanted: checked})}
                  />
                  <Label htmlFor="serial-flag-wanted">Wanted</Label>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleUpdateSerial}
              className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
            >
              Update Serial Record
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="fines">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                Issue Fine
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Citizen ID
                  </label>
                  <Input 
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value)}
                    className="bg-black/50 border-border text-white"
                    placeholder="Enter citizen ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Fine Amount
                  </label>
                  <Input 
                    type="number"
                    value={fineAmount}
                    onChange={(e) => setFineAmount(e.target.value)}
                    className="bg-black/50 border-border text-white"
                    placeholder="Enter fine amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Reason
                  </label>
                  <Textarea 
                    value={fineReason}
                    onChange={(e) => setFineReason(e.target.value)}
                    className="h-24 bg-black/50 border-border text-white"
                    placeholder="Enter fine reason"
                  />
                </div>
                
                <Button 
                  onClick={handleIssueFine}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                >
                  Issue Fine
                </Button>
              </div>
            </div>
            
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                Revoke Police Actions
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use this section to remove fines, warrants, or flags that may have been accidentally applied to citizens.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Citizen ID
                  </label>
                  <Input 
                    value={revocationCitizenId}
                    onChange={(e) => setRevocationCitizenId(e.target.value)}
                    className="bg-black/50 border-border text-white"
                    placeholder="Enter citizen ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Action to Revoke
                  </label>
                  <Select 
                    value={revocationType}
                    onValueChange={(value) => setRevocationType(value)}
                  >
                    <SelectTrigger className="bg-black/50 border-border text-white">
                      <SelectValue placeholder="Select action to revoke" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fine">Fine</SelectItem>
                      <SelectItem value="bail">Bail Conditions</SelectItem>
                      <SelectItem value="warrant">Warrant</SelectItem>
                      <SelectItem value="flag">Person Flags</SelectItem>
                      <SelectItem value="vehicle">Vehicle Flags</SelectItem>
                      <SelectItem value="weapon">Weapon Restrictions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleRevokeAction}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                >
                  Revoke Action
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="officers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                Manage Officers
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Officer Name
                  </label>
                  <Input 
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="bg-black/50 border-border text-white"
                    placeholder="Enter officer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Callsign
                  </label>
                  <Input 
                    value={officerCallsign}
                    onChange={(e) => setOfficerCallsign(e.target.value)}
                    className="bg-black/50 border-border text-white"
                    placeholder="Enter callsign"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Rank
                  </label>
                  <Select 
                    value={officerRank}
                    onValueChange={(value) => setOfficerRank(value as OfficerRank)}
                  >
                    <SelectTrigger className="bg-black/50 border-border text-white">
                      <SelectValue placeholder="Select rank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Officer">Officer</SelectItem>
                      <SelectItem value="Senior Officer">Senior Officer</SelectItem>
                      <SelectItem value="Sergeant">Sergeant</SelectItem>
                      <SelectItem value="Lieutenant">Lieutenant</SelectItem>
                      <SelectItem value="Captain">Captain</SelectItem>
                      <SelectItem value="Assistant Chief">Assistant Chief</SelectItem>
                      <SelectItem value="Chief of Police">Chief of Police</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                    Status
                  </label>
                  <Select 
                    value={officerStatus}
                    onValueChange={(value) => setOfficerStatus(value)}
                  >
                    <SelectTrigger className="bg-black/50 border-border text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On Duty">On Duty</SelectItem>
                      <SelectItem value="Off Duty">Off Duty</SelectItem>
                      <SelectItem value="Leave">On Leave</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddOfficer}
                    className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                  >
                    Add Officer
                  </Button>
                  
                  <Button 
                    onClick={handleUpdateOfficer}
                    variant="outline"
                    disabled={!officerId}
                  >
                    Update Selected
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                Permission Summary
              </h3>
              
              <div className="space-y-2 text-sm">
                <h4 className="font-medium">Chief of Police / Assistant Chief</h4>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Full access to all MDT functions</li>
                  <li>Can manage officer ranks and assignments</li>
                  <li>Can create/edit templates</li>
                  <li>Full administrative rights</li>
                </ul>
                
                <h4 className="font-medium mt-3">Captain / Lieutenant</h4>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Can manage warrants and fines</li>
                  <li>Can manage flags and system settings</li>
                  <li>Limited administrative access</li>
                </ul>
                
                <h4 className="font-medium mt-3">Sergeant</h4>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Can issue/revoke warrants</li>
                  <li>Can modify flags</li>
                  <li>Limited management functions</li>
                </ul>
                
                <h4 className="font-medium mt-3">Senior Officer / Officer</h4>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>Basic MDT access</li>
                  <li>Search and view records</li>
                  <li>No administrative functions</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              Officer List
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="text-police-blue py-2 px-2">Name</th>
                    <th className="text-police-blue py-2 px-2">Callsign</th>
                    <th className="text-police-blue py-2 px-2">Rank</th>
                    <th className="text-police-blue py-2 px-2">Status</th>
                    <th className="text-police-blue py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {officers.map((officer) => (
                    <tr key={officer.id} className="border-b border-border/30">
                      <td className="py-2 px-2 text-police-blue">{officer.name}</td>
                      <td className="py-2 px-2 text-police-blue">{officer.callsign}</td>
                      <td className="py-2 px-2 text-police-blue">{officer.rank}</td>
                      <td className="py-2 px-2 text-police-blue">{officer.status}</td>
                      <td className="py-2 px-2">
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => {
                              setOfficerId(officer.id);
                              setOfficerName(officer.name);
                              setOfficerCallsign(officer.callsign);
                              setOfficerRank(officer.rank as OfficerRank);
                              setOfficerStatus(officer.status);
                            }}
                            variant="outline" 
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleRemoveOfficer(officer.id)}
                            variant="destructive" 
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="bg-card/30 border border-border rounded-md p-4">
            <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
              System Maintenance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[hsl(var(--police-blue))] font-medium mb-3">Clear Search History</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This will clear all search history records from the database.
                </p>
                <Button 
                  onClick={handleClearHistory}
                  variant="destructive"
                >
                  Clear All Search History
                </Button>
              </div>
              
              <div>
                <h4 className="text-[hsl(var(--police-blue))] font-medium mb-3">Database Backup</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a backup of the entire MDT database.
                </p>
                <Button 
                  onClick={() => toast.success('Database backup created successfully')}
                  className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                >
                  Create Database Backup
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="financial">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card/30 border border-border rounded-md p-4 text-center">
                <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-2">Total Fines Issued</h3>
                <p className="text-2xl font-bold text-white">${totalFines.toLocaleString()}</p>
              </div>
              
              <div className="bg-card/30 border border-border rounded-md p-4 text-center">
                <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-2">Total Fines Paid</h3>
                <p className="text-2xl font-bold text-green-400">${totalPaid.toLocaleString()}</p>
              </div>
              
              <div className="bg-card/30 border border-border rounded-md p-4 text-center">
                <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-2">Outstanding Debt</h3>
                <p className="text-2xl font-bold text-red-500">${totalOutstanding.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                Monthly Collections
              </h3>
              <div className="h-64 bg-black/20 border border-[hsl(var(--police-blue))]/30 rounded p-4 flex items-center justify-center">
                <p className="text-muted-foreground">Collection statistics chart would display here</p>
              </div>
            </div>
            
            <div className="bg-card/30 border border-border rounded-md p-4">
              <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                Top Offenders (Highest Outstanding Debt)
              </h3>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="text-[hsl(var(--police-blue))] py-2 px-2">Name</th>
                    <th className="text-[hsl(var(--police-blue))] py-2 px-2 text-right">Outstanding Amount</th>
                    <th className="text-[hsl(var(--police-blue))] py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topOffenders.map(offender => (
                    <tr key={offender.id} className="border-b border-border/30">
                      <td className="py-2 px-2 text-white">{offender.name}</td>
                      <td className="py-2 px-2 text-red-500 text-right">${offender.amount.toLocaleString()}</td>
                      <td className="py-2 px-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="outline">Send Notice</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card/30 border border-border rounded-md p-4">
                <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                  Generate Financial Report
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                      Report Type
                    </label>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="bg-black/50 border-border text-white">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Report</SelectItem>
                        <SelectItem value="weekly">Weekly Report</SelectItem>
                        <SelectItem value="monthly">Monthly Report</SelectItem>
                        <SelectItem value="quarterly">Quarterly Report</SelectItem>
                        <SelectItem value="annual">Annual Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white"
                      onClick={() => toast.success('Report generated successfully')}
                    >
                      Generate Report
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => toast.success('Report exported successfully')}
                    >
                      Export to PDF
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/30 border border-border rounded-md p-4">
                <h3 className="text-lg text-[hsl(var(--police-blue))] font-semibold mb-4">
                  Outstanding Debt Management
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--police-blue))] mb-1">
                      Automated Reminder Settings
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="remind-7days" />
                        <Label htmlFor="remind-7days">Send reminders after 7 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="remind-14days" defaultChecked />
                        <Label htmlFor="remind-14days">Send reminders after 14 days</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="remind-30days" defaultChecked />
                        <Label htmlFor="remind-30days">Send reminders after 30 days</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/80 text-white w-full"
                    onClick={() => toast.success('Reminders sent successfully')}
                  >
                    Send All Due Reminders Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
