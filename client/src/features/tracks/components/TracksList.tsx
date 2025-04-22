import { ArtistLink, ArtistText } from "@/features/artists";
import {
  Box,
  ButtonBase,
  Grid,
  SxProps,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import {
  FontIcon,
  IconButton,
  Playing,
  ProgressiveImage,
  RowHeader,
} from "@/components";
import { QueueSource, useQueue } from "@/features/player";
import { Track, TrackOptionsButton } from "@/features/tracks";
import { colors, theme } from "@/styles";
import { useAppNavigate, useAppSelector } from "@/hooks";

import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useRemoveFromPlaylist } from "@/features/playlists";
import { useTrackSavedStatus } from "../hooks";

type ThumbnailProps = {
  src: string;
  shy?: boolean;
  sx?: SxProps;
};
export const TrackThumbnail = ({
  src,
  shy = true,
  sx,
}: ThumbnailProps): JSX.Element => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <ButtonBase
      sx={{
        borderRadius: { xs: 1 / 8, sm: 1 / 6 },
        overflow: "hidden",

        ...sx,
      }}
    >
      <FontIcon
        icon="zi-play"
        size={18}
        sx={{
          position: "absolute",

          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 2,

          ...(xs && { opacity: "0 !important" }),
        }}
        className={shy ? " shy" : ""}
      />

      <ProgressiveImage
        src={src}
        sx={{
          height: { xs: 48, sm: 36 },
          // TODO temporary image size persist solution (refer to todo list)
          minWidth: { xs: 48, sm: 36 },
        }}
      />
    </ButtonBase>
  );
};

const Row = styled(Grid)(({ theme }) =>
  theme.unstable_sx({
    py: 1,
    pl: { xs: 0, sm: 1 },

    "&:not(&:last-child)": {
      borderBottom: "1px solid rgba(255,255,255,.05)",
    },

    ".shy": {
      opacity: 0,
    },

    "&:hover .shy": {
      opacity: 1,
    },
  })
);
Row.defaultProps = {
  container: true,
};

const Cell = styled(Grid)(({ theme }) =>
  theme.unstable_sx({
    display: "flex",
    alignItems: "center",

    "& p, h6, a": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  })
);
Cell.defaultProps = {
  item: true,
  zeroMinWidth: true,
};

type TrackRowProps = {
  track: Track;
  variant: "artist" | "album" | "playlist";
  emulateMobile?: boolean;
  shy?: boolean;
  i: number;
  playTrack: () => any;
};

