import { AlbumCards, useAlbum } from "@/features/albums";
import { Button, Stack, Typography, alpha, useMediaQuery } from "@mui/material";
import { Content, FlaticonIcon, ProgressiveImage } from "@/components";

import { ArtistLink } from "@/features/artists";
import { DescriptionBox } from "@/components";
import { TracksList } from "@/features/tracks";
import { theme } from "@/styles";
import { useParams } from "react-router-dom";

export const AlbumPage = () => {
  const { albumId } = useParams();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  if (!albumId) return null;

  const { status, data: album } = useAlbum(albumId);

  if (status !== "success") return <>Loading</>;

  return (
    <Content
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 5 },
        position: "relative",
        zIndex: 1,

        "&:before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60vh",
          background: `linear-gradient(90deg, ${alpha(
            album.palette.byIntensity[0].hex,
            0.2
          )}, ${alpha(album.palette.byIntensity[1].hex, 0.2)})`,
          mask: "linear-gradient(#fff, transparent)",
        },
      }}
    >
      <Stack
        direction={xs ? "column" : "row"}
        alignItems={"center"}
        spacing={{ sm: 5 }}
      >
        <ProgressiveImage
          src={album.thumbnails.large}
          sx={{
            position: "relative",
            width: {
              xs: "100%",
              sm: 192,
              md: 224,
              lg: 256,
            },
            height: {
              xs: "100%",
              sm: 192,
              md: 224,
              lg: 256,
            },

            maxWidth: "30vh",

            borderRadius: 1 / 2,
            aspectRatio: "1 / 1",
          }}
        />
        <Stack
          position="relative"
          mt={{ xs: 2.5, sm: 0 }}
          maxWidth={{ xs: "100%", sm: "50%" }}
          width="100%"
          gap={{ xs: 1, sm: 2 }}
          zIndex={2}
          textAlign={xs ? "center" : undefined}
        >
          <Typography
            variant="h4"
            fontSize={{ xs: 30, sm: 30, md: 38, lg: 38, xl: 46 }}
            fontWeight={500}
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",

              "@supports(-webkit-line-clamp: 2)": {
                whiteSpace: "initial",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              },
            }}
          >
            {album.title}
          </Typography>
          <ArtistLink
            sx={{
              whiteSpace: "wrap",
            }}
            beforeText={`${album.type} by `}
            artists={album.artists}
          />
          {!xs && (
            <Typography color="text.secondary" mt={{ xs: -1, sm: -2 }}>
              {album.trackCount} {album.trackCount > 1 ? "tracks" : "track"} •{" "}
              {album.duration} • {album.year}
            </Typography>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xs: "center", sm: "inherit" }}
            spacing={2}
            mt={{ xs: 2, sm: 0 }}
          >
            <Button fullWidth={xs} sx={{ px: 2 }} variant="translucent">
              <FlaticonIcon icon="fi fi-rr-shuffle" />
              Shuffle
            </Button>
            <Button fullWidth={xs} sx={{ px: 2 }} variant="translucent">
              <FlaticonIcon icon="fi fi-rr-bookmark" />
              Save
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <TracksList
        variant="album"
        tracks={album.tracks}
        sx={{ mt: { xs: -4, sm: 0 } }}
      />

      {album.otherVersions && (
        <AlbumCards
          title="Other Versions"
          carousel={false}
          albums={album.otherVersions}
        />
      )}
      {album.description && (
        <DescriptionBox
          head={album.title}
          sub={`${album.trackCount} ${
            album.trackCount > 1 ? "tracks" : "track"
          } • ${album.duration} • ${album.year}`}
          text={album.description}
          palette={album.palette}
          thumbnail={album.thumbnails.large}
        />
      )}
    </Content>
  );
};
