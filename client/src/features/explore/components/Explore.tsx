import { Stack, Typography } from "@mui/material";

export const Explore = () => {
  return (
    <Stack spacing={{ xs: 5, sm: 10, md: 15 }}>
      <Typography variant="h4" fontSize={38} fontWeight={500}>
        Explore
      </Typography>
      <Typography variant="h5" fontSize={28} fontWeight={500}>
        Trending on YouTube
      </Typography>
      <Typography variant="h4" fontWeight={500}>
        Genres
      </Typography>
      <Typography variant="h4" fontWeight={500}>
        New releases
      </Typography>
      <Typography variant="h4" fontWeight={500}>
        Top artists
      </Typography>
    </Stack>
  );
};
