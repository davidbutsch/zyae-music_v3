import { Stack, Typography } from "@mui/material";
import { Track, TrackBar } from "@/features/tracks";

type TracksListProps = {
  title?: string;
  tracks: Track[];
};

export const TracksList = ({ title, tracks }: TracksListProps) => {
  return (
    <Stack>
      {title && (
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
      )}
      {tracks.map((track) => (
        <TrackBar track={track} key={track.id} />
      ))}
    </Stack>
  );
};
