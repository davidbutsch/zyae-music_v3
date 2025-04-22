import { Album, AlbumCards, useAlbum } from "@/features/albums";
import { ArtistLink, ArtistText } from "@/features/artists";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  Content,
  DelayFade,
  FontIcon,
  LoadingBubblesPage,
  MobileHeader,
  Playing,
  ProgressiveImage,
  Spinner,
} from "@/components";
import { useAppSelector, useColorSort, useScroll } from "@/hooks";
import { useSaveAlbum, useSavedStatus, useUnsaveItem } from "@/features/saved";

import { BlurBackground } from "@/components/misc/BlurBackground";
import { DescriptionBox } from "@/components";
import { TracksList } from "@/features/tracks";
import { theme } from "@/styles";
import { useParams } from "react-router-dom";
import { useQueue } from "@/features/player";

const AlbumHead = ({ album }: { album: Album }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { y } = useScroll();

  const { sortColors } = useColorSort(album.palette);

  return (
    <Stack
      direction={xs ? "column" : "row"}
      alignItems={"center"}
      gap={{ sm: 5 }}
      mb={{ xs: 4, sm: 0 }}
      sx={{
        pt: "calc(env(safe-area-inset-top))",
      }}
    >
      <BlurBackground
        colors={sortColors(["area"]).map((color) => color.hex)}
        sx={{
          position: { xs: "fixed", sm: "absolute" },
          top: 0,
          left: 0,
          width: "100%",

          mask: "linear-gradient(#fff, transparent)",

          ...(!xs && { opacity: 0.25 }),
        }}
        style={{ height: `calc(60vh - ${y}px)` }}
      />
      <ProgressiveImage
        src={album.thumbnails[3].url}
        sx={{
          position: "relative",
          width: {
            xs: "30vh",
            sm: 192,
            md: 224,
            lg: 256,
          },
          height: {
            xs: "30vh",
            sm: 192,
            md: 224,
            lg: 256,
          },

          borderRadius: 1 / 2,
          aspectRatio: "1 / 1",
        }}
        style={{
          ...(xs && {
            transform: `scale(${Math.min(1.4, Math.max(0, (y - 750) / -750))})`,
            transformOrigin: "bottom",
          }),
        }}
      />
      <Stack
        position="relative"
        mt={{ xs: 2, sm: 0 }}
        maxWidth={{ xs: "100%", sm: "50%" }}
        width="100%"
        gap={{ xs: 1, sm: 2 }}
        textAlign={xs ? "center" : undefined}
      >
        <Typography
          variant="h4"
          fontSize={{ xs: 24, sm: 32, md: 40, xl: 48 }}
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
        <Typography
          sx={{
            color: "text.secondary",
          }}
        >
          <ArtistLink
            sx={{
              whiteSpace: "wrap",
            }}
            beforeText={`${album.type} by `}
            artists={album.artists}
          />
        </Typography>
        {!xs && (
          <Typography color="text.secondary" mt={{ sm: -2 }}>
            {album.trackCount} {album.trackCount > 1 ? "tracks" : "track"} •{" "}
            {album.duration} • {album.year}
          </Typography>
        )}
        <AlbumOptions album={album} />
      </Stack>
    </Stack>
  );
};

const SaveButton = ({ album }: { album: Album }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const saved = useSavedStatus(album.id);
  const saveAlbumMutation = useSaveAlbum();
  const unsaveMutation = useUnsaveItem();

  return (
    <Button
      fullWidth={xs}
      sx={{ px: 2, gap: 1.5 }}
      variant="translucent"
      onClick={() => {
        saved
          ? unsaveMutation.mutate(album.id)
          : saveAlbumMutation.mutate(album);
      }}
    >
      <FontIcon icon={`zi-${saved ? "saved-solid" : "save"}`} />
      {saved ? "saved" : "save"}
    </Button>
  );
};

const AlbumOptions = ({ album }: { album: Album }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { playQueue, status } = useQueue({
    queueSource: {
      id: album.id,
      title: album.title,
      type: "album",
    },
    options: {
      shuffle: true,
      fixedIndex: undefined,
    },
  });

  const { queueSource, isPlaying, options } = useAppSelector(
    (state) => state.player
  );

  const shuffleActive =
    isPlaying && queueSource.id == album.id && options.shuffle;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={{ xs: "center", sm: "inherit" }}
      gap={2}
      mt={{ xs: 1, sm: 0 }}
    >
      <Button
        fullWidth={xs}
        sx={{ px: 2, gap: 1.5 }}
        variant="translucent"
        onClick={() => playQueue()}
      >
        {status == "loading" ? (
          <Spinner size={16} />
        ) : shuffleActive ? (
          <Playing />
        ) : (
          <FontIcon icon="fi fi-rr-shuffle" />
        )}
        Shuffle
      </Button>
      <SaveButton album={album} />
    </Stack>
  );
};

const AlbumContent = ({ album }: { album?: Album }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  if (!album) return <LoadingBubblesPage />;

  return (
    <DelayFade
      in={Boolean(album)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <AlbumHead album={album} />
      <TracksList
        queueSource={{
          id: album.id,
          title: album.title,
          type: "album",
        }}
        variant="album"
        tracks={album.tracks}
        sx={{
          mt: { xs: -5, sm: "inherit" },
        }}
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
          thumbnail={album.thumbnails[album.thumbnails.length - 1].url}
        />
      )}
      {!album.description && xs && (
        <Typography
          color="text.secondary"
          align="center"
          mt={{ xs: -1, sm: -2 }}
        >
          {album.trackCount} {album.trackCount > 1 ? "tracks" : "track"} •{" "}
          {album.duration} • {album.year}
        </Typography>
      )}
    </DelayFade>
  );
};

export const AlbumPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { albumId } = useParams();
  if (!albumId) return;
  const { data: album } = useAlbum(albumId);

  console.log(album);

  const saved = useSavedStatus(album?.id);
  const saveAlbumMutation = useSaveAlbum();
  const unsaveMutation = useUnsaveItem();

  return (
    <Content
      sx={{
        position: "relative",
        pt: "48px !important",
      }}
    >
      {xs && (
        <MobileHeader
          head={album?.title || ""}
          fadeTrigger={{ y: 1, fadeHeadY: 280 }}
          options={{
            headerOptions: {
              type: "album",
              head: album?.title,
              sub: `${album?.type} • ${ArtistText({
                artists: album?.artists,
              })}`,
              thumbnail: album?.thumbnails[0].url,
            },
            items: [
              {
                icon: saved ? "zi-saved-solid" : "zi-save",
                title: saved ? "Remove from Saved" : "Add to Saved",
                onClick: saved
                  ? () => unsaveMutation.mutate(albumId)
                  : () => saveAlbumMutation.mutate(album),
              },
              {
                icon: "zi-share",
                title: "Share",
                onClick: () => navigator.share({ url: window.location.href }),
              },
            ],
          }}
          sx={{
            "&:before": {
              transition: ".3s",
            },
          }}
        />
      )}
      <AlbumContent album={album} />
    </Content>
  );
};
