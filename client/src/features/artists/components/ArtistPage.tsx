import {
  Artist,
  ArtistCards,
  useArtist,
  useArtistSavedTracks,
} from "@/features/artists";
import {
  BannerImage,
  Content,
  DelayFade,
  DescriptionBox,
  FontIcon,
  LoadingBubblesPage,
  MobileHeader,
  Playing,
  ProgressiveImage,
  Spinner,
} from "@/components";
import {
  Button,
  IconButton,
  Stack,
  Typography,
  alpha,
  lighten,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useAppNavigate, useAppSelector, useColorSort } from "@/hooks";
import { useEffect, useRef } from "react";
import { useSaveArtist, useSavedStatus, useUnsaveItem } from "@/features/saved";

import { AlbumCards } from "@/features/albums";
import { TracksList } from "@/features/tracks";
import { theme } from "@/styles";
import { useParams } from "react-router-dom";
import { useQueue } from "@/features/player";

type BannerButtonProps = {
  artistColor: string;
};

const BannerButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "artistColor",
})<BannerButtonProps>(({ theme, artistColor }) => {
  return theme.unstable_sx({
    px: 3,

    gap: 1.5,

    bgcolor: alpha(artistColor, 0.08),

    color: artistColor,
    borderColor: alpha(artistColor, 0.32),

    "&:hover, &:hover": {
      bgcolor: alpha(artistColor, 0.16),
      borderColor: artistColor,
      color: artistColor,
    },
  });
});

function getTextWidth(text: string, font: string) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  } else return 0;
}

const SaveButton = ({
  artist,
  bannerColor,
}: {
  artist: Artist;
  bannerColor: string;
}) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const saved = useSavedStatus(artist.id);
  const saveArtistMutation = useSaveArtist();
  const unsaveMutation = useUnsaveItem();

  return (
    <BannerButton
      fullWidth={xs}
      sx={{ px: 2, gap: 1.5 }}
      variant="outlined"
      onClick={() => {
        saved
          ? unsaveMutation.mutate(artist.id)
          : saveArtistMutation.mutate(artist);
      }}
      artistColor={bannerColor}
    >
      <FontIcon icon={`zi-${saved ? "saved-solid" : "save"}`} />
      {saved ? "saved" : "save"}
    </BannerButton>
  );
};

const FromSaved = ({
  artistId,
  name,
  accentColor,
}: {
  artistId: string;
  name: string;
  accentColor: string;
}) => {
  const navigate = useAppNavigate();

  const tracks = useArtistSavedTracks(artistId);

  if (tracks.length == 0) return;

  return (
    <Stack
      onClick={() => navigate("./saved")}
      direction="row"
      sx={{
        p: 1.5,

        width: "100%",

        alignItems: "center",
        gap: 2,

        bgcolor: alpha(accentColor, 0.08),
        border: `solid 1px ${alpha(accentColor, 0.32)}`,
        borderRadius: "20px",
      }}
    >
      <ProgressiveImage
        src={tracks[0].thumbnails[0].url}
        sx={{
          width: 64,
          // aspectRatio: 1,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          bgcolor: alpha(accentColor, 0.08),
          border: `solid 1px ${alpha(accentColor, 0.08)}`,
          borderRadius: "12px",
        }}
      ></ProgressiveImage>
      <Stack justifyContent="center">
        <Typography fontSize={18} fontWeight={500}>
          Saved By {name}
        </Typography>
        <Typography color={alpha(accentColor, 0.72)}>
          {tracks?.length} {tracks?.length == 1 ? "Track" : "Tracks"}
        </Typography>
      </Stack>
      <IconButton
        sx={{
          ml: "auto",
        }}
      >
        <FontIcon icon="zi-angle-forward" />
      </IconButton>
    </Stack>
  );
};

