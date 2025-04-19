import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GlobalContextType {
  capturedPhotos: string[];
  capturePhoto: (photoUrl: string) => void;
  deletePhoto: (index: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  // Load photos from local storage on mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('retroCameraPhotos');
    if (savedPhotos) {
      try {
        setCapturedPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error('Failed to parse saved photos', error);
      }
    }
  }, []);

  // Save photos to local storage when updated
  useEffect(() => {
    localStorage.setItem('retroCameraPhotos', JSON.stringify(capturedPhotos));
  }, [capturedPhotos]);

  const capturePhoto = (photoUrl: string) => {
    setCapturedPhotos((prev) => [...prev, photoUrl]);
  };

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <GlobalContext.Provider
      value={{
        capturedPhotos,
        capturePhoto,
        deletePhoto
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};