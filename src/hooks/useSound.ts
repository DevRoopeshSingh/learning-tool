// src/hooks/useSound.ts
import { useCallback } from "react";

export const useSound = () => {
  const playSound = useCallback((type: "correct" | "incorrect" | "click") => {
    if (typeof window === "undefined") return;

    const sounds = {
      correct: "/audio/correct.mp3",
      incorrect: "/audio/incorrect.mp3",
      click: "/audio/click-sound.mp3",
    };

    try {
      const audio = new Audio(sounds[type]);
      audio
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    } catch (error) {
      console.error("Sound effect failed:", error);
    }
  }, []);

  return { playSound };
};
