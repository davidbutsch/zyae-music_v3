import {
  Box,
  Slider,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

import { theme } from "@/styles";

function formatDuration(secs: number) {
  if (Number.isNaN(secs)) return "-:--";

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = Math.floor((secs % 3600) % 60);

  return `${hours == 0 ? "" : `${hours}:`}${
    hours !== 0 && minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export const PlayerSlider = ({ sx }: { sx?: SxProps }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const audio = document.querySelector<HTMLAudioElement>("#audio");

  if (!audio) return;

  const [currentTime, setCurrentTime] = useState(audio.currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChange = (_e: Event, newValue: number | number[]) => {
    audio.currentTime = Array.isArray(newValue) ? newValue[0] : newValue;
    setCurrentTime(newValue as number);
  };

  return (
    <Stack
      direction={xs ? "column" : "row"}
      alignItems="center"
      gap={1.5}
      sx={{ width: { sm: "35vw" }, ...sx }}
    >
      {!xs && (
        <Typography
          fontSize={13}
          fontWeight={500}
          sx={{
            opacity: 0.6,
          }}
        >
          {formatDuration(currentTime)}
        </Typography>
      )}
      <Slider
        value={currentTime}
        min={0}
        step={1}
        max={audio.duration || 0}
        onChange={handleChange}
        id="timeSlider"
      />
      {xs ? (
        <Box
          sx={{
            mt: -2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            fontSize={13}
            fontWeight={500}
            sx={{
              opacity: 0.6,
            }}
          >
            {formatDuration(audio.currentTime)}
          </Typography>
          <Typography
            fontSize={13}
            fontWeight={500}
            sx={{
              opacity: 0.6,
            }}
          >
            -{formatDuration(audio.duration - currentTime)}
          </Typography>
        </Box>
      ) : (
        <Typography
          fontSize={13}
          fontWeight={500}
          sx={{
            width: "fit-content",
            opacity: 0.6,
            whiteSpace: "nowrap",
          }}
        >
          -{formatDuration(audio.duration - currentTime)}
        </Typography>
      )}
    </Stack>
  );
};
