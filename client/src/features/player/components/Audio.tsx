import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setLoadingAudio,
  setPlayback,
  skipBackward,
  skipForward,
} from "@/stores";
import { useEffect, useRef } from "react";

import { env } from "@/config";
import { ArtistText } from "@/features/artists";

export const Audio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dispatch = useAppDispatch();
  const { isPlaying, queue, activeQueueIndex } = useAppSelector(
    (state) => state.player
  );
  const playing = queue[activeQueueIndex];

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const handleLoadedData = () => {
      dispatch(setLoadingAudio(false));
    };

    if (audioRef.current && playing) {
      const newSrc = `${env.API_URL}/tracks/${playing.id}/media`;

      // loading
      if (audioRef.current.src !== newSrc) {
        dispatch(setLoadingAudio(true));
        audioRef.current.src = newSrc;
        audioRef.current?.play();
        audioRef.current.addEventListener("loadeddata", handleLoadedData);
      }

      // metadata
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playing.title,
        artist: ArtistText({ artists: playing.artists }),
        album: playing.album?.title,
        artwork: [
          {
            src: playing.thumbnails[playing.thumbnails.length - 1].url,
            sizes: "512x512",
          },
          {
            src: playing.thumbnails[0].url,
            sizes: "128x128",
          },
          {
            src: playing.thumbnails[0].url,
            sizes: "96x96",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () =>
        audioRef.current?.play()
      );
      navigator.mediaSession.setActionHandler("pause", () =>
        audioRef.current?.pause()
      );
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (audioRef.current && audioRef.current.currentTime > 5)
          audioRef.current.currentTime = 0;
        else dispatch(skipBackward());
      });
      navigator.mediaSession.setActionHandler("nexttrack", () =>
        dispatch(skipForward())
      );
      navigator.mediaSession.setActionHandler("seekto", (time) => {
        if (audioRef.current?.currentTime)
          audioRef.current.currentTime = time.seekTime || 0;
      });
    }

    // audio event listeners
    const handlePlay = () => dispatch(setPlayback(true));
    const handlePause = () => dispatch(setPlayback(false));
    const handleEnded = () => {
      if (queue[activeQueueIndex + 1]) {
        dispatch(skipForward());
        setTimeout(() => {
          audioRef.current?.play();
        }, 200);
      }
    };

    if (audioRef) {
      audioRef.current?.addEventListener("play", handlePlay);
      audioRef.current?.addEventListener("pause", handlePause);
      audioRef.current?.addEventListener("ended", handleEnded);
    }

    return () => {
      audioRef.current?.addEventListener("loadeddata", handleLoadedData);

      audioRef.current?.removeEventListener("play", handlePlay);
      audioRef.current?.removeEventListener("pause", handlePause);
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [playing]);

  return (
    <>
      <audio ref={audioRef} id="audio" />
      {queue[activeQueueIndex + 1] && (
        <audio
          src={`${env.API_URL}/tracks/${queue[activeQueueIndex + 1].id}/media`}
          muted
          autoPlay={false}
        />
      )}
    </>
  );
};
