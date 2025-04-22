import { Box, SxProps, Typography } from "@mui/material";

import React from "react";
import { Track } from "@/features/tracks";
import { useAppNavigate } from "@/hooks";

export const ArtistText = ({
  artists = [],
}: {
  artists?: Track["artists"];
}): string => {
  return artists
    .map(
      (artist, i, { length }) =>
        `${artist.name}${
          i + 2 < length ? ", " : (i + 1 < length && " & ") || ""
        }`
    )
    .join("");
};

export const ArtistLink = ({
  artists,
  beforeText,
  clickable = true,
  sx,
}: {
  artists: Track["artists"];
  beforeText?: string;
  clickable?: boolean;
  sx?: SxProps;
}) => {
  const navigate = useAppNavigate();

  return (
    <Box
      component="span"
      sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

        color: "inherit",
      }}
    >
      {beforeText}
      {artists.map((artist, i, { length }) => {
        return (
          <React.Fragment key={artist.id}>
            <Typography
              component={clickable ? "a" : "span"}
              sx={{
                cursor: "pointer",
                fontSize: "inherit",
                fontWeight: "inherit",
                ...(clickable && {
                  ":hover": {
                    textDecoration: "underline",
                  },
                }),
                ...sx,
              }}
              onClick={() => {
                if (clickable && artist.id) {
                  navigate(`../../artist/${artist.id}`);
                }
              }}
            >
              {artist.name}
            </Typography>
            {i + 2 < length ? ", " : i + 1 < length && " & "}
          </React.Fragment>
        );
      })}
    </Box>
  );
};
