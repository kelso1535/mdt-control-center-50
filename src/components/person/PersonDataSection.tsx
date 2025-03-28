
import React from 'react';
import { Person } from '@/types';
import DashedDivider from '../DashedDivider';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <div className="section-header">
    <div className="section-line"></div>
    <div className="section-title">------- {title} -------</div>
    <div className="section-line"></div>
  </div>
);

interface DataLineProps {
  label: string;
  value: string | number;
  isAlert?: boolean;
}

export const DataLine: React.FC<DataLineProps> = ({ label, value, isAlert }) => (
  <div className="data-line">
    <span>{label}:</span>
    <span className={isAlert ? 'text-destructive' : undefined}>{value}</span>
  </div>
);

interface PersonBasicInfoProps {
  person: Person;
}

export const PersonBasicInfo: React.FC<PersonBasicInfoProps> = ({ person }) => (
  <>
    <SectionHeader title="LEAP DATABASE ENTRY" />
    
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
      <DataLine label="NAME" value={person.name} />
      <DataLine label="DOB" value={person.dob} />
      <DataLine label="SEX" value={person.gender} />
      <DataLine label="HOME ADDR" value={person.address} />
      <DataLine label="PHONE NO" value={person.phone} />
    </div>
    
    <DashedDivider />
  </>
);

interface PersonLicenseInfoProps {
  person: Person;
}

export const PersonLicenseInfo: React.FC<PersonLicenseInfoProps> = ({ person }) => (
  <>
    <SectionHeader title="ROAD TRAFFIC AUTHORITY" />
    
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
      <DataLine label="LIC CLASS" value={person.licenseClass} />
      <DataLine label="LIC STATUS" value={person.licenseStatus} />
      <DataLine label="EXPIRES" value={person.licenseExpiry} />
      <div></div>
      <DataLine label="CONDITIONS" value={person.demeritPoints === 0 ? 'NONE' : 'POINTS'} />
      <DataLine label="DEMERIT PTS" value={`${person.demeritPoints} (LAST 7 DAYS)`} />
    </div>
    
    <DashedDivider />
  </>
);

interface PersonFlagsProps {
  person: Person;
}

export const PersonFlags: React.FC<PersonFlagsProps> = ({ person }) => (
  <>
    <div className="w-full">
      <SectionHeader title="FLAGS" />
      
      <div className="grid grid-cols-2 gap-x-4">
        <DataLine label="WANTED" value={person.flags.wanted ? 'YES' : 'NO'} />
        <DataLine label="VIOLENCE POLICE" value={person.flags.violencePolice ? 'YES' : 'NO'} />
        <DataLine label="BAIL" value={person.flags.bail ? 'YES' : 'NO'} />
        <DataLine label="VIOLENCE" value={person.flags.violence ? 'YES' : 'NO'} />
        <DataLine label="POS WEAP" value={person.flags.possessWeapon ? 'YES' : 'NO'} />
      </div>
    </div>
    
    <DashedDivider />
  </>
);

interface PersonWeaponsProps {
  person: Person;
}

export const PersonWeapons: React.FC<PersonWeaponsProps> = ({ person }) => (
  <>
    <div className="w-full">
      <SectionHeader title="WEAPONS" />
      
      <div className="grid grid-cols-2 gap-x-4">
        <DataLine label="WEAPON LONGARM" value={person.weapons.longarm ? 'YES' : 'NO'} />
        <DataLine label="HANDGUN" value={person.weapons.handgun ? 'YES' : 'NO'} />
        <DataLine label="CONCEAL CARRY PERMIT" value={person.weapons.concealCarry ? 'YES' : 'NO'} />
        <DataLine label="F/ARM PROHIB ORDER" value={person.weapons.prohibOrder ? 'YES' : 'NO'} />
      </div>
    </div>
    
    <DashedDivider />
  </>
);

interface PersonOtherInfoProps {
  person: Person;
}

export const PersonOtherInfo: React.FC<PersonOtherInfoProps> = () => (
  <>
    <SectionHeader title="OTHER" />
    
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
      <DataLine label="DNA ON FILE" value="CURRENT ON FILE" />
      <DataLine label="FINE / CHARGE" value="$ - AS NECESSARY" />
    </div>
  </>
);

interface PersonPhotoProps {
  person: Person;
}

export const PersonPhoto: React.FC<PersonPhotoProps> = ({ person }) => {
  if (!person.imageUrl) return null;
  
  return (
    <div className="ml-4">
      <div className="bg-slate-700/50 p-1 rounded-md border border-slate-600">
        <img 
          src={person.imageUrl} 
          alt={person.name} 
          className="w-40 h-48 object-cover rounded-md"
        />
        <div className="mt-1 text-xs text-center bg-slate-800 rounded py-1">
          <span className="text-blue-400">ID PHOTO</span>
        </div>
      </div>
    </div>
  );
};
