import { Box, Link, SxProps } from "@mui/material";

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Track } from "@/features/tracks";
import { colors } from "@/styles";

export const ArtistLink = ({
  artists,
  beforeText,
  sx,
}: {
  artists: Track["artists"];
  beforeText?: string;
  sx?: SxProps;
}) => {
  return (
    <Box
      component="span"
      sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

        color: "text.secondary",
        "*": {
          color: `${colors.textSecondary} !important`,
        },

        ...sx,
      }}
    >
      {beforeText}
      {artists.map((artist, i, { length }) => {
        return (
          <React.Fragment key={artist.id}>
            <Link component={RouterLink} to={`/artist/${artist.id}`}>
              {artist.name}
            </Link>
            {i + 2 < length ? ", " : i + 1 < length && " & "}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
