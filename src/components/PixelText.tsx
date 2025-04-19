import React from 'react';

interface PixelTextProps {
  text: string;
  className?: string;
}

export const PixelText: React.FC<PixelTextProps> = ({ text, className = '' }) => {
  // If we're using a pixel font like Press Start 2P, we just need to apply the font
  // Otherwise, we'd implement a more complex pixel text rendering here
  return (
    <div className={`font-pixel ${className}`} style={{ letterSpacing: '0.1em' }}>
      {text}
    </div>
  );
};