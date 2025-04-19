import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Trash2 } from 'lucide-react';
import { PixelText } from './PixelText';

interface GalleryProps {
  photos: string[];
  onBack: () => void;
  onDownload: (photoUrl: string, index: number) => void;
  onDelete: (index: number) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ photos, onBack, onDownload, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  if (photos.length === 0) {
    return (
      <div className="border-4 border-amber-400 p-4 bg-black">
        <div className="text-center mb-4">
          <PixelText text="GALLERY" className="text-amber-400 text-2xl" />
        </div>
        <div className="viewfinder relative w-full aspect-square border-4 border-amber-400 flex items-center justify-center">
          <PixelText text="NO PHOTOS" className="text-amber-400 text-lg" />
        </div>
        <div className="mt-4 text-center">
          <button 
            onClick={onBack}
            className="text-amber-400 hover:text-amber-300 py-1 px-3 border border-amber-400 hover:border-amber-300 rounded"
          >
            <PixelText text="BACK" className="text-sm" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-amber-400 p-4 bg-black max-w-md w-full">
      <div className="text-center mb-4">
        <PixelText text="GALLERY" className="text-amber-400 text-2xl" />
      </div>
      
      <div className="viewfinder relative w-full aspect-square border-4 border-amber-400 bg-black overflow-hidden">
        <img 
          src={photos[currentIndex]} 
          alt={`Photo ${currentIndex + 1}`} 
          className="w-full h-full object-contain"
        />
        <div className="scanlines absolute inset-0 pointer-events-none"></div>
        <div className="absolute top-2 right-2 text-amber-400 bg-black/80 px-2 py-1 border border-amber-400">
          <PixelText text={`${currentIndex + 1}/${photos.length}`} className="text-xs" />
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <button 
          onClick={goToPrevious}
          className="text-amber-400 hover:text-amber-300 p-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onDownload(photos[currentIndex], currentIndex)}
            className="text-amber-400 hover:text-amber-300 p-2"
            title="Download photo"
          >
            <Download className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => onDelete(currentIndex)}
            className="text-amber-400 hover:text-amber-300 p-2"
            title="Delete photo"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
        
        <button 
          onClick={goToNext}
          className="text-amber-400 hover:text-amber-300 p-2"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={onBack}
          className="text-amber-400 hover:text-amber-300 py-1 px-3 border border-amber-400 hover:border-amber-300 rounded"
        >
          <PixelText text="BACK" className="text-sm" />
        </button>
      </div>
    </div>
  );
};