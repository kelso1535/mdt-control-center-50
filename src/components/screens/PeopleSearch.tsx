
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DataSection from "@/components/DataSection"; // Changed from named import to default import
import DashedDivider from "@/components/DashedDivider";
import '@/styles/data.css';  // Using aliased import path
import VehicleSearch from "./VehicleSearch";

interface SearchResult {
  id: string;
  name: string;
  dob: string;
  address: string;
  gender: string;
  height: string;
  weight: string;
  phoneNumber: string;
  occupation: string;
  hasFarmProhibOrder: boolean;
  warrants: string[];
  criminalRecord: {
    charges: string[];
    convictions: string[];
  };
  weapons: {
    registered: string[];
    licenses: string[];
  };
  vehicles: {
    plate: string;
    model: string;
    color: string;
    registered: boolean;
    stolen: boolean;
  }[];
}

const PeopleSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showVehicles, setShowVehicles] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchTerm) {
      toast({
        title: "Search Error",
        description: "Please enter a name or ID to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulated API call
    setTimeout(() => {
      // Mock data for demonstration
      const mockPerson: SearchResult = {
        id: "CID9875421",
        name: "John Doe",
        dob: "1985-06-15",
        address: "123 Main St, Los Santos",
        gender: "Male",
        height: "6'1\"",
        weight: "185 lbs",
        phoneNumber: "555-123-4567",
        occupation: "Mechanic",
        hasFarmProhibOrder: false,
        warrants: ["None"],
        criminalRecord: {
          charges: ["Speeding (2023)", "Reckless Driving (2022)"],
          convictions: ["DUI (2021)", "Assault (2019)"]
        },
        weapons: {
          registered: ["Glock 19", "Remington 870"],
          licenses: ["Concealed Carry Permit", "Hunting License"]
        },
        vehicles: [
          { 
            plate: "ABC123", 
            model: "Albany Emperor", 
            color: "Black", 
            registered: true,
            stolen: false
          },
          { 
            plate: "XYZ789", 
            model: "Bravado Buffalo", 
            color: "Red", 
            registered: true,
            stolen: false
          }
        ]
      };

      setSearchResults(mockPerson);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewVehicles = () => {
    setShowVehicles(true);
  };

  return (
    <div className="p-4 bg-zinc-900 rounded-md h-full overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-white">People Search</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-zinc-800 text-white border-zinc-700"
        />
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      {searchResults && !showVehicles ? (
        <div className="mt-4 bg-zinc-800 p-4 rounded-lg border border-zinc-700">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-blue-400">{searchResults.name}</h3>
              <p className="text-gray-300">ID: {searchResults.id}</p>
              <p className="text-gray-300">DOB: {searchResults.dob}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-900 hover:text-white"
              >
                Add Flag
              </Button>
              <Button 
                variant="outline" 
                className="border-yellow-600 text-yellow-600 hover:bg-yellow-900 hover:text-white"
              >
                Add Note
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-900 hover:text-white"
                onClick={handleViewVehicles}
              >
                View Vehicles
              </Button>
            </div>
          </div>

          <DashedDivider /> {/* Removed the className prop here */}

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-zinc-900 text-gray-400">
              <TabsTrigger value="details" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white">Details</TabsTrigger>
              <TabsTrigger value="criminal" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white">Criminal Record</TabsTrigger>
              <TabsTrigger value="licenses" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white">Licenses & Weapons</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataSection title="Personal Information">
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-gray-400">Gender:</p>
                    <p className="text-white">{searchResults.gender}</p>
                    
                    <p className="text-gray-400">Height:</p>
                    <p className="text-white">{searchResults.height}</p>
                    
                    <p className="text-gray-400">Weight:</p>
                    <p className="text-white">{searchResults.weight}</p>
                    
                    <p className="text-gray-400">Phone:</p>
                    <p className="text-white">{searchResults.phoneNumber}</p>
                    
                    <p className="text-gray-400">Occupation:</p>
                    <p className="text-white">{searchResults.occupation}</p>
                  </div>
                </DataSection>
                
                <DataSection title="Address Information">
                  <div className="grid grid-cols-1 gap-2">
                    <p className="text-gray-400">Address:</p>
                    <p className="text-white">{searchResults.address}</p>
                  </div>
                </DataSection>
                
                <DataSection title="Active Warrants">
                  {searchResults.warrants.map((warrant, index) => (
                    <p key={index} className={`text-${warrant === "None" ? "green" : "red"}-500`}>
                      {warrant}
                    </p>
                  ))}
                </DataSection>
                
                <DataSection title="Owned Vehicles">
                  <p className="text-gray-300 mb-2">{searchResults.vehicles.length} registered vehicles</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleViewVehicles}
                    className="text-blue-400 border-blue-400 hover:bg-blue-900"
                  >
                    View All Vehicles
                  </Button>
                </DataSection>
              </div>
            </TabsContent>
            
            <TabsContent value="criminal" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataSection title="Charges">
                  {searchResults.criminalRecord.charges.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {searchResults.criminalRecord.charges.map((charge, index) => (
                        <li key={index} className="text-yellow-400">{charge}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-500">No charges on record</p>
                  )}
                </DataSection>
                
                <DataSection title="Convictions">
                  {searchResults.criminalRecord.convictions.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {searchResults.criminalRecord.convictions.map((conviction, index) => (
                        <li key={index} className="text-red-400">{conviction}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-500">No convictions on record</p>
                  )}
                </DataSection>
              </div>
            </TabsContent>
            
            <TabsContent value="licenses" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataSection title="Weapons">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-400">F/ARM PROHIB ORDER:</p>
                      <span className={`px-2 py-1 rounded text-white ${searchResults.hasFarmProhibOrder ? "bg-red-600" : "bg-green-600"}`}>
                        {searchResults.hasFarmProhibOrder ? "YES" : "NO"}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mt-2">Registered Weapons:</p>
                    <ul className="list-disc list-inside">
                      {searchResults.weapons.registered.map((weapon, index) => (
                        <li key={index} className="text-white">{weapon}</li>
                      ))}
                    </ul>
                  </div>
                </DataSection>
                
                <DataSection title="Licenses">
                  <ul className="list-disc list-inside">
                    {searchResults.weapons.licenses.map((license, index) => (
                      <li key={index} className="text-white">{license}</li>
                    ))}
                  </ul>
                </DataSection>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : searchResults && showVehicles ? (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">
              Vehicles owned by {searchResults.name}
            </h3>
            <Button
              variant="outline"
              onClick={() => setShowVehicles(false)}
              className="text-blue-400 border-blue-400 hover:bg-blue-900"
            >
              Back to Person
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.vehicles.map((vehicle, index) => (
              <div key={index} className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                <div className="flex justify-between">
                  <h4 className="text-blue-400 font-bold">{vehicle.plate}</h4>
                  <span className={`px-2 py-1 rounded text-xs text-white ${vehicle.stolen ? "bg-red-600" : "bg-green-600"}`}>
                    {vehicle.stolen ? "STOLEN" : "CLEAN"}
                  </span>
                </div>
                <p className="text-gray-300">{vehicle.color} {vehicle.model}</p>
                <p className="text-gray-400 text-sm">Registration: {vehicle.registered ? "Valid" : "Invalid"}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PeopleSearch;
