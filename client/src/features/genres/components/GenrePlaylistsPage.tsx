import {
  Content,
  DelayFade,
  LoadingBubblesPage,
  MobileHeader,
} from "@/components";
import { PlaylistCard, PlaylistCards } from "@/features/playlists";
import { Typography, useMediaQuery } from "@mui/material";

import { theme } from "@/styles";
import { useGenre } from "..";
import { useParams } from "react-router-dom";

const GenrePlaylistsContent = ({
  playlists,
}: {
  playlists?: PlaylistCard[];
}) => {
  if (!playlists) return <LoadingBubblesPage />;

  return (
    <DelayFade in={Boolean(playlists)}>
      <PlaylistCards playlists={playlists} carousel={false} />
    </DelayFade>
  );
};

export const GenrePlaylistsPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { params } = useParams();
  if (!params) return;
  const { data: genre } = useGenre(params);

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
          head={`${genre?.title} Playlists`}
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
          {genre?.title} Playlists
        </Typography>
      )}
      <GenrePlaylistsContent playlists={genre?.playlists} />
    </Content>
  );
};
