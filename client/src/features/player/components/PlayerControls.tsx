import { FontIcon, IconButton } from "@/components";
import { Stack, useMediaQuery } from "@mui/material";
import { setPlayback, setShuffle, skipBackward, skipForward } from "@/stores";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { theme } from "@/styles";

export const PlayerControls = () => {
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useAppDispatch();
  const { isPlaying, options } = useAppSelector((state) => state.player);

  const audio = document.querySelector<HTMLAudioElement>("#audio");

  if (!audio) return;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      maxWidth={sm ? "fit-content" : "inherit"}
    >
      <IconButton
        onClick={() => dispatch(setShuffle(!options.shuffle))}
        sx={{
          ml: -1,
        }}
      >
        <FontIcon
          icon="fi-rr-shuffle"
          size={sm ? 14 : 22}
          sx={{
            position: "relative",

            ":after": {
              content: "''",
              position: "absolute",
              bottom: -12,
              left: "50%",

              transform: "translateX(-50%)",

              height: 6,
              width: 6,
              bgcolor: "#fff",

              opacity: options.shuffle ? 1 : 0,

              borderRadius: 1,

              transition: "opacity .2s",
            },
          }}
        />
      </IconButton>

      <IconButton
        size={sm ? "small" : "large"}
        onClick={() => {
          dispatch(skipBackward());
          audio.currentTime = 0;
        }}
        sx={{
          ml: 2,
          height: { xs: 64, sm: 32 },
          width: { xs: 64, sm: 32 },
        }}
      >
        <FontIcon size={sm ? 22 : 38} icon="zi-skip-backward" />
      </IconButton>
      <IconButton
        size={sm ? "small" : "large"}
        onClick={() => dispatch(setPlayback(!isPlaying))}
        sx={{
          height: { xs: 80, sm: 42 },
          width: { xs: 80, sm: 42 },
        }}
      >
        <FontIcon
          icon={isPlaying ? "zi-pause" : "zi-play"}
          size={sm ? 26 : 48}
        />
      </IconButton>
      <IconButton
        size={sm ? "small" : "large"}
        onClick={() => {
          audio.currentTime = 0;
          dispatch(skipForward());
        }}
        sx={{
          mr: 2,
          height: { xs: 64, sm: 32 },
          width: { xs: 64, sm: 32 },
        }}
      >
        <FontIcon size={sm ? 22 : 38} icon="zi-skip-forward" />
      </IconButton>
      <IconButton
        sx={{
          mr: -1,
        }}
      >
        <FontIcon icon="fi-rr-arrows-repeat" size={sm ? 14 : 22} />
      </IconButton>
    </Stack>
  );
};
