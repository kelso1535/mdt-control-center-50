
import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarButtonProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'blue' | 'alert';
  isActive?: boolean;
  label?: string; // Add the label property
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  icon, 
  children, 
  onClick, 
  variant = 'default',
  isActive = false,
  label // Support the label property
}) => {
  const content = label || children;
  
  return (
    <button
      className={cn(
        "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
        isActive ? "bg-sidebar-accent text-white" : "text-muted-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground",
        variant === 'blue' && "border border-[hsl(var(--police-blue))]/30 text-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/10",
        variant === 'alert' && "bg-red-600/20 border border-red-600/30 text-red-500 hover:bg-red-600/30"
      )}
      onClick={onClick}
    >
      {icon && (
        <span className="mr-2 w-4 h-4">
          {icon}
        </span>
      )}
      {content}
    </button>
  );
};

export default SidebarButton;
