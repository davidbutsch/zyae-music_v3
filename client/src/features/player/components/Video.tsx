import { Box, BoxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useAppSelector } from "@/hooks";

export const Video = (props: BoxProps) => {
  const audio = document.querySelector<HTMLAudioElement>("#audio");

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { queue, activeQueueIndex } = useAppSelector((state) => state.player);
  const playing = queue[activeQueueIndex];

  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoadedData = () => {
      setLoading(true);
    };

    if (videoRef.current) {
      const newSrc = `https://zyae.net/music/api/tracks/${playing.id}/video`;

      if (videoRef.current.src !== newSrc) {
        setLoading(true);
        videoRef.current.src = newSrc;
        videoRef.current?.play();
        videoRef.current.addEventListener("loadeddata", handleLoadedData);
      }
    }
  }, [playing]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current)
        videoRef.current.currentTime = audio?.currentTime || 0;
    };

    const handlePause = () => {
      videoRef.current?.pause();
    };

    const handlePlay = () => {
      videoRef.current?.play();
    };

    if (audio) {
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      audio?.removeEventListener("pause", handlePause);
      audio?.removeEventListener("play", handlePlay);
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  return (
    <Box sx={{ ...props.sx }}>
      <video
        controls={false}
        playsInline
        autoPlay
        ref={videoRef}
        id="video"
        style={{
          width: "auto",
          height: "100%",
        }}
      />
    </Box>
  );
};
