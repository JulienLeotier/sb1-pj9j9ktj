import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Download, Camera as CameraIcon, Trash2 } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { ViewFinder } from './ViewFinder';
import { Gallery } from './Gallery';
import { PixelText } from './PixelText';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { capturedPhotos, capturePhoto, deletePhoto } = useGlobalContext();
  const { playShutterSound, playBeepSound } = useSoundEffects();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 's' && !isGalleryOpen) {
        handleCapture();
      } else if (event.key.toLowerCase() === 'g') {
        setIsGalleryOpen((prev) => !prev);
        playBeepSound();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGalleryOpen, playBeepSound]);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        capturePhoto(imageSrc);
        playShutterSound();
      }
    }
  };

  const handleDownload = (photoUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `retro-photo-${index}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    playBeepSound();
  };

  const handleDelete = (index: number) => {
    deletePhoto(index);
    playBeepSound();
  };

  if (isGalleryOpen) {
    return (
      <div className="retro-camera">
        <Gallery
          photos={capturedPhotos}
          onBack={() => {
            setIsGalleryOpen(false);
            playBeepSound();
          }}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <div className="retro-camera max-w-md">
      <div className="camera-frame bg-black p-4">
        <div className="camera-header bg-black mb-4">
          <PixelText
            text="CAMERA"
            className="text-center text-amber-400 text-2xl"
          />
        </div>

        <ViewFinder>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user',
              width: { ideal: 640 },
              height: { ideal: 480 },
            }}
            onUserMedia={() => setIsCameraReady(true)}
            className={`w-full h-full object-cover filter ${
              isCameraReady ? 'visible' : 'invisible'
            }`}
          />
          {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CameraIcon className="text-amber-500 w-10 h-10 animate-pulse" />
            </div>
          )}
        </ViewFinder>

        <div className="camera-controls p-4 bg-black mt-4">
          <div className="text-center">
            <PixelText
              text="PRESS 'S' TO"
              className="text-amber-400 text-lg mb-1"
            />
            <PixelText text="TAKE PHOTO" className="text-amber-400 text-lg" />
          </div>

          {capturedPhotos.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsGalleryOpen(true);
                  playBeepSound();
                }}
                className="text-amber-400 hover:text-amber-300 text-xs py-1 px-3 border border-amber-400 hover:border-amber-300 rounded"
              >
                <PixelText
                  text={`GALLERY (${capturedPhotos.length})`}
                  className="text-xs"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
