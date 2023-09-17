// import { Image } from "@/components";

import { ArtistCards, useArtist } from "@/features/artists";
import {
  Box,
  Button,
  Stack,
  Typography,
  alpha,
  darken,
  lighten,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

import { AlbumCards } from "@/features/albums";
import { Content } from "@/components";
import { FlaticonIcon } from "@/components";
import { TracksList } from "@/features/tracks";
import { theme } from "@/styles";
import { useParams } from "react-router-dom";

type BannerImageProps = {
  src: string;
};

const BannerImage = ({ src }: BannerImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <Box
      sx={{
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
          height: { xs: "60vh", sm: "70vh" },
          width: "100%",

          backgroundSize: `cover`,
          backgroundPosition: "center center",
          backgroundImage: `url(${src})`,

          mask: `linear-gradient(to bottom, #fff, rgba(0, 0, 0, 0))`,

          ...(loaded
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
              }),

          transition: "opacity .3s",
        },
      }}
    ></Box>
  );
};

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
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  var { artistId } = useParams();

  if (!artistId) return null;

  const { status, data: artist } = useArtist(artistId);

  if (status !== "success") return <>{status}</>;

  return (
    <Box>
      <BannerImage src={artist.thumbnails.banner[sm ? "mobile" : "desktop"]} />
      <Content
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          mt: { xs: -10, sm: -20 },
        }}
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
            align={xs ? "center" : "left"}
          >
            {artist.name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={xs ? 2 : 1.5}>
            <BannerButton
              variant="contained"
              fullWidth={xs}
              artistColor={artist.palette.byLightness[0].hex}
            >
              <FlaticonIcon icon="fi fi-rr-shuffle" />
              Shuffle
            </BannerButton>
            <BannerButton
              variant="outlined"
              fullWidth={xs}
              artistColor={artist.palette.byLightness[0].hex}
            >
              <FlaticonIcon icon="fi fi-rr-bookmark" />
              Save
            </BannerButton>
          </Stack>
        </Stack>
        <TracksList
          title="Top Songs"
          moreUrl="temp"
          variant="artist"
          tracks={artist.tracks.results}
          sx={{ flexGrow: 2 }}
        />
        <AlbumCards
          title="Albums"
          moreUrl={artist.albums.id ? "discography/albums" : undefined}
          albums={artist.albums.results}
        />
        <AlbumCards
          title="Singles"
          moreUrl={artist.singles.id ? "discography/singles" : undefined}
          albums={artist.singles.results}
        />
        <ArtistCards title="Similar Artists" artists={artist.similar.results} />
      </Content>
    </Box>
  );
};
