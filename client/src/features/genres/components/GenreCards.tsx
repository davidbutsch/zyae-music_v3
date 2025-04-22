import { Box, Typography, useMediaQuery } from "@mui/material";
import { GenreCard, useGenres } from "@/features/genres";

import { RowHeader } from "@/components";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";

type GenresProps = {
  title?: string;
  moreUrl?: string;
  genres?: GenreCard[];
};

export const GenreCards = ({ title, moreUrl, genres }: GenresProps) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const navigate = useAppNavigate();

  const { data } = useGenres({ enabled: !genres });

  return (
    <RowHeader
      title={title}
      buttons={[
        {
          title: "More",
          onClick: () => navigate(moreUrl || ""),
        },
      ]}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${xs ? 2 : 3}, 1fr)`,
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 1.5,
        }}
      >
        {(genres || data || []).map((genre) => (
          <Box
            key={genre.params}
            onClick={() => navigate(`/genres/${genre.params}`)}
            sx={{
              position: "relative",

              height: { xs: 100, md: 150 },

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              borderRadius: 1 / 2,

              overflow: "hidden",

              zIndex: 1,

              "&:before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                backgroundImage: `url(${genre.thumbnails[0].url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",

                opacity: 0.6,

                zIndex: -1,
              },

              cursor: "pointer",

              ...(xs
                ? {
                    "&:active": {
                      transform: "scale(.975)",
                      opacity: 0.5,
                    },
                  }
                : {
                    "&:hover": {
                      opacity: 0.75,
                    },
                  }),

              transition: ".3s",
            }}
          >
            <Typography fontSize={{ xs: 16, sm: 18 }} fontWeight={500}>
              {genre.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </RowHeader>
  );
};
