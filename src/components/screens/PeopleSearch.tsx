import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Person, Vehicle } from '@/types';
import DataSection from '../DataSection';
import DashedDivider from '../DashedDivider';

const mockPerson: Person = {
  id: '12345',
  name: 'Braxton Jones',
  dob: '1972-3-23',
  gender: 'M',
  address: 'STRAWBERRY, LOS SANTOS',
  phone: '5836764',
  licenseClass: '[CAR] [RIDER]',
  licenseExpiry: '2023-11-13 00:00 AM',
  licenseStatus: 'CURRENT',
  demeritPoints: 0,
  flags: {
    wanted: false,
    bail: false,
    possessWeapon: false,
    violencePolice: true,
    violence: false,
  },
  weapons: {
    longarm: false,
    concealCarry: false,
    prohibOrder: false,
    handgun: false,
  },
  imageUrl: '/lovable-uploads/1384504f-656b-468e-adff-9af978864dfb.png',
  ownedVehicles: [
    {
      id: 'v12345',
      plate: 'ABC123',
      model: 'BUFFALO STX',
      color: 'BLACK',
      owner: 'Braxton Jones',
      registration: 'VALID',
      flags: {
        stolen: false,
        wanted: false
      }
    },
    {
      id: 'v67890',
      plate: 'XYZ789',
      model: 'SULTAN RS',
      color: 'BLUE',
      owner: 'Braxton Jones',
      registration: 'VALID',
      flags: {
        stolen: false,
        wanted: false
      }
    }
  ]
};

interface PeopleSearchProps {
  onPersonFound?: (person: Person | null) => void;
}

const PeopleSearch: React.FC<PeopleSearchProps> = ({ onPersonFound }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a name to search');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setSearchResult(mockPerson);
      if (onPersonFound) {
        onPersonFound(mockPerson);
      }
      setLoading(false);
      toast.success(`Search complete for "${searchQuery}"`);
    }, 800);
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="section-header">
      <div className="section-line"></div>
      <div className="section-title">------- {title} -------</div>
      <div className="section-line"></div>
    </div>
  );

  return (
    <div className="fade-in">
      <h2 className="text-xl text-[hsl(var(--police-blue))] font-bold mb-2">Search Person</h2>
      
      <div className="flex space-x-2 mb-2">
        <Input
          type="text"
          placeholder="Enter name to search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <Button 
          onClick={handleSearch}
          className="bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Run Person Check'}
        </Button>
      </div>
      
      {searchResult && (
        <div className="bg-card border border-border rounded-md p-2 mt-2 animate-slide-in overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="flex justify-between">
            <div className="flex-1">
              <SectionHeader title="LEAP DATABASE ENTRY" />
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                <div className="data-line">
                  <span>NAME:</span>
                  <span>{searchResult.name}</span>
                </div>
                <div className="data-line">
                  <span>DOB:</span>
                  <span>{searchResult.dob}</span>
                </div>
                <div className="data-line">
                  <span>SEX:</span>
                  <span>{searchResult.gender}</span>
                </div>
                <div className="data-line">
                  <span>HOME ADDR:</span>
                  <span>{searchResult.address}</span>
                </div>
                <div className="data-line">
                  <span>PHONE NO:</span>
                  <span>{searchResult.phone}</span>
                </div>
              </div>
              
              <DashedDivider />
              
              <SectionHeader title="ROAD TRAFFIC AUTHORITY" />
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                <div className="data-line">
                  <span>LIC CLASS:</span>
                  <span>{searchResult.licenseClass}</span>
                </div>
                <div className="data-line">
                  <span>LIC STATUS:</span>
                  <span>{searchResult.licenseStatus}</span>
                </div>
                <div className="data-line">
                  <span>EXPIRES:</span>
                  <span>{searchResult.licenseExpiry}</span>
                </div>
                <div></div>
                <div className="data-line">
                  <span>CONDITIONS:</span>
                  <span>{searchResult.demeritPoints === 0 ? 'NONE' : 'POINTS'}</span>
                </div>
                <div className="data-line">
                  <span>DEMERIT PTS:</span>
                  <span>{searchResult.demeritPoints} (LAST 7 DAYS)</span>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="w-full">
                <SectionHeader title="FLAGS" />
                
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="data-line">
                    <span>WANTED:</span>
                    <span>{searchResult.flags.wanted ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>VIOLENCE POLICE:</span>
                    <span>{searchResult.flags.violencePolice ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>BAIL:</span>
                    <span>{searchResult.flags.bail ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>VIOLENCE:</span>
                    <span>{searchResult.flags.violence ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>POS WEAP:</span>
                    <span>{searchResult.flags.possessWeapon ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              </div>
              
              <DashedDivider />
              
              <div className="w-full">
                <SectionHeader title="WEAPONS" />
                
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="data-line">
                    <span>WEAPON LONGARM:</span>
                    <span>{searchResult.weapons.longarm ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>HANDGUN:</span>
                    <span>{searchResult.weapons.handgun ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>CONCEAL CARRY PERMIT:</span>
                    <span>{searchResult.weapons.concealCarry ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="data-line">
                    <span>F/ARM PROHIB ORDER:</span>
                    <span>{searchResult.weapons.prohibOrder ? 'YES' : 'NO'}</span>
                  </div>
                </div>
              </div>
              
              <DashedDivider />
              
              <SectionHeader title="OTHER" />
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                <div className="data-line">
                  <span>DNA ON FILE:</span>
                  <span>CURRENT ON FILE</span>
                </div>
                <div className="data-line">
                  <span>FINE / CHARGE:</span>
                  <span>$ - AS NECESSARY</span>
                </div>
              </div>
              
              {searchResult.ownedVehicles && searchResult.ownedVehicles.length > 0 && (
                <>
                  <DashedDivider />
                  
                  <SectionHeader title="REGISTERED VEHICLES" />
                  
                  <div className="grid grid-cols-1 gap-y-2">
                    {searchResult.ownedVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="bg-card/60 border border-border/50 rounded p-2">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                          <div className="data-line">
                            <span>PLATE:</span>
                            <span className="text-white">{vehicle.plate}</span>
                          </div>
                          <div className="data-line">
                            <span>MODEL:</span>
                            <span className="text-white">{vehicle.model}</span>
                          </div>
                          
                          <div className="data-line">
                            <span>COLOR:</span>
                            <span className="text-white">{vehicle.color}</span>
                          </div>
                          <div className="data-line">
                            <span>REGISTRATION:</span>
                            <span className={vehicle.registration === 'VALID' ? 'text-white' : 'text-destructive'}>
                              {vehicle.registration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {searchResult.imageUrl && (
              <div className="ml-3">
                <img 
                  src={searchResult.imageUrl} 
                  alt={searchResult.name} 
                  className="w-32 h-32 object-cover rounded-md border border-border"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleSearch;
