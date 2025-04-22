import { Button, Fade, Stack, Typography } from "@mui/material";
import {
  Content,
  DelayFade,
  FontIcon,
  List,
  MobileSearchHeader,
  MobileSearchHeaderProps,
} from "@/components";
import { useEffect, useState } from "react";
import { useSearchHistory, useSearchSuggestions } from "..";

import { AlbumsResults } from "./AlbumsResults";
import { ArtistsResults } from "./ArtistsResults";
import { GenreCards } from "@/features/genres";
import { PlaylistsResults } from "./PlaylistsResults";
import { TopResults } from "./TopResults";
import { TracksResults } from "./TracksResults";
import { VideosResults } from "./VideosResults";
import { useAppNavigate } from "@/hooks";
import { useParams } from "react-router-dom";

const MobileSuggestions = ({
  query,
  setExpanded,
}: {
  query: string;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useAppNavigate();

  const { filter = "top" } = useParams();

  const { status, data: suggestions } = useSearchSuggestions(query, {
    enabled: query !== "",
  });

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (status !== "loading") setItems(suggestions || []);
  }, [suggestions]);

  return (
    <Fade in>
      <Stack>
        {items?.map((suggestion) => (
          <Button
            key={suggestion}
            size="large"
            onMouseDown={() => {
              navigate(`../${filter}/${suggestion}`);
              setExpanded(false);
            }}
            sx={{
              justifyContent: "left",
              gap: 3,

              borderRadius: 0,

              textTransform: "none",
              fontWeight: 400,
              fontSize: 16,

              "&:not(&:last-child)": {
                borderBottom: "1px solid rgba(255,255,255,.05)",
              },
            }}
          >
            <FontIcon icon="fi fi-rr-search" />
            {suggestion}
          </Button>
        ))}
      </Stack>
    </Fade>
  );
};

const SearchPageHeader = (
  props: Omit<MobileSearchHeaderProps, "searchOptions">
) => {
  const { headerOptions, basicOptions } = props;

  return (
    <MobileSearchHeader
      headerOptions={headerOptions || {}}
      basicOptions={basicOptions}
      searchOptions={{
        filters: ["top", "tracks", "videos", "artists", "albums", "playlists"],
      }}
    />
  );
};

export const MobileSearchPage = () => {
  const { filter } = useParams();

  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const searchHistory = useSearchHistory();

  return (
    <Content>
      <SearchPageHeader
        headerOptions={{}}
        basicOptions={{
          query,
          setQuery,
          expanded,
          setExpanded,
        }}
      />
      {!expanded && query.length == 0 && (
        <DelayFade delay={100}>
          <Typography fontSize={24} fontWeight={500} mb="20px">
            Genres
          </Typography>
          <GenreCards />
        </DelayFade>
      )}

      {expanded &&
        (query.length == 0 ? (
          <DelayFade delay={100}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography fontSize={24} fontWeight={500}>
                Recent
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => searchHistory.clear()}
              >
                Clear
              </Button>
            </Stack>

            <List
              items={searchHistory.history}
              view="list"
              itemOptions={(item) => ({
                buttons: [
                  {
                    icon: "fi-br-cross",
                    size: 12,
                    onClick: (e) => {
                      e.stopPropagation();
                      searchHistory.remove(item.id);
                    },
                  },
                ],
              })}
            />
          </DelayFade>
        ) : (
          <MobileSuggestions query={query} setExpanded={setExpanded} />
        ))}
      {!expanded && (
        <>
          {filter == "top" && <TopResults />}
          {filter == "tracks" && <TracksResults />}
          {filter == "videos" && <VideosResults />}
          {filter == "artists" && <ArtistsResults />}
          {filter == "albums" && <AlbumsResults />}
          {filter == "playlists" && <PlaylistsResults />}
        </>
      )}
    </Content>
  );
};
