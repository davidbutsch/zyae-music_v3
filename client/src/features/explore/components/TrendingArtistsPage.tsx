import {
  Content,
  DelayFade,
  LoadingBubblesPage,
  MobileHeader,
} from "@/components";
import { Typography, useMediaQuery } from "@mui/material";

import { RankedArtistRow } from "./RankedArtistRow";
import { TopArtist } from "../types";
import { theme } from "@/styles";
import { useExploreFeed } from "../api/getExploreFeed";

const TrendingArtistsContent = ({ artists }: { artists?: TopArtist[] }) => {
  if (!artists) return <LoadingBubblesPage />;

  return (
    <DelayFade in={Boolean(artists)}>
      {artists.map((artist) => (
        <RankedArtistRow artist={artist} />
      ))}
    </DelayFade>
  );
};

export const TrendingArtistsPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { data: feed } = useExploreFeed();

  return (
    <Content
      sx={{
        position: "relative",
        pt: xs
          ? "calc(48px + 8px + env(safe-area-inset-top)) !important"
          : undefined,
      }}
    >
      {xs ? (
        <MobileHeader
          head="Trending Artists"
          fadeTrigger={{
            y: 1,
          }}
        />
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
          Trending Artists
        </Typography>
      )}
      <TrendingArtistsContent artists={feed?.charts.artists.results} />
    </Content>
  );
};
