
import React from 'react';

type Screen = 
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
  | 'admin';

interface ContentRendererProps {
  currentScreen: Screen;
  mockData?: {
    [key: string]: any;
  };
}

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
    <p className="text-sm text-gray-500 mt-2">This screen is coming soon</p>
  </div>
);

const ContentRenderer: React.FC<ContentRendererProps> = ({ currentScreen, mockData }) => {
  // This is a simplified placeholder renderer
  // In a real implementation, you would import and render actual components for each screen
  
  switch (currentScreen) {
    case 'people':
      return <Placeholder title="People Search" />;
    case 'vehicles':
      return <Placeholder title="Vehicle Search" />;
    case 'history':
      return <Placeholder title="Search History" />;
    case 'criminal':
      return <Placeholder title="Criminal Records" />;
    case 'traffic':
      return <Placeholder title="Traffic Offences" />;
    case 'reports':
      return <Placeholder title="Reports" />;
    case 'serials':
      return <Placeholder title="Serial Search" />;
    case 'actions':
      return <Placeholder title="Actions" />;
    case 'financial':
      return <Placeholder title="Financial Records" />;
    case 'supervisor':
      return <Placeholder title="Officer Dashboard" />;
    case 'wanted':
      return <Placeholder title="Wanted Persons" />;
    case 'admin':
      return <Placeholder title="Admin Settings" />;
    default:
      return <Placeholder title="Screen Not Found" />;
  }
};

export default ContentRenderer;
