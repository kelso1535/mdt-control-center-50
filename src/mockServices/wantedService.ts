
interface WantedPerson {
  id: string;
  name: string;
  status: 'ACTIVE' | 'CLOSED' | 'PENDING';
  warrantCount: number;
  charges: string[];
  issuedDate: string;
  issuedBy: string;
}

// Mock data for wanted persons
const mockWantedPersons: WantedPerson[] = [
  {
    id: '1',
    name: 'John Smith',
    status: 'ACTIVE',
    warrantCount: 3,
    charges: ['Armed Robbery', 'Assault', 'Possession of Illegal Firearms'],
    issuedDate: '2023-09-15',
    issuedBy: 'Officer Wilson'
  },
  {
    id: '2',
    name: 'Jane Doe',
    status: 'ACTIVE',
    warrantCount: 1,
    charges: ['Grand Theft Auto'],
    issuedDate: '2023-10-20',
    issuedBy: 'Officer Thompson'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    status: 'ACTIVE',
    warrantCount: 2,
    charges: ['Drug Trafficking', 'Illegal Weapon Possession'],
    issuedDate: '2023-11-05',
    issuedBy: 'Officer Davis'
  }
];

export const fetchWantedPersons = (): Promise<WantedPerson[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWantedPersons);
    }, 500);
  });
};

export const getWantedPersonById = (id: string): Promise<WantedPerson | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const person = mockWantedPersons.find(p => p.id === id);
      resolve(person);
    }, 300);
  });
};

export type { WantedPerson };
