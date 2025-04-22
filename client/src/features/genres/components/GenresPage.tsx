import {
  Content,
  DelayFade,
  LoadingBubblesPage,
  MobileHeader,
} from "@/components";
import { GenreCards, useGenres } from "@/features/genres";

import { theme } from "@/styles";
import { Typography, useMediaQuery } from "@mui/material";

const GenresContent = () => {
  const { data: genres } = useGenres();

  if (!genres) return <LoadingBubblesPage />;

  return (
    <DelayFade in={Boolean(genres)}>
      <GenreCards genres={genres} />
    </DelayFade>
  );
};

export const GenresPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Content
      sx={{
        position: "relative",
        pt: "calc(48px + 8px + env(safe-area-inset-top)) !important",
      }}
    >
      {xs ? (
        <MobileHeader
          head="Genres"
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
          Genres
        </Typography>
      )}
      <GenresContent />
    </Content>
  );
};
