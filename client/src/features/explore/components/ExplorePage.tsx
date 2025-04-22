import {
  Content,
  DelayFade,
  LoadingBubblesPage,
  MobileNavHeader,
  RowHeader,
} from "@/components";
import { Track, TracksList } from "@/features/tracks";
import { Typography, useMediaQuery } from "@mui/material";

import { GenreCards } from "@/features/genres";
import { RankedArtistRow } from "./RankedArtistRow";
import { TopArtist } from "../types";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";
import { useExploreFeed } from "../api/getExploreFeed";

const TrendingTracks = ({
  tracks,
}: {
  tracks: { id: string; results: Track[] };
}) => {
  return (
    <TracksList
      tracks={tracks.results}
      title="Trending Tracks"
      queueSource={{
        title: "Trending",
        id: tracks.id,
        queryParams: "?compressed=true&title=Trending Tracks",
        type: "playlist",
      }}
      buttons={[
        {
          variant: "more",
          moreUrl: `/playlist/${tracks.id}/?compressed=true&title=Trending Tracks`,
        },
      ]}
    />
  );
};

export type ArtistRowProps = {
  artist: TopArtist;
};

const TrendingArtists = ({ artists }: { artists: TopArtist[] }) => {
  const navigate = useAppNavigate();

  return (
    <RowHeader
      title="Trending Artists"
      buttons={[
        {
          title: "More",
          onClick: () => navigate("artists"),
        },
      ]}
    >
      {artists.map((artist) => (
        <RankedArtistRow key={artist.id} artist={artist} />
      ))}
    </RowHeader>
  );
};

const ExploreContent = () => {
  const { data: feed } = useExploreFeed();

  if (!feed) return <LoadingBubblesPage />;

  return (
    <DelayFade
      in={Boolean(feed)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <TrendingTracks tracks={feed.charts.tracks} />
      <GenreCards genres={feed.genres} title="Genres" moreUrl="../../genres" />
      <TrendingArtists artists={feed.charts.artists.results.slice(0, 5)} />
    </DelayFade>
  );
};

export const ExplorePage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Content
      sx={{
        position: "relative",
        pt: {
          xs: "calc(90px + 40px + env(safe-area-inset-top))",
          sm: 4,
        },
      }}
    >
      {xs ? (
        <MobileNavHeader head="Explore" fadeTrigger={{ y: 48 }} />
      ) : (
        <Typography
          fontSize={{ xs: 24, sm: 32 }}
          fontWeight={500}
          sx={{
            mb: 5,

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
          Explore
        </Typography>
      )}
      <ExploreContent />
    </Content>
  );
};
