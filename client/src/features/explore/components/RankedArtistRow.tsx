import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { FontIcon, ProgressiveImage, ShyParent } from "@/components";
import { colors, theme } from "@/styles";

import { ArtistRowProps } from "./ExplorePage";
import { useAppNavigate } from "@/hooks";

export const RankedArtistRow = ({ artist }: ArtistRowProps) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const navigate = useAppNavigate();

  return (
    <ShyParent
      onClick={() => navigate(`/artist/${artist.id}`)}
      sx={{
        py: 1,

        "&:not(&:last-child)": {
          borderBottom: "1px solid rgba(255,255,255,.05)",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
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
        <ProgressiveImage
          src={artist.thumbnails[0].url}
          sx={{
            height: { xs: 56, sm: 64 },
            borderRadius: "100%",
          }}
        />
        <Box
          ml={1.5}
          sx={{
            cursor: "pointer",

            overflow: "hidden",
            "& p, h6": {
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          }}
        >
          <Typography fontWeight={500}>{artist.name}</Typography>
        </Box>

        <Typography
          fontSize={12}
          sx={{
            ml: "auto",
            mr: 1,
            color: artist.trend == "up" ? colors.primary : colors.error,
          }}
        >
          {artist.trend == "up" ? "+1" : "-1"}
        </Typography>
        <FontIcon
          icon={
            artist.trend == "up"
              ? "fi fi-rr-angle-small-up"
              : "fi fi-rr-angle-small-down"
          }
          size={24}
          color={artist.trend == "up" ? colors.primary : colors.error}
        />
      </Stack>
    </ShyParent>
  );
};
