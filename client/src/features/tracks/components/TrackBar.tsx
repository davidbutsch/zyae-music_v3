import { Box } from "@mui/material";
import { Track } from "@/features/tracks";

type TrackBarProps = {
  track: Track;
};

export const TrackBar = ({ track }: TrackBarProps) => {
  return <Box>{track.title}</Box>;
};
