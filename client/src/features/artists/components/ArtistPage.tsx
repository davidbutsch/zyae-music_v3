// import { Image } from "@/components";

import {
  Box,
  Button,
  Stack,
  Typography,
  alpha,
  darken,
  styled,
  useMediaQuery,
} from "@mui/material";
import { Content, IconButton } from "@/components";

import { FlaticonIcon } from "@/components";
import { TracksList } from "@/features/tracks";
import { theme } from "@/styles";
import { useArtist } from "@/features/artists";
import { useParams } from "react-router-dom";

type BannerImageProps = {
  src: string;
};

const BannerImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "src" && prop !== "isMobile",
})<BannerImageProps>(({ theme, src }) => {
  return theme.unstable_sx({
    px: { xs: 2, sm: 4, md: 4, lg: 8 },

    height: "50vh",

    display: "flex",
    flexDirection: "column",
    justifyContent: "end",

    overflow: "visible",

    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: { xs: "60vh", sm: "70vh" },

      backgroundSize: `cover`,
      backgroundPosition: "center center",
      backgroundImage: `url(${src})`,

      mask: `linear-gradient(to bottom, #fff, rgba(0, 0, 0, 0))`,
    },
  });
});

type BannerButtonProps = {
  artistColor: string;
};

const BannerButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "artistColor",
})<BannerButtonProps>(({ theme, artistColor, variant }) => {
  return theme.unstable_sx({
    px: 3,

    gap: 1.5,
    bgcolor: "transparent",
    color: artistColor,

    "&:hover": {
      bgcolor: alpha(artistColor, 0.16),
    },

    ...(variant == "contained" && {
      bgcolor: artistColor,
      color: darken(artistColor, 0.8),

      "&:hover": {
        bgcolor: darken(artistColor, 0.16),
      },
      "&:focus": {
        borderColor: artistColor,
      },
    }),

    ...(variant == "outlined" && {
      bgcolor: "transparent",
      borderColor: artistColor,
      color: artistColor,

      "&:hover, &:focus": {
        bgcolor: alpha(artistColor, 0.16),
        borderColor: artistColor,
        color: artistColor,
      },
    }),
  });
});

export const ArtistPage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  var { artistId } = useParams();

  if (!artistId) return null;

  const { status, data: artist } = useArtist(artistId);

  if (status !== "success") return <>{status}</>;

  return (
    <>
      <BannerImage
        src={artist.thumbnails.banner[isSmallScreen ? "mobile" : "desktop"]}
      >
        <Stack
          spacing={3}
          sx={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h3"
            color={artist.palette.byLightness[0].hex}
            fontSize={{ xs: 56, sm: 56, md: 64 }}
            fontWeight={500}
            align={isMobile ? "center" : "left"}
          >
            {artist.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={isMobile ? 2 : 1.5}
          >
            <BannerButton
              variant="contained"
              fullWidth={isMobile}
              artistColor={artist.palette.byLightness[0].hex}
            >
              <FlaticonIcon icon="fi fi-rr-shuffle" />
              Shuffle
            </BannerButton>
            <BannerButton
              variant="outlined"
              fullWidth={isMobile}
              artistColor={artist.palette.byLightness[0].hex}
            >
              <FlaticonIcon icon="fi fi-rr-bookmark" />
              Save
            </BannerButton>
            {!isMobile && (
              <IconButton
                sx={{
                  color: artist.palette.byLightness[0].hex,
                  "&:hover": {
                    bgcolor: alpha(artist.palette.byLightness[0].hex, 0.16),
                  },
                }}
              >
                <FlaticonIcon icon="fi fi-rr-menu-dots-vertical" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </BannerImage>
      <Content>
        <Stack my={1.5} direction="row" justifyContent="space-between">
          <Typography variant="h5" fontWeight={500}>
            Top Songs
          </Typography>
          <BannerButton
            size="small"
            variant="outlined"
            artistColor={artist.palette.byLightness[0].hex}
            sx={{ px: 1.5 }}
          >
            More
          </BannerButton>
        </Stack>
        <TracksList variant="artist" tracks={artist.tracks.results} />
      </Content>
    </>
  );
};
