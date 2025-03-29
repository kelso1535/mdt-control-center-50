
export interface Person {
  id: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  licenseClass: string;
  licenseExpiry: string;
  licenseStatus: string;
  demeritPoints: number;
  flags: {
    wanted: boolean;
    bail: boolean;
    possessWeapon: boolean;
    violencePolice: boolean;
    violence: boolean;
  };
  weapons: {
    longarm: boolean;
    concealCarry: boolean;
    prohibOrder: boolean;
    handgun: boolean;
  };
  imageUrl?: string;
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

export interface Serial {
  id: string;
  serial: string;
  type: string;
  model: string;
  owner: string;
  status: string;
  registeredDate: string;
  flags: {
    stolen: boolean;
    wanted: boolean;
  };
}

export interface CriminalRecord {
  id: string;
  date: string;
  paid: boolean;
  amount: number;
  offense: string;
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
  description: string;
}

export interface TrafficOffence {
  id: string;
  date: string;
  paid?: boolean;
  amount: number;
  details: string;
}

export interface SearchHistoryItem {
  id: string;
  timestamp: string;
  type: string; // Making this more flexible for FiveM server integration
  query: string;
}

export interface Warrant {
  id: string;
  name: string;
  status: 'ACTIVE';
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

export interface ANPRRecord {
  id: string;
  timestamp: string;
  plate: string;
  reason: 'EXPIRED_REGISTRATION' | 'STOLEN' | 'WANTED' | 'MANUAL_CHECK' | 'INSURANCE_EXPIRED' | 'OWNER_WANTED';
  officerCallsign: string;
  resolved: boolean;
  location?: string;
  notes?: string;
  owner?: string;
  model?: string;
}

export type OfficerStatus = 
  | 'Code 1 On Patrol'
  | 'Code 2 Responding'
  | 'Code 3 Emergency'
  | 'Code 4 In Custody'
  | 'Code 5 Stakeout'
  | 'Code 6 Investigation'
  | 'Code 7 Meal Break'
  | 'Code 8 Request Backup'
  | 'Code 9 Officer Down'
  | 'Code 10 Call Complete'
  | 'Code 2 Arrived at Station'
  | 'Code 4 Traffic Stop'
  | 'Code 5 Arrived on Scene'
  | 'Code 6 Unavailable';

export type OfficerRank = 
  | 'Officer'
  | 'Leadership';

export interface PermissionLevel {
  isLeadership: boolean;
}

export type Screen = 
  | 'login'
  | 'people'
  | 'vehicles'
  | 'history'
  | 'criminal'
  | 'traffic'
  | 'reports'
  | 'serials'
  | 'actions'
  | 'financial'
  | 'supervisor'
  | 'wanted'
  | 'anpr'
  | 'admin';
