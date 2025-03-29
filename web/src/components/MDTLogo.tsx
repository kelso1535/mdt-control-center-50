
import React from 'react';
import { Shield } from 'lucide-react';

const MDTLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold text-blue-500">MDT</div>
      <div className="mt-2 flex items-center justify-center bg-blue-500/10 p-4 rounded-full border border-blue-500/20">
        <Shield size={64} className="text-blue-500" />
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Police Department
      </div>
    </div>
  );
};

export default MDTLogo;
