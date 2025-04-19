import { useRef, useCallback } from 'react';
import { Howl } from 'howler';

export const useSoundEffects = () => {
  // We use refs to ensure the sound instances persist across renders
  const shutterSoundRef = useRef<Howl | null>(null);
  const beepSoundRef = useRef<Howl | null>(null);

  // Initialize sounds lazily when first needed
  const getShutterSound = useCallback(() => {
    if (!shutterSoundRef.current) {
      shutterSoundRef.current = new Howl({
        src: ['https://assets.codepen.io/21542/Camera-shutter-sound-effect.mp3'],
        volume: 0.5,
      });
    }
    return shutterSoundRef.current;
  }, []);

  const getBeepSound = useCallback(() => {
    if (!beepSoundRef.current) {
      beepSoundRef.current = new Howl({
        src: ['https://assets.codepen.io/21542/beep.mp3'],
        volume: 0.3,
      });
    }
    return beepSoundRef.current;
  }, []);

  const playShutterSound = useCallback(() => {
    const sound = getShutterSound();
    sound.play();
  }, [getShutterSound]);

  const playBeepSound = useCallback(() => {
    const sound = getBeepSound();
    sound.play();
  }, [getBeepSound]);

  return {
    playShutterSound,
    playBeepSound
  };
};