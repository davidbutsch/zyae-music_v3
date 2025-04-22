import {
  Box,
  Button,
  Fade,
  Skeleton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useAppNavigate, useColorSort } from "@/hooks";

import { DescriptionBox } from "@/components";
import { GenericCard } from "@/types";
import { TracksList } from "@/features/tracks";
import { useAlbum } from "@/features/albums";
import { useArtist } from "@/features/artists";
import { usePlaylist } from "@/features/playlists";

const LoadingCards = () => {
  return (
    <Stack spacing={2.5}>
      <Skeleton variant="rounded" height={375} />
      <Skeleton variant="rounded" height={455} />
    </Stack>
  );
};

const Artist = ({ item }: { item: GenericCard | null }) => {
  const navigate = useAppNavigate();

  if (!item) return null;

  const { data: artist } = useArtist(item?.id);

  const { sortColors } = useColorSort(artist?.palette);
  const accentColors = sortColors(["intensity"]);

  if (!artist) return <LoadingCards />;

  return (
    <Fade in={Boolean(artist)}>
      <Stack gap={2.5}>
        {artist.description && (
          <DescriptionBox
            title=""
            head={artist.name}
            palette={artist.palette}
            sub={artist.views}
            text={artist.description}
            thumbnail={artist.banners.mobile}
          />
        )}
        <Stack
          sx={{
            position: "relative",

            p: 2,

            borderRadius: 1,
            overflow: "hidden",

            "&:before": {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, ${alpha(
                accentColors[0].hex,
                0.2
              )}, ${alpha(accentColors[1].hex, 0.2)})`,
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" fontWeight={500} zIndex={1}>
              Top Tracks
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(`../../playlist/${artist.tracks.id}`)}
            >
              More
            </Button>
          </Stack>
          <TracksList
            variant="artist"
            tracks={artist.tracks.results}
            emulateMobile
          />
        </Stack>
      </Stack>
    </Fade>
  );
};

const Album = ({ item }: { item: GenericCard | null }) => {
  const navigate = useAppNavigate();

  if (!item) return null;

  const { data: album } = useAlbum(item?.id);

  const { sortColors } = useColorSort(album?.palette);
  const accentColors = sortColors(["intensity"]);

  if (!album) return <LoadingCards />;

  return (
    <Fade in={Boolean(album)}>
      <Stack gap={2.5}>
        {album.description && (
          <DescriptionBox
            title=""
            head={album.title}
            palette={album.palette}
            sub={[
              `${album.trackCount && `${album.trackCount} tracks`}`,
              album.duration,
              album.year,
            ]
              .filter(Boolean)
              .join(" • ")}
            text={album.description}
            thumbnail={album.thumbnails[0].url}
            sx={{
              aspectRatio: "none !important",
            }}
          />
        )}

        <Stack
          sx={{
            position: "relative",

            p: 2,

            borderRadius: 1,
            overflow: "hidden",

            "&:before": {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, ${alpha(
                accentColors[0].hex,
                0.2
              )}, ${alpha(accentColors[1].hex, 0.2)})`,
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" fontWeight={500} zIndex={1}>
              Tracks
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(`../../album/${item.id}`)}
            >
              View all
            </Button>
          </Stack>
          <TracksList
            variant="album"
            tracks={album.tracks.slice(0, 5)}
            emulateMobile
          />
        </Stack>
      </Stack>
    </Fade>
  );
};

const Playlist = ({ item }: { item: GenericCard | null }) => {
  const navigate = useAppNavigate();

  if (!item) return null;

  const { data: playlist } = usePlaylist(item?.id);

  const { sortColors } = useColorSort(playlist?.palette);
  const accentColors = sortColors(["intensity"]);

  if (!playlist) return <LoadingCards />;

  return (
    <Fade in={Boolean(playlist)}>
      <Stack gap={2.5}>
        {playlist.description && (
          <DescriptionBox
            title=""
            head={playlist.title}
            palette={playlist.palette}
            sub={[
              `${playlist.trackCount && `${playlist.trackCount} tracks`}`,
              playlist.duration,
              playlist.year,
            ]
              .filter(Boolean)
              .join(" • ")}
            text={playlist.description}
            thumbnail={playlist.thumbnails[0].url}
            sx={{
              aspectRatio: "none !important",
            }}
          />
        )}

        <Stack
          sx={{
            position: "relative",

            p: 2,

            borderRadius: 1,
            overflow: "hidden",

            "&:before": {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, ${alpha(
                accentColors[0].hex,
                0.2
              )}, ${alpha(accentColors[1].hex, 0.2)})`,
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" fontWeight={500} zIndex={1}>
              Tracks
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(`../../playlist/${item.id}`)}
            >
              View all
            </Button>
          </Stack>
          <TracksList tracks={playlist.tracks.slice(0, 5)} emulateMobile />
        </Stack>
      </Stack>
    </Fade>
  );
};

export const Peak = ({ peaked }: { peaked: GenericCard | null }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,

        p: 5,
        pr: 0,

        height: "100%",

        width: "50%",
        minWidth: "300px",

        overflowY: "scroll",

        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {!peaked && <LoadingCards />}
      {peaked?.type == "artist" && <Artist item={peaked} />}
      {peaked?.type == "album" && <Album item={peaked} />}
      {peaked?.type == "playlist" && <Playlist item={peaked} />}
    </Box>
  );
};
