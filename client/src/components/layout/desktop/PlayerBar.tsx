import { FontIcon, IconButton } from "@/components";
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useColorSort,
} from "@/hooks";
import { setPlayback, skipBackward, skipForward } from "@/stores";
import {
  Box,
  Divider,
  Link,
  Popover,
  Slider,
  Stack,
  Typography,
  alpha,
  lighten,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { ArtistLink } from "@/features/artists";
import { PlayerSlider } from "@/features/player/components/PlayerSlider";
import { TracksList } from "@/features/tracks";
import { colors } from "@/styles";

const NotPlaying = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        py: 1.5,
        px: 2.5,

        width: "100vw",
        height: "76px",

        bgcolor: lighten(colors.bg, 0.015),
      }}
    >
      <Stack spacing={1.25} justifyContent="center" width="100%" maxWidth={200}>
        <Box
          component="span"
          sx={{
            display: "flex",

            height: 14,
            bgcolor: lighten(colors.bg, 0.1),
            borderRadius: 7,
          }}
        />
        <Box
          component="span"
          sx={{
            display: "flex",

            width: "75%",

            height: 14,
            bgcolor: lighten(colors.bg, 0.1),
            borderRadius: 7,
          }}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="right"
        width="100%"
      >
        <IconButton size="large">
          <FontIcon icon="zi-skip-backward" size={24} />
        </IconButton>
        <IconButton size="large">
          <FontIcon icon="zi-play" size={24} />
        </IconButton>
        <IconButton size="large">
          <FontIcon icon="zi-skip-forward" size={24} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const PlayerControls = () => {
  const dispatch = useAppDispatch();

  const { isPlaying } = useAppSelector((state) => state.player);

  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={() => dispatch(skipBackward())}>
        <FontIcon icon="zi-skip-backward" size={24} />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => dispatch(setPlayback(!isPlaying))}
      >
        <FontIcon icon={isPlaying ? "zi-pause" : "zi-play"} size={24} />
      </IconButton>
      <IconButton onClick={() => dispatch(skipForward())}>
        <FontIcon icon="zi-skip-forward" size={24} />
      </IconButton>
    </Stack>
  );
};

