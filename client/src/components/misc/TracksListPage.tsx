import { Content, LoadingBubblesPage, MobileHeader } from "@/components";
import { Track, TracksList } from "@/features/tracks";

import { theme } from "@/styles";
import { Typography, useMediaQuery } from "@mui/material";

const TracksListContent = ({ tracks }: { tracks?: Track[] }) => {
  if (!tracks) return <LoadingBubblesPage />;

  return <TracksList tracks={tracks} />;
};

export const TracksListPage = ({
  title,
  tracks,
}: {
  title?: string;
  tracks?: Track[];
}) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Content
      sx={{
        position: "relative",
        pt: xs ? "calc(48px + env(safe-area-inset-top)) !important" : undefined,
      }}
    >
      {xs ? (
        <MobileHeader
          head={title || "Tracks"}
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
          {title || "Tracks"}
        </Typography>
      )}
      <TracksListContent tracks={tracks} />
    </Content>
  );
};
