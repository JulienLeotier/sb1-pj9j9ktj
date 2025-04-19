import React, { ReactNode } from 'react';

interface ViewFinderProps {
  children: ReactNode;
}

export const ViewFinder: React.FC<ViewFinderProps> = ({ children }) => {
  return (
    <div className="viewfinder relative w-full aspect-square border-4 border-amber-400 bg-amber-900/20 overflow-hidden">
      {children}
      <div className="scanlines absolute inset-0 pointer-events-none"></div>
      <div className="pixelate absolute inset-0 pointer-events-none"></div>
    </div>
  );
};