const TrackRow = ({
  track,
  variant,
  emulateMobile,
  shy = true,
  i,
  playTrack,
}: TrackRowProps) => {
  const sm = emulateMobile || useMediaQuery(theme.breakpoints.down("md"));

  const { queue, activeQueueIndex, isPlaying } = useAppSelector(
    (state) => state.player
  );
  const active = queue[activeQueueIndex]?.id == track.id;

  const user = useAppSelector((state) => state.user);

  const saved = useTrackSavedStatus(track.id);
  const removeFromPlaylistMutation = useRemoveFromPlaylist(user?.tracksId!);

  if (sm)
    return (
      <Row
        onClick={(e) => {
          if (e.target instanceof Element) {
            // if clicked target is not within a bottom sheet
            if (!e.target.closest("reach-portal")) playTrack();
          }
        }}
        sx={{
          "&:active": {
            opacity: 0.75,
          },
          transition: ".15s",
        }}
      >
        <Cell justifyContent="center">
          {variant == "album" ? (
            <Box
              position="relative"
              sx={{
                position: "relative",
                width: 30,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {active ? (
                <Playing color={colors.primary} isPlaying={isPlaying} />
              ) : (
                <Typography className="index" align="center" fontSize={14}>
                  {i + 1}
                </Typography>
              )}
            </Box>
          ) : (
            <>
              {active && (
                <Playing
                  isPlaying={isPlaying}
                  sx={{
                    position: "absolute",
                  }}
                />
              )}
              <TrackThumbnail
                src={track.thumbnails[0].url}
                sx={{
                  ...(active && {
                    filter: "brightness(50%)",
                  }),
                }}
              />
            </>
          )}
        </Cell>
        <Cell xs ml={1.5}>
          <Box
            sx={{
              position: "relative",

              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            component="span"
          >
            <Typography
              fontWeight={500}
              sx={{
                cursor: "pointer",
                color: active ? colors.primary : "inherit",
              }}
            >
              {track.title}
              {track.isExplicit && (
                <FontIcon
                  sx={{ px: 1, display: "inline-block" }}
                  size={14}
                  icon="fi fi-rr-square-e"
                />
              )}
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              <ArtistText artists={track.artists} />
            </Typography>
          </Box>
        </Cell>
        <Cell id="actionButtons">
          {saved && (
            <IconButton
              onClick={(e) => {
                removeFromPlaylistMutation.mutate(track.id);
                e.stopPropagation();
              }}
            >
              <FontIcon icon={saved ? "zi-saved-solid" : "zi-save"} />
            </IconButton>
          )}
          <TrackOptionsButton track={track} />
        </Cell>
      </Row>
    );
  else
    return (
      <Row
        sx={{
          "&:hover .index": {
            opacity: 0,
          },
        }}
      >
        <Cell justifyContent="center" onClick={playTrack}>
          {variant == "album" ? (
            <Box position="relative" width="30px">
              <Typography className="index" align="center" fontSize={14}>
                {i + 1}
              </Typography>
              <FontIcon
                icon="play"
                size={18}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 2,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className={shy ? "shy" : ""}
              />
            </Box>
          ) : (
            <TrackThumbnail src={track.thumbnails[0].url} />
          )}
        </Cell>
        <Cell
          xs={!track.album?.id || variant == "playlist" ? 6.5 : 4.5}
          justifyContent="space-between"
          gap={1}
        >
          <Typography
            fontWeight={500}
            sx={{
              ml: 2,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={playTrack}
          >
            {track.title}
          </Typography>
          {track.isExplicit && (
            <FontIcon
              sx={{ pr: 2, display: "inline-block" }}
              size={14}
              icon="fi fi-rr-square-e"
            />
          )}
        </Cell>
        <Cell xs>
          <Typography color="text.secondary">
            <ArtistLink artists={track.artists} />
          </Typography>
        </Cell>
        <Cell xs>
          <Link
            component={RouterLink}
            to={`/album/${track.album?.id}`}
            color="text.secondary"
          >
            {track.album?.title}
          </Link>
        </Cell>
        <Cell>
          <IconButton className={!saved ? "shy" : undefined}>
            <FontIcon icon={saved ? "zi-saved-solid" : "zi-save"} />
          </IconButton>
          <IconButton className="shy">
            <FontIcon icon="fi fi-rr-menu-dots-vertical" />
          </IconButton>
        </Cell>
      </Row>
    );
};

type TracksProps = {
  tracks: Track[];
  variant: "artist" | "album" | "playlist";
  emulateMobile?: boolean;
  shy?: boolean;
  queueSource?: QueueSource;
};

// TODO decomplicate this (variants and screen size)
const Tracks = ({
  tracks,
  variant,
  emulateMobile,
  shy = true,
  queueSource,
}: TracksProps): JSX.Element[] => {
  const { playQueue } = useQueue({
    queueSource,
  });

  const playTrack = (i: number) => playQueue(tracks[i]);

  return tracks.map((track, i) => (
    <TrackRow
      key={i}
      track={track}
      variant={variant}
      emulateMobile={emulateMobile}
      shy={shy}
      i={i}
      playTrack={() => playTrack(i)}
    />
  ));
};

type TracksListProps = {
  title?: string;
  variant?: "artist" | "album" | "playlist";
  tracks: Track[];
  emulateMobile?: boolean;
  queueSource?: QueueSource;
  buttons?: {
    variant: "shuffle" | "more" | "custom";
    moreUrl?: string;
    title?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }[];
  sx?: SxProps;
};

export const TracksList = ({
  title,
  variant = "artist",
  tracks,
  emulateMobile,
  queueSource,
  buttons,
  sx,
}: TracksListProps): JSX.Element => {
  const navigate = useAppNavigate();

  const { playQueue, status } = useQueue({
    queueSource,
    options: {
      shuffle: true,
      fixedIndex: undefined,
    },
  });

  return (
    <RowHeader
      title={title}
      sx={sx}
      buttons={buttons?.map((button) => ({
        title: button.variant !== "custom" ? button.variant : button.title,
        onClick:
          button.variant == "more"
            ? () => navigate(button.moreUrl || "")
            : button.variant == "shuffle"
            ? () => playQueue(!queueSource ? tracks[0] : undefined)
            : button.onClick,
        props: {
          sx: {
            transform: `scale(${
              status == "loading" && button.variant == "shuffle" ? 0.95 : 1
            })`,
            opacity:
              status == "loading" && button.variant == "shuffle" ? 0.4 : 1,
          },
        },
      }))}
    >
      <Tracks
        tracks={tracks}
        variant={variant}
        queueSource={queueSource}
        emulateMobile={emulateMobile}
      />
    </RowHeader>
  );
};
