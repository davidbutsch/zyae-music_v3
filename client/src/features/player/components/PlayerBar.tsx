import { ArtistLink, ArtistText } from "@/features/artists";
import {
  Box,
  Stack,
  Typography,
  darken,
  keyframes,
  lighten,
} from "@mui/material";
import {
  DelayFade,
  FontIcon,
  IconButton,
  ProgressiveImage,
  Spinner,
} from "@/components";
import { MenuHeader, OptionItem, OptionsList } from "@/features/menus";
import React, { useEffect, useRef, useState } from "react";
import { Track, TracksList } from "@/features/tracks";
import { addToQueue, setPlayback, skipForward } from "@/stores";
import { useAddToPlaylist, useRemoveFromPlaylist } from "@/features/playlists";
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useColorSort,
} from "@/hooks";

import { PlayerControls } from "./PlayerControls";
import { PlayerSlider } from "./PlayerSlider";
import { Video } from ".";
import { colors } from "@/styles";
import { generateMeshGradient } from "@/utils/generateMeshGradient";
import { useMenu } from "@/features/menus/hooks/useMenu";
import { useNotification } from "@/providers";
import { useQueue } from "..";
import { useTrackSavedStatus } from "@/features/tracks/hooks";

const NotPlaying = (): JSX.Element => {
  return (
    <Stack direction="row" gap={1.25} py={1} px={2}>
      <FontIcon
        sx={{
          height: 48,
          width: 48,
          minWidth: 48,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          bgcolor: "rgba(255, 255, 255, .08)",
          color: "rgba(255, 255, 255, .40)",
          borderRadius: 1 / 2,
        }}
        icon="fi fi-sr-music-alt"
        size={20}
      />
      <Stack spacing={1.25} justifyContent="center" width="100%" maxWidth={200}>
        <Box
          component="span"
          sx={{
            display: "flex",

            height: 14,
            bgcolor: "rgba(255, 255, 255, .08)",
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
        <IconButton>
          <FontIcon icon="zi-play" size={20} />
        </IconButton>
        <IconButton>
          <FontIcon icon="zi-skip-forward" size={24} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const Minimized = ({
  hidden,
  setExpanded,
}: {
  hidden: Boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const { queue, activeQueueIndex, isPlaying, loadingAudio } = useAppSelector(
    (state) => state.player
  );
  const playing = queue[activeQueueIndex];

  if (playing)
    return (
      <Stack
        direction="row"
        py={1}
        px={2}
        alignItems="center"
        onClick={() => setExpanded(true)}
        sx={{
          position: "absolute",
          width: hidden ? "0%" : "100%",
          opacity: hidden && 0,
          transition: "width .5s, opacity .3s",
          zIndex: hidden ? -1 : 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxHeight: 48,
            minWidth: 48,
            width: "fit-content",
            borderRadius: 1 / 4,
            overflow: "hidden",
          }}
        >
          {loadingAudio && (
            <DelayFade
              in={!!loadingAudio}
              delay={1000}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                overflow: "hidden",

                backdropFilter: "brightness(25%)",

                zIndex: 2,
              }}
            >
              <Spinner size={24} />
            </DelayFade>
          )}
          <ProgressiveImage
            src={playing.thumbnails[0].url}
            sx={{
              height: 48,
            }}
          />
        </Box>

        <Stack
          justifyContent="center"
          flexGrow={1}
          ml={1.5}
          sx={{
            position: "relative",

            overflow: "hidden",

            "*": {
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          }}
        >
          <Typography fontWeight={500}>{playing.title}</Typography>
          <Typography
            fontSize={14}
            sx={{
              color: "text.secondary",
            }}
          >
            <ArtistText artists={playing.artists} />
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="right"
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton onClick={() => dispatch(setPlayback(!isPlaying))}>
            <FontIcon icon={isPlaying ? "zi-pause" : "zi-play"} size={20} />
          </IconButton>
          <IconButton onClick={() => dispatch(skipForward())}>
            <FontIcon icon="zi-skip-forward" size={24} />
          </IconButton>
        </Stack>
      </Stack>
    );
  else return <NotPlaying />;
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return width;
};

const useTextWidth = (text: string, font: string) => {
  const windowWidth = useWindowWidth();

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      setWidth(metrics.width);
    }
  }, [text, windowWidth]);

  return width;
};

const OptionsButton = ({
  track,
  setExpanded,
}: {
  track?: Track;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const trackOptionsMenu = useMenu();
  const artistsMenu = useMenu();

  const user = useAppSelector((state) => state.user);
  const addToPlaylistMutation = useAddToPlaylist(user?.tracksId!);
  const removeFromPlaylistMutation = useRemoveFromPlaylist(user?.tracksId!);
  const saved = useTrackSavedStatus(track?.id);

  const { setNotification } = useNotification();

  const { playQueue, status } = useQueue();

  useEffect(() => {
    if (status == "success") dispatch(skipForward());
  }, [status]);

  const closePlayer = () => setTimeout(() => setExpanded(false), 0);

  const artistsOptions =
    track?.artists.map((artist) => ({
      icon: "fi-rs-user-music",
      title: artist.name,
      onClick: () => {
        navigate(`../../artist/${artist.id}`);
        closePlayer();
      },
    })) || [];

  const trackOptions: OptionItem[] = [
    {
      icon: saved ? "zi-saved-solid" : "zi-save",
      title: saved ? "Remove from Saved Tracks" : "Add to Saved Tracks",
      onClick: () => {
        if (track)
          if (saved) removeFromPlaylistMutation.mutate(track?.id);
          else addToPlaylistMutation.mutate(track);
      },
      disabled: !Boolean(track),
    },
    {
      icon: "zi-save",
      title: "Add to playlist",
      onClick: () => {
        setNotification({
          message: "Not implemented",
          icon: "fi-rr-exclamation",
        });
      },
    },
    {
      icon: "fi-rr-plus",
      title: "Add to queue",
      onClick: () => {
        if (track) {
          setNotification({
            message: "Added to queue",
            thumbnail: track.thumbnails[0].url,
          });
          dispatch(addToQueue([track]));
        }
      },
    },
    {
      icon: "fi-rr-sparkles",
      title: "Play similar tracks",
      onClick: () => {
        setNotification({
          message: "Loading similar tracks",
          thumbnail: track?.thumbnails[0].url,
        });
        playQueue(track);
      },
    },
    {
      icon: "fi-rs-record-vinyl",
      title: "Go to album",
      onClick: () => {
        navigate(`../../album/${track?.album?.id}`);
        closePlayer();
      },
      disabled: Boolean(!track?.album),
    },
    {
      icon: "fi-rs-user-music",
      title: "Go to artist",
      onClick: (e) => {
        if (track?.artists.length == 1) artistsOptions[0]?.onClick();
        else artistsMenu.open(e);
      },
    },
    {
      icon: "fi-rr-download",
      title: "Download",
      onClick: () => {
        window.open(`https://zyae.net/music/api/tracks/${track?.id}/download`);
      },
    },
    {
      icon: "zi-share",
      title: "Share",
      onClick: () => {
        setNotification({
          message: "Not implemented",
          icon: "fi-rr-exclamation",
        });
        // if (navigator.share) {
        //   navigator.share({ url: window.location.href });
        // }
      },
    },
  ];

  return (
    <>
      {/* <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={() => {}}
        message="Note archived"
      /> */}
      <artistsMenu.Element {...artistsMenu.elementProps}>
        <OptionsList variant="sheet" items={artistsOptions || []} />
      </artistsMenu.Element>
      <trackOptionsMenu.Element
        {...trackOptionsMenu.elementProps}
        header={
          <MenuHeader
            head={track?.title}
            sub={`Track • ${ArtistText({ artists: track?.artists })}`}
            thumbnail={track?.thumbnails[0].url}
          />
        }
      >
        <OptionsList variant="sheet" items={trackOptions} />
      </trackOptionsMenu.Element>
      <IconButton sx={{ ml: -1, mr: 2 }} onClick={trackOptionsMenu.open}>
        <FontIcon icon="zi-share" size={24} sx={{ transition: "3s" }} />
      </IconButton>
    </>
  );
};

const TrackDetails = ({
  playing,
  setExpanded,
}: {
  playing: Track;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useAppNavigate();

  const titleRef = useRef<HTMLSpanElement>(null);

  const titleWidth = useTextWidth(playing.title, "bold 24px roboto");

  const titleSlider = keyframes`
  0% {
    transform: translateX(0px);
  },
  35% {
    transform: translateX(${
      (titleRef.current?.clientWidth || 0) - titleWidth - 24
    }px);
  },
  45% {
    transform: translateX(${
      (titleRef.current?.clientWidth || 0) - titleWidth - 24
    }px);
  },
  80% {
    transform: translateX(0px);
  },
  100% {
    transform: translateX(0px);
  }
  `;

  const user = useAppSelector((state) => state.user);
  const addToPlaylistMutation = useAddToPlaylist(user?.tracksId!);
  const removeFromPlaylistMutation = useRemoveFromPlaylist(user?.tracksId!);

  const saved = useTrackSavedStatus(playing.id);

  return (
    <Stack direction="row" alignItems="center">
      <OptionsButton track={playing} setExpanded={setExpanded} />
      <Box
        sx={{
          mx: "-12px",
          px: "12px",

          flexGrow: 1,

          textAlign: "center",

          overflow: "hidden",
          mask: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)",
        }}
      >
        <Typography
          fontWeight={500}
          fontSize={24}
          ref={titleRef}
          sx={{
            whiteSpace: "nowrap",
            ...(titleWidth > (titleRef.current?.clientWidth || 0) && {
              animation: `${titleSlider} ${
                ((titleRef.current?.clientWidth || 0) - titleWidth - 24) *
                -0.06985755607
              }s linear infinite`,
            }),
          }}
          onClick={() => {
            if (playing.album) {
              navigate(`../album/${playing.album?.id}`);
              setExpanded(false);
            }
          }}
        >
          {playing.title}
        </Typography>
        <Typography
          sx={{
            opacity: 0.7,
          }}
          onClick={() => setExpanded(false)}
        >
          <ArtistLink artists={playing.artists} />
        </Typography>
      </Box>
      <IconButton
        sx={{
          mr: -1,
          ml: 2,
        }}
        onClick={() => {
          console.log(playing);

          if (!user?.tracksId) alert("u need to log in to do that");
          else if (!saved) addToPlaylistMutation.mutate(playing);
          else removeFromPlaylistMutation.mutate(playing.id);
        }}
      >
        <FontIcon
          icon={saved ? "zi-saved-solid" : "zi-save"}
          size={24}
          sx={{ transition: "3s" }}
        />
      </IconButton>
    </Stack>
  );
};

const Player = ({
  hidden,
  setExpanded,
}: {
  hidden: Boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { queue, activeQueueIndex, loadingAudio } = useAppSelector(
    (state) => state.player
  );
  const playing = queue[activeQueueIndex];

  if (!playing) return;

  const isVideo =
    parseInt(playing.thumbnails[0].height) /
      parseInt(playing.thumbnails[0].width) !==
    1;

  return (
    <Stack height="100%" justifyContent="space-around">
      <Box
        sx={{
          position: "relative",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loadingAudio && (
          <DelayFade
            in={!!loadingAudio}
            delay={1000}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: "translateX(-50%) translateY(-50%)",

              width: "min(100%, 45vh)",

              aspectRatio: "1 / 1",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              borderRadius: 1,
              overflow: "hidden",

              zIndex: 2,
            }}
          >
            <Spinner />
            {(playing.duration || "0:00")
              .split(":")
              .reduce(function (seconds, v) {
                return +v + seconds * 60;
              }, 0) > 1200 && (
              <>
                <Typography mt={2} fontWeight={500}>
                  Longer tracks take more time to load
                </Typography>
                <Typography
                  fontWeight={500}
                  sx={{ opacity: 0.6 }}
                  onClick={() => alert("Not implemented")}
                >
                  Learn more
                </Typography>
              </>
            )}
          </DelayFade>
        )}
        {isVideo ? (
          <Video
            sx={{
              position: "absolute",
              height: "40vh",

              mask: "linear-gradient(transparent, #fff 30%, #fff 70%, transparent)",
            }}
          />
        ) : (
          <ProgressiveImage
            src={playing.thumbnails[playing.thumbnails.length - 1].url}
            sx={{
              maxWidth: "min(100%, 45vh)",
              borderRadius: 1,
              boxShadow: "0 0 64px 16px rgba(0, 0, 0, .24)",
              transform: `scale(${hidden ? "0" : 1})`,
              transformOrigin: "left top",
              willChange: "auto",
              transition: "height 0s, all .3s",
              ...(loadingAudio && {
                filter: "brightness(25%)",
                transitionDelay: "filter 1s",
              }),
            }}
          />
        )}
      </Box>
      <Box>
        <TrackDetails playing={playing} setExpanded={setExpanded} />
        <PlayerSlider sx={{ mt: 1, mb: 1.5 }} />
        <PlayerControls />
      </Box>
    </Stack>
  );
};

const Queue = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<"player" | "queue">>;
}) => {
  // bad code
  // const audioTime = useAudioCurrentTime(1000);

  const dispatch = useAppDispatch();

  const { queue, activeQueueIndex, isPlaying } = useAppSelector(
    (state) => state.player
  );
  const playing = queue[activeQueueIndex];

  return (
    <>
      <Box
        id="queueScroller"
        sx={{
          pt: 3,

          height: "calc(100% - 114px) !important",

          overflowY: "scroll",

          mask: "linear-gradient(transparent 0%, #fff 5%, #fff 85%, transparent)",
        }}
      >
        <TracksList
          tracks={queue.slice(
            queue.findIndex((track) => track.id == playing.id) + 1
          )}
        />
      </Box>
      <Box
        onClick={() => setView("player")}
        sx={{
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom) + 16px)",

          p: 2,

          display: "flex",
          alignItems: "center",

          height: "88px",
          width: "calc(100% - 48px)",
          borderRadius: 1 / 1.5,

          overflow: "hidden",
          transition: "3s",

          ":before": {
            content: "''",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(24px)",

            mask: "linear-gradient(transparent, #fff)",
          },
        }}
      >
        <ProgressiveImage
          src={playing.thumbnails[0].url}
          width={56}
          sx={{ borderRadius: 1 / 4 }}
        />
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              ml: 1.5,
              overflow: "hidden",
              "*": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          >
            <Typography fontWeight={500}>{playing.title}</Typography>
            <Typography fontSize={14} sx={{ opacity: 0.7 }}>
              <ArtistText artists={playing.artists} />
            </Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="right"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              disableRipple
              onClick={() => dispatch(setPlayback(!isPlaying))}
            >
              <FontIcon icon={isPlaying ? "zi-pause" : "zi-play"} size={30} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

