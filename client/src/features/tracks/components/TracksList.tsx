import {
  Box,
  Button,
  Grid,
  Stack,
  SxProps,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FlaticonIcon, IconButton, ImageIcon } from "@/components";

import { ArtistLink } from "@/features/artists";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Track } from "@/features/tracks";
import { theme } from "@/styles";
import { useNavigate } from "react-router-dom";

type ThumbnailProps = {
  src: string;
  shy?: boolean;
};
const Thumbnail = ({ src, shy = true }: ThumbnailProps): JSX.Element => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box
      sx={{
        height: 34,
        minHeight: 34,
        width: 34,
        minWidth: 34,

        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 1 / 8,
        cursor: "pointer",
      }}
    >
      <ImageIcon
        size={18}
        src="https://zyae.net/assets/images/icons/play.svg"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          ...(xs && { opacity: "0 !important" }),
        }}
        className={shy ? "shy" : ""}
      />
    </Box>
  );
};

const Row = styled(Grid)(({ theme }) =>
  theme.unstable_sx({
    py: 1,

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
    pl: 1,

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

type TracksProps = {
  tracks: Track[];
  variant: "artist" | "album";
  shy?: boolean;
};

// TODO decomplicate this code (variants and screen size)
const Tracks = ({
  tracks,
  variant,
  shy = true,
}: TracksProps): JSX.Element[] => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  return tracks.map((track, i) => {
    if (sm)
      return (
        <Row key={track.id}>
          <Cell justifyContent="center" width="40px">
            {variant == "artist" && <Thumbnail src={track.thumbnail.small} />}
            {variant == "album" && (
              <Box position="relative">
                <Typography className="index" fontSize={14}>
                  {i + 1}
                </Typography>
                <ImageIcon
                  size={18}
                  src="https://zyae.net/assets/images/icons/play.svg"
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

                    ...(sm && { opacity: "0 !important" }),
                  }}
                  className={shy ? "shy" : ""}
                />
              </Box>
            )}
          </Cell>
          <Cell xs ml={1}>
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
                }}
              >
                {track.title}
                {track.isExplicit && (
                  <FlaticonIcon
                    sx={{ px: 1, display: "inline-block" }}
                    size={14}
                    icon="fi fi-rr-square-e"
                  />
                )}
              </Typography>
              <Typography fontWeight={500} variant="subtitle2">
                <ArtistLink artists={track.artists} />
              </Typography>
            </Box>
          </Cell>
          <Cell>
            <IconButton>
              <FlaticonIcon icon="fi fi-rr-menu-dots-vertical" />
            </IconButton>
          </Cell>
        </Row>
      );
    else
      return (
        <Row
          key={track.id}
          sx={{
            "&:hover .index": {
              opacity: 0,
            },
          }}
        >
          <Cell justifyContent="center" width={40}>
            {variant == "artist" && <Thumbnail src={track.thumbnail.small} />}
            {variant == "album" && (
              <Box position="relative">
                <Typography className="index">{i + 1}</Typography>
                <ImageIcon
                  size={18}
                  src="https://zyae.net/assets/images/icons/play.svg"
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

                    ...(xs && { opacity: "0 !important" }),
                  }}
                  className={shy ? "shy" : ""}
                />
              </Box>
            )}
          </Cell>
          <Cell
            xs={variant == "album" ? 6 : 4.5}
            justifyContent="space-between"
            gap={1}
          >
            <Typography fontWeight={500} sx={{ ml: 1, cursor: "pointer" }}>
              {track.title}
            </Typography>
            {track.isExplicit && (
              <FlaticonIcon
                sx={{ pr: 2, display: "inline-block" }}
                size={14}
                icon="fi fi-rr-square-e"
              />
            )}
          </Cell>
          <Cell xs>
            <ArtistLink artists={track.artists} />
          </Cell>
          {track.album?.id && (
            <Cell xs>
              <Link
                component={RouterLink}
                to={`/album/${track.album.id}`}
                color="text.secondary"
              >
                {track.album.title}
              </Link>
            </Cell>
          )}

          <Cell className="shy">
            <IconButton>
              <FlaticonIcon icon="fi fi-rr-bookmark" />
            </IconButton>
            <IconButton>
              <FlaticonIcon icon="fi fi-rr-menu-dots-vertical" />
            </IconButton>
          </Cell>
        </Row>
      );
  });
};

type TracksListProps = {
  title?: string;
  moreUrl?: string;
  variant: "artist" | "album";
  tracks: Track[];
  sx?: SxProps;
};

export const TracksList = ({
  title,
  moreUrl,
  variant,
  tracks,
  sx,
}: TracksListProps): JSX.Element => {
  const navigate = useNavigate();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box sx={sx} zIndex={1}>
      <Stack direction="row" alignItems="center" mb={2.5}>
        {title && (
          <Typography variant="h5" fontWeight={500}>
            {title}
          </Typography>
        )}
        {moreUrl && (
          <Button
            size={xs ? "small" : "medium"}
            variant="outlined"
            onClick={() => navigate(moreUrl)}
            sx={{ ml: "auto" }}
          >
            More
          </Button>
        )}
      </Stack>
      <Tracks tracks={tracks} variant={variant} />
    </Box>
  );
};
