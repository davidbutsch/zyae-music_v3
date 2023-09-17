import { AlbumCards, useAlbum } from "@/features/albums";
import { Button, Stack, Typography } from "@mui/material";
import {
  Content,
  FlaticonIcon,
  ProgressiveBoxImage,
  ProgressiveImage,
} from "@/components";

import { ArtistLink } from "@/features/artists";
import { TracksList } from "@/features/tracks";
import { useParams } from "react-router-dom";

export const AlbumPage = () => {
  const { albumId } = useParams();

  if (!albumId) return null;

  const { status, data: album } = useAlbum(albumId);

  if (status !== "success") return <>Loading</>;

  return (
    <Content
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Stack direction="row" spacing={5}>
        <ProgressiveBoxImage
          src={album.thumbnails.large}
          width={256}
          height={256}
          sx={{
            position: "relative",
            borderRadius: 1 / 2,
          }}
        >
          <ProgressiveImage
            src={album.thumbnails.large}
            width={256}
            sx={{
              position: "absolute",
              zIndex: -1,
              left: 0,
              filter: "blur(24px) opacity(.5)",
              borderRadius: 1 / 2,
            }}
          />
        </ProgressiveBoxImage>
        <Stack gap={2} py={4} position="relative" zIndex={2}>
          <Typography variant="h4" fontSize={40} fontWeight={500}>
            {album.title}
          </Typography>
          <ArtistLink
            beforeText={`${album.type} by `}
            artists={album.artists}
          />
          <Typography color="text.secondary" mt={-2}>
            {album.trackCount} {album.trackCount > 1 ? "tracks" : "track"} •{" "}
            {album.duration} • {album.year}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2} mt="auto">
            <Button sx={{ px: 2 }} variant="translucent">
              <FlaticonIcon icon="fi fi-rr-shuffle" />
              Shuffle
            </Button>
            <Button sx={{ px: 2 }} variant="translucent">
              <FlaticonIcon icon="fi fi-rr-bookmark" />
              Save
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <TracksList variant="album" tracks={album.tracks} />
      {album.otherVersions && (
        <AlbumCards
          carousel={false}
          title="Other Versions"
          albums={album.otherVersions}
        />
      )}
    </Content>
  );
};
