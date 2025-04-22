import {
  BannerImage,
  Content,
  DelayFade,
  LoadingBubblesPage,
  MobileHeader,
} from "@/components";
import { Typography, useMediaQuery } from "@mui/material";

import { AlbumCards } from "@/features/albums";
import { Genre } from "../types";
import { MoodBox } from "@/features/moods/components";
import { PlaylistCards } from "@/features/playlists";
import { TracksList } from "@/features/tracks";
import { insertIf } from "@/utils";
import { theme } from "@/styles";
import { useGenre } from "../api/getGenre";
import { useParams } from "react-router-dom";

const GenreContent = ({ genre }: { genre?: Genre }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  if (!genre) return <LoadingBubblesPage />;

  return (
    <DelayFade in={Boolean(genre)}>
      <BannerImage src={genre.thumbnails[1].url || ""} />
      <Content
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          mt: -12.5,
        }}
      >
        <Typography
          variant="h3"
          fontSize={{ xs: 56, sm: 56, md: 64 }}
          fontWeight={500}
          align={xs ? "center" : "left"}
        >
          {genre.title}
        </Typography>
        <Typography
          variant="h3"
          fontSize={{ xs: 17 }}
          fontWeight={500}
          color="rgba(255, 255, 255, .5)"
          align={xs ? "center" : "left"}
          mt={-3.75}
        >
          Music Genre
        </Typography>

        {genre.tracks.results.length > 0 && (
          <TracksList
            queueSource={{
              id: genre.tracks.id,
              title: `Popular Now – ${genre?.title}`,
              type: "playlist",
            }}
            tracks={genre.tracks.results.slice(0, 5)}
            title={"Popular Now"}
            buttons={[
              { variant: "shuffle" },
              ...insertIf(genre.tracks.results.length > 5, {
                variant: "more",
                moreUrl: `../../playlist/${genre.tracks.id}`,
              }),
            ]}
          />
        )}
        {genre.albums.length > 0 && (
          <AlbumCards
            albums={genre.albums.slice(0, 10)}
            title={`${genre.title} Albums`}
            moreUrl={genre.albums.length > 10 ? "albums" : undefined}
          />
        )}
        {genre.playlists.length > 0 && (
          <PlaylistCards
            playlists={genre.playlists.slice(0, 10)}
            title={`${genre.title} Playlists`}
            moreUrl={genre.playlists.length > 10 ? "playlists" : undefined}
          />
        )}

        {genre.moods.map((mood) => {
          return <MoodBox mood={mood} />;
        })}
      </Content>
    </DelayFade>
  );
};

export const GenrePage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { params } = useParams();
  if (!params) return;
  const { data: genre } = useGenre(params);

  return (
    <>
      {xs && (
        <MobileHeader
          head={genre?.title || ""}
          fadeTrigger={{
            y: window.innerHeight * 0.25,
            fadeHeadY: window.innerHeight * 0.25,
          }}
          sx={{
            "&:before": {
              transition: ".3s",
            },
          }}
        />
      )}
      <GenreContent genre={genre} />
    </>
  );
};
