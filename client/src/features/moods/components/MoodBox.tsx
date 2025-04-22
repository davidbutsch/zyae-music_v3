import { Box, Stack, Typography, alpha, lighten } from "@mui/material";
import { FontIcon, IconButton } from "@/components";
import { useAppNavigate, useColorSort } from "@/hooks";

import { Mood } from "..";
import { PlaylistCards } from "@/features/playlists";
import { TracksList } from "@/features/tracks";

export const MoodBox = ({ mood }: { mood: Mood }) => {
  const navigate = useAppNavigate();

  const tracksPlaylistId = mood.rows.find(
    (row) => row.variant == "tracks"
  )?.playlistId;

  const { sortColors } = useColorSort(mood.palette);

  return (
    <Stack
      sx={{
        position: "relative",
        p: 2,

        width: "100%",

        bgcolor: alpha(sortColors(["intensity"])[0].hex, 0.24),
        borderRadius: 1,

        overflow: "hidden",
      }}
    >
      <Stack direction="row" alignItems="center" gap={2} mb={2}>
        <Box>
          <Typography fontSize={24} fontWeight={500}>
            {mood.title}
          </Typography>
          <Typography
            variant="subtitle2"
            mt={-0.5}
            color={sortColors(["intensity"])[0].hex}
          >
            Mood
          </Typography>
        </Box>
        <IconButton
          variant="translucent"
          sx={{
            ml: "auto",
            bgcolor: alpha(sortColors(["intensity"])[0].hex, 0.16),
          }}
        >
          <FontIcon
            icon="zi-save"
            color={lighten(sortColors(["intensity"])[0].hex, 0.32)}
          />
        </IconButton>
        {tracksPlaylistId && (
          <IconButton
            variant="translucent"
            sx={{
              bgcolor: alpha(sortColors(["intensity"])[0].hex, 0.16),
            }}
            onClick={() =>
              navigate(
                `../../playlist/${tracksPlaylistId}/?compressed=true&title=${mood.title}`
              )
            }
          >
            <FontIcon
              icon="zi-angle-forward"
              color={lighten(sortColors(["intensity"])[0].hex, 0.32)}
            />
          </IconButton>
        )}
      </Stack>
      {mood.rows.map((row) => {
        if (row.variant == "tracks")
          return (
            <TracksList
              tracks={row.results.slice(0, 3)}
              queueSource={{
                id: mood.rows[0].playlistId,
                title: `${mood.title}`,
                type: "playlist",
                queryParams: `?compressed=true&title=${mood.title} ${mood.genre?.title}`,
              }}
            />
          );
        else if (row.variant == "playlists")
          return <PlaylistCards playlists={row.results} disableSliderButtons />;
      })}
    </Stack>
  );
};
