import { useEffect, useState } from "react";

export const useAudioCurrentTime = (refreshDelay?: number) => {
  const audio = document.querySelector<HTMLAudioElement>("#audio");
  if (!audio) return { current: 0, duration: 0 };
  const [currentTime, setCurrentTime] = useState(audio.currentTime);

  useEffect(() => {
    const timeout = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, refreshDelay || 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return { current: currentTime, duration: audio.duration };
};
