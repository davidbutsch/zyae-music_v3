import { Button, Stack, useMediaQuery } from "@mui/material";
import { Content, FontIcon } from "@/components";

import { AlbumsResults } from "./AlbumsResults";
import { ArtistsResults } from "./ArtistsResults";
import { MobileSearchPage } from "./MobileSearchPage";
import { PlaylistsResults } from "./PlaylistsResults";
import { TopResults } from "./TopResults";
import { TracksResults } from "./TracksResults";
import { VideosResults } from "./VideosResults";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";
import { useParams } from "react-router-dom";

export const Filters = ({ filters }: { filters: string[] }) => {
  const navigate = useAppNavigate();

  const { query, filter } = useParams();
  const activeFilter = filter || filters[0];

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mx: "-5%",
          mb: { xs: 1, sm: 0 },

          px: "5%",

          overflowX: "scroll",
          mask: "linear-gradient(90deg, transparent 2.5%, #fff 5%, #fff 95%, transparent 97.5%)",

          "::-webkit-scrollbar": {
            display: "none",
          },

          zIndex: 2,
        }}
      >
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter == filter ? "contained" : "outlined"}
            color={activeFilter == filter ? "primary" : "accent"}
            size="small"
            sx={{ px: 2, gap: 1.5 }}
            onClick={() => {
              navigate(`../${filter}/${query || ""}`, { persistScroll: false });
            }}
          >
            {activeFilter == filter && <FontIcon icon="fi fi-rr-check" />}
            {filter}
          </Button>
        ))}
      </Stack>
    </>
  );
};

export const SearchPage = () => {
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return xs ? <MobileSearchPage /> : <DesktopSearchPage />;
};

export const DesktopSearchPage = () => {
  const { filter } = useParams();

  return (
    <Content
      sx={{
        height: "100%",
      }}
    >
      <Filters
        filters={["top", "tracks", "videos", "artists", "albums", "playlists"]}
      />
      {filter == "top" && <TopResults />}
      {filter == "tracks" && <TracksResults />}
      {filter == "videos" && <VideosResults />}
      {filter == "artists" && <ArtistsResults />}
      {filter == "albums" && <AlbumsResults />}
      {filter == "playlists" && <PlaylistsResults />}
    </Content>
  );
};
