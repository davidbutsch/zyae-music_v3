import { AlbumCard, AlbumCards } from "@/features/albums";
import {
  Content,
  DelayFade,
  LoadingBubblesPage,
  MobileHeader,
} from "@/components";

import { theme } from "@/styles";
import { useGenre } from "..";
import { Typography, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const GenreAlbumsContent = ({ albums }: { albums?: AlbumCard[] }) => {
  if (!albums) return <LoadingBubblesPage />;

  return (
    <DelayFade in={Boolean(albums)}>
      <AlbumCards albums={albums} carousel={false} />
    </DelayFade>
  );
};

export const GenreAlbumsPage = () => {
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
          head={`${genre?.title} Albums`}
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
          {genre?.title} Albums
        </Typography>
      )}
      <GenreAlbumsContent albums={genre?.albums} />
    </Content>
  );
};