const ArtistContent = ({ artist }: { artist?: Artist }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useAppNavigate();

  const titleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const resize = () => {
      if (titleRef.current) {
        var fontSize = window.getComputedStyle(titleRef.current).fontSize;
        const textWidth = getTextWidth(
          artist?.name || "",
          `normal ${fontSize} Roboto`
        );
        if (textWidth > window.innerWidth - 32) {
          titleRef.current.style.fontSize = parseFloat(fontSize) - 1 + "px";
          resize();
        }
      }
    };
    resize();
  }, [titleRef]);

  const { queueSource, isPlaying, options } = useAppSelector(
    (state) => state.player
  );

  const { playQueue, status } = useQueue({
    queueSource: {
      id: artist?.tracks.id || "",
      title: `By ${artist?.name}`,
      type: "playlist",
      queryParams: "?compressed=true&title=Top Tracks",
    },
    options: {
      shuffle: true,
      fixedIndex: undefined,
    },
  });

  const { sortColors } = useColorSort(artist?.palette, {
    colorShifter: (color) => {
      if (color.lightness <= 0.8)
        return {
          ...color,
          hex: lighten(color.hex, 0.85 - color.lightness),
          lightness: 0.85,
        };

      return color;
    },
  });

  if (!artist) return <LoadingBubblesPage />;

  const artistColors = sortColors([
    "lightness",
    "intensity",
    "saturation",
    "area",
  ]);
  const accentColor = artistColors[0].hex;

  const shuffleActive =
    isPlaying &&
    queueSource.id &&
    queueSource.id == artist.tracks.id &&
    options.shuffle;

  return (
    <DelayFade in={Boolean(artist)}>
      <BannerImage
        src={artist.banners[sm ? "mobile" : "desktop"]}
        height={50}
        sx={{
          height: "47.5vh",
        }}
      />
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
          }}
        >
          <Typography
            variant="h3"
            color={accentColor}
            fontSize={{ xs: 56, sm: 56, md: 64 }}
            fontWeight={500}
            align={xs ? "center" : "left"}
            ref={titleRef}
          >
            {artist.name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={xs ? 2 : 1.5}>
            <BannerButton
              variant="outlined"
              fullWidth={xs}
              artistColor={accentColor}
              onClick={() => playQueue()}
            >
              {status == "loading" ? (
                <Spinner color={accentColor} size={16} />
              ) : shuffleActive ? (
                <Playing color={accentColor} />
              ) : (
                <FontIcon icon="fi fi-rr-shuffle" />
              )}
              Shuffle
            </BannerButton>
            <SaveButton artist={artist} bannerColor={accentColor} />
          </Stack>
        </Stack>
        {artist.tracks.results.length > 0 && (
          <TracksList
            queueSource={{
              id: artist.tracks.id || "",
              title: `By ${artist.name}`,
              type: "playlist",
            }}
            title="Top Tracks"
            variant="artist"
            tracks={artist.tracks.results}
            buttons={[
              {
                variant: "more",
                moreUrl: `../../playlist/${artist.tracks.id}/?compressed=true&title=Top Tracks`,
              },
            ]}
            sx={{ flexGrow: 2 }}
          />
        )}
        {artist.albums.results.length > 0 && (
          <AlbumCards
            title="Albums & EPs"
            moreUrl={artist.albums.id ? "discography/albums" : undefined}
            albums={artist.albums.results}
          />
        )}
        {artist.singles.results.length > 0 && (
          <AlbumCards
            title="Singles"
            moreUrl={artist.singles.id ? "discography/singles" : undefined}
            albums={artist.singles.results}
          />
        )}
        {xs && (
          <BannerButton
            variant="outlined"
            onClick={() => navigate("./discography/all")}
            artistColor={accentColor}
            sx={{
              mx: "auto",
              px: 3,

              maxWidth: "fit-content",

              gap: 1.5,
            }}
          >
            <FontIcon icon="fi fi-rr-album-collection" />
            View discography
          </BannerButton>
        )}
        {artist.videos.results.length > 0 && (
          <TracksList
            queueSource={{
              id: artist.videos.id || "",
              title: `By ${artist.name}`,
              type: "playlist",
            }}
            title="Music Videos"
            variant="artist"
            tracks={artist.videos.results}
            buttons={[
              {
                variant: "more",
                moreUrl: `../../playlist/${artist.videos.id}/?compressed=true&title=Music Videos`,
              },
            ]}
            sx={{ flexGrow: 2 }}
          />
        )}
        {artist.similar.results.length > 0 && (
          <ArtistCards
            title="Similar Artists"
            artists={artist.similar.results}
          />
        )}
        <FromSaved
          artistId={artist.id}
          name={artist.name}
          accentColor={accentColor}
        />
        {artist.description && (
          <DescriptionBox
            head={artist.name}
            text={artist.description}
            palette={artist.palette}
            thumbnail={artist.banners.mobile}
          />
        )}
      </Content>
    </DelayFade>
  );
};

export const ArtistPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  var { artistId } = useParams();
  if (!artistId) return null;
  const { data: artist } = useArtist(artistId);

  const saved = useSavedStatus(artistId);
  const saveArtistMutation = useSaveArtist();
  const unsaveMutation = useUnsaveItem();

  return (
    <>
      {xs && (
        <MobileHeader
          head={artist?.name || ""}
          fadeTrigger={{
            y: window.innerHeight * 0.3,
            fadeHeadY: window.innerHeight * 0.3,
          }}
          options={{
            headerOptions: {
              type: "artist",
              head: artist?.name,
              sub: "Artist",
              thumbnail: artist?.thumbnails[0].url,
            },
            items: [
              {
                icon: saved ? "zi-saved-solid" : "zi-save",
                title: saved ? "Remove from Saved" : "Add to Saved",
                onClick: saved
                  ? () => unsaveMutation.mutate(artistId)
                  : () => saveArtistMutation.mutate(artist),
              },
              {
                icon: "zi-share",
                title: "Share",
                onClick: () =>
                  navigator.share({
                    url: window.location.href,
                  }),
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
      <ArtistContent artist={artist} />
    </>
  );
};