const Expanded = ({
  hidden,
  setExpanded,
}: {
  hidden: Boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useAppNavigate();

  const { queue, activeQueueIndex, queueSource } = useAppSelector(
    (state) => state.player
  );
  const playing = queue[activeQueueIndex];

  const [meshGradient, setMeshGradient] = useState<string>();
  const [switchActive, setSwitchActive] = useState(false);

  useEffect(() => {
    if (playing?.palette) {
      setSwitchActive(true);
      const mesh = generateMeshGradient(accentColors.slice(0, 5));
      setTimeout(() => {
        setSwitchActive(false);

        setMeshGradient(mesh);
      }, 3000);
    }
  }, [playing]);

  const [view, setView] = useState<"queue" | "player">("player");

  const { sortColors } = useColorSort(playing?.palette);

  if (!playing) return;

  const isVideo =
    parseInt(playing.thumbnails[0].height) /
      parseInt(playing.thumbnails[0].width) !==
    1;

  const accentColors = sortColors(["intensity", "area"]);
  const backgroundColor = sortColors(["area"])[0];

  return (
    <Stack
      sx={[
        {
          p: 3,
          height:
            "calc(100vh - env(safe-area-inset-top, 24px) - env(safe-area-inset-bottom, 24px))",

          ":before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: darken(backgroundColor?.hex || "#fff", isVideo ? 0.8 : 0),
            zIndex: -1,

            opacity: view == "queue" ? 0.15 : 0.4,
            transition: "opacity .3s, background 1s",
          },

          ":after": {
            content: "''",
            position: "absolute",
            top: 0,
            left: "-20%",
            right: "-20%",
            bottom: 0,
            backgroundImage: meshGradient,
            backgroundRepeat: "no-repeat",
            filter: `brightness(100%)`,

            opacity: switchActive ? 0 : view == "queue" ? 0.15 : 0.4,
            zIndex: -1,
            transition: "opacity 3s, background 3s",
          },
        },
        hidden
          ? {
              opacity: 0,
              transition: ".3s",
            }
          : {
              opacity: 1,
              transition: ".7s",
            },
      ]}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <IconButton onClick={() => setExpanded(false)} size="large">
          <FontIcon
            size={24}
            icon="zi-angle-down"
            sx={{
              transition: "color 3s",
            }}
          />
        </IconButton>
        <Stack
          textAlign="center"
          onClick={() => {
            if (queueSource.id) {
              setExpanded(false);
              navigate(
                `/${queueSource.type}/${queueSource.id}/${
                  queueSource.queryParams || ""
                }`
              );
            }
          }}
          sx={{
            overflow: "hidden",
            textOverflow: "fade",

            ...(!!queueSource.id && {
              "&:active": {
                transform: "scale(.975)",
                opacity: 0.5,
              },
              transition: ".3s",
            }),
          }}
        >
          <Typography px={2} fontWeight={500} noWrap>
            {queueSource.title}
          </Typography>
          <Typography
            px={2}
            fontSize={14}
            sx={{
              opacity: 0.6,
              textTransform: view == "queue" ? "inherit" : "capitalize",
            }}
          >
            {view == "queue" ? "Up next" : queueSource.type}
          </Typography>
        </Stack>
        <IconButton
          variant={view == "queue" ? "translucent" : "default"}
          size="large"
          onClick={() =>
            setView((prev) => (prev == "player" ? "queue" : "player"))
          }
        >
          <FontIcon
            icon="fi-rr-list"
            size={22}
            sx={{
              transition: "color 3s",
            }}
          />
        </IconButton>
      </Stack>
      {view == "player" ? (
        <Player hidden={hidden} setExpanded={setExpanded} />
      ) : (
        <Queue setView={setView} />
      )}
    </Stack>
  );
};

export const PlayerBar = ({
  playerExpandedState,
}: {
  playerExpandedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}): JSX.Element => {
  const [expanded, setExpanded] = playerExpandedState;

  return (
    <Box
      sx={[
        {
          height: 64,
          transition: "height 0s, all .3s",
        },
        expanded && {
          pt: "env(safe-area-inset-top, 24px)",
        },
      ]}
    >
      <Minimized hidden={expanded} setExpanded={setExpanded} />
      <Expanded hidden={!expanded} setExpanded={setExpanded} />
    </Box>
  );
};
