
import React from 'react';
import { Person } from '@/types';
import { 
  PersonBasicInfo, 
  PersonLicenseInfo, 
  PersonFlags,
  PersonWeapons,
  PersonOtherInfo,
  PersonPhoto
} from './PersonDataSection';

interface PersonResultProps {
  person: Person;
}

const PersonResult: React.FC<PersonResultProps> = ({ person }) => {
  if (!person) return null;

  return (
    <div className="bg-card border border-border rounded-md p-2 mt-2 animate-slide-in overflow-y-auto max-h-[calc(100vh-220px)]">
      <div className="flex">
        <div className="flex-1">
          <PersonBasicInfo person={person} />
          <PersonLicenseInfo person={person} />
          <PersonFlags person={person} />
          <PersonWeapons person={person} />
          <PersonOtherInfo person={person} />
        </div>
        <PersonPhoto person={person} />
      </div>
    </div>
  );
};

export default PersonResult;