const VolumeOptions = () => {
  const [volumeAnchor, setVolumeAnchor] = useState<HTMLElement | null>(null);
  const audio = document.querySelector<HTMLAudioElement>("#audio");
  const [volume, setVolume] = useState(100);

  const setAudioVolume = (val: number) => {
    if (audio) audio.volume = val / 100;
  };

  useEffect(() => {
    const onVolumeChange = () => {
      if (audio) setVolume(audio.volume * 100);
    };

    audio?.addEventListener("volumechange", onVolumeChange);

    return () => {
      audio?.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  return (
    <>
      <IconButton onClick={(e) => setVolumeAnchor(e.currentTarget)}>
        <FontIcon
          icon={
            volume > 50
              ? "fi-rr-volume"
              : volume > 0
              ? "fi-rr-volume-down"
              : "fi-rr-volume-mute"
          }
        />
      </IconButton>
      <Popover
        open={Boolean(volumeAnchor)}
        anchorEl={volumeAnchor}
        onClose={() => setVolumeAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          transform: "translateY(-24px)",
        }}
      >
        <Box
          sx={{
            py: 2,
            px: 0.5,

            height: 160,
            overflow: "hidden",
          }}
        >
          <Slider
            orientation="vertical"
            value={volume}
            max={100}
            min={0}
            onChange={(_e, newVal) =>
              setAudioVolume(Array.isArray(newVal) ? newVal[0] : newVal)
            }
          />
        </Box>
      </Popover>
    </>
  );
};

const QueueOptions = () => {
  const navigate = useAppNavigate();
  const [queueAnchor, setQueueAnchor] = useState<HTMLElement | null>(null);

  const { queue, activeQueueIndex, queueSource } = useAppSelector(
    (state) => state.player
  );
  const playing = queue[activeQueueIndex];

  const { sortColors } = useColorSort(playing?.palette);

  return (
    <>
      <IconButton
        variant={Boolean(queueAnchor) ? "translucent" : "default"}
        onClick={(e) => setQueueAnchor(e.currentTarget)}
      >
        <FontIcon icon="fi-rr-list" />
      </IconButton>
      <Popover
        open={Boolean(queueAnchor)}
        anchorEl={queueAnchor}
        onClose={() => setQueueAnchor(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          transform: "translateY(-24px) translateX(-24px)",

          ".MuiPopover-paper": {
            borderColor: alpha(
              sortColors(["intensity"])[0]?.hex || "#000",
              0.3
            ),
            transition: "border .3s",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",

            py: 2,
            px: 0.5,

            height: "50vh",
            width: 450,
            overflow: "hidden",

            bgcolor: alpha(sortColors(["intensity"])[0]?.hex || "#000", 0.15),

            transition: "background .3s",
          }}
        >
          <Stack mr={1} direction="row" justifyContent="space-between">
            <Stack
              onClick={() => {
                if (queueSource.id) {
                  setQueueAnchor(null);
                  navigate(`/${queueSource.type}/${queueSource.id}`);
                }
              }}
              sx={{
                px: 1,
                pb: 1,

                maxWidth: "fit-content",

                overflow: "hidden",
                "*": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography fontWeight={500} noWrap>
                {queueSource.title}
              </Typography>
              <Typography
                fontSize={14}
                sx={{
                  opacity: 0.6,
                }}
              >
                Up next
              </Typography>
            </Stack>
            <IconButton onClick={() => setQueueAnchor(null)}>
              <FontIcon icon="fi-rr-cross" />
            </IconButton>
          </Stack>

          <Box
            sx={{
              height: "100%",

              mask: "linear-gradient(transparent, #fff 5%)",

              overflow: "scroll",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <TracksList
              tracks={queue.slice(
                queue.findIndex((track) => track.id == playing.id) + 1
              )}
              emulateMobile
            />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

const TrackOptions = () => {
  return (
    <Stack direction="row">
      <QueueOptions />
      <VolumeOptions />
      <Divider orientation="vertical" sx={{ mx: 1 }} />
      <IconButton>
        <FontIcon icon="fi-rr-shuffle" />
      </IconButton>
      <IconButton>
        <FontIcon icon="fi-rr-arrows-repeat" />
      </IconButton>
    </Stack>
  );
};

export const PlayerBar = (): JSX.Element => {
  const { queue, activeQueueIndex } = useAppSelector((state) => state.player);
  const playing = queue[activeQueueIndex];

  if (playing)
    return (
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          pl: 1,
          pr: 2.5,

          width: "100vw",
          height: 72,

          alignItems: "center",

          bgcolor: lighten(colors.bg, 0.015),

          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: { md: 1 / 4, lg: 1 / 3 },
            alignItems: "center",
          }}
        >
          <IconButton size="large">
            <FontIcon icon="zi-save" size={20} sx={{ opacity: 1 }} />
          </IconButton>
          <Stack mx={1.5} overflow="hidden">
            <Link
              component={RouterLink}
              fontWeight={600}
              sx={{
                color: "#fff",
              }}
              to={`/album/${playing.album?.id}`}
              color="text.secondary"
            >
              {playing.title}
            </Link>

            <Typography
              fontSize={14}
              sx={{
                color: "text.secondary",
              }}
              noWrap
            >
              <ArtistLink artists={playing.artists} />
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: { md: 2 / 4, lg: 1 / 3 },
            gap: { md: 2, lg: 4 },
          }}
        >
          <PlayerControls />
          <PlayerSlider />
        </Stack>
        <Stack
          direction="row"
          sx={{
            width: { md: 1 / 4, lg: 1 / 3 },
            justifyContent: "flex-end",
          }}
        >
          <TrackOptions />
        </Stack>
      </Stack>
    );
  else return <NotPlaying />;
};
