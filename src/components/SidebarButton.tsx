
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'blue' | 'alert';
  className?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  children,
  onClick,
  variant = 'default',
  className
}) => {
  const buttonClass = cn(
    'mdt-btn w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs mb-0.5',
    {
      'bg-secondary hover:bg-muted text-secondary-foreground': variant === 'default',
      'bg-[hsl(var(--police-blue))] hover:bg-[hsl(var(--police-blue))]/90 text-white': variant === 'blue',
      'bg-destructive hover:bg-destructive/90 text-destructive-foreground': variant === 'alert'
    },
    className
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      <div className="w-5 h-5 flex-shrink-0">
        {icon}
      </div>
      <span className="truncate">{children}</span>
    </button>
  );
};

export default SidebarButton;
