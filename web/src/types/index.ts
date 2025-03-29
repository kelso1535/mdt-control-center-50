
// OfficerStatus and other types
export type OfficerStatus = 
  | 'Code 1 On Patrol'
  | 'Code 2 Arrived at Station'
  | 'Code 4 Traffic Stop'
  | 'Code 5 Arrived on Scene'
  | 'Code 6 Unavailable';

export interface Person {
  id: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  licenseStatus: string;
  flags: {
    wanted: boolean;
    bail: boolean;
    possessWeapon: boolean;
    violencePolice: boolean;
    violence: boolean;
  };
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  owner: string;
  registration: 'VALID' | 'EXPIRED' | 'SUSPENDED';
  flags: {
    stolen: boolean;
    wanted: boolean;
  };
}

export interface Warrant {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  count: number;
}

export interface PoliceUnit {
  callsign: string;
  pin: string;
  name: string;
  updated: string;
  status: string;
  location: string;
  phone: string;
}

export interface PermissionLevel {
  isLeadership: boolean;
}

export type OfficerRank = 
  | 'Officer'
  | 'Leadership';
