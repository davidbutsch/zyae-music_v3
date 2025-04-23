import {
  Content,
  FontIcon,
  IconButton,
  List,
  LoadingBubbles,
  MobileSearchHeader,
  MobileSearchHeaderProps,
} from "@/components";
import { MenuHeader, OptionsList } from "@/features/menus";
import {
  NewPlaylistOption,
  useSaved,
  useSavedQueryResults,
} from "@/features/saved";
import { useAppSelector, useLocalStorage } from "@/hooks";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";

import { useMenu } from "@/features/menus/hooks/useMenu";
import { AuthPromptPage } from "@/features/misc";
import { Filters } from "@/features/search";
import { theme } from "@/styles";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Sort = "recently_added" | "recently_played" | "alphabetical";

const SortByButton = ({
  sort,
  setSort,
  disabled,
}: {
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  disabled: boolean;
}) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const sortOptionsMenu = useMenu();

  return (
    <>
      <sortOptionsMenu.Element
        {...sortOptionsMenu.elementProps}
        header={<MenuHeader head="Sort by" sub="(doesnt work yet)" />}
      >
        <OptionsList
          variant={xs ? "sheet" : "popover"}
          items={[
            {
              icon: sort == "recently_added" ? "fi-sr-check" : undefined,
              title: "Recently saved",
              onClick: () => setSort("recently_added"),
            },
            {
              icon: sort == "recently_played" ? "fi-sr-check" : undefined,
              title: "Recently played",
              onClick: () => setSort("recently_played"),
            },
            {
              icon: sort == "alphabetical" ? "fi-sr-check" : undefined,
              title: "A-Z ",
              onClick: () => setSort("alphabetical"),
            },
          ]}
        />
      </sortOptionsMenu.Element>
      <Button
        onClick={sortOptionsMenu.open}
        disabled={disabled}
        sx={{
          mt: -1,
          mb: { xs: -4, sm: -2 },
          px: 0,
          textTransform: "none",
          ":active": { opacity: 0.6 },
          ":hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
      >
        <FontIcon icon="fi-sr-sort" />
        Sort by
      </Button>
    </>
  );
};

const SavedList = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { filter = "all", query } = useParams();
  const [view, setView] = useLocalStorage<"cards" | "list">(
    "savedPageView",
    "cards"
  );
  const [sort, setSort] = useLocalStorage<Sort>(
    "savedPageSort",
    "recently_added"
  );

  const { data: saved } = useSaved();

  const { data: results } = useSavedQueryResults(query!, {
    enabled: Boolean(query),
  });

  const items =
    filter == "all"
      ? Boolean(query)
        ? results
        : saved
      : (Boolean(query) ? results : saved)?.filter(
          (item) => item.type == filter.slice(0, -1)
        );

  return (
    <>
      {!xs && <Filters filters={["all", "playlists", "artists", "albums"]} />}
      <Stack direction="row">
        <SortByButton sort={sort} setSort={setSort} disabled={Boolean(query)} />
        <NewPlaylistOption />
        <IconButton
          sx={{ mt: -1, mb: -4 }}
          onClick={() =>
            setView((prev) => (prev === "cards" ? "list" : "cards"))
          }
        >
          <FontIcon icon={view == "cards" ? "fi-rs-list" : "fi-rs-apps"} />
        </IconButton>
      </Stack>
      {Boolean(items) ? (
        <List items={items} view={view} />
      ) : (
        <LoadingBubbles
          sx={{
            pt: "15vh",
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
    </>
  );
};

const SavedContent = () => {
  const user = useAppSelector((state) => state.user);

  if (!user)
    return (
      <AuthPromptPage
        icon="fi-sr-album-collection"
        title="Saved is broken :("
        subtext="auth does not work anymore and i will not be fixing it"
      />
    );

  return (
    <Stack gap={5}>
      <SavedList />
    </Stack>
  );
};

const SavedPageHeader = (
  props: Omit<MobileSearchHeaderProps, "searchOptions">
) => {
  const { headerOptions, basicOptions } = props;

  return (
    <MobileSearchHeader
      headerOptions={headerOptions || {}}
      basicOptions={basicOptions}
      searchOptions={{
        filters: ["all", "playlists", "artists", "albums"],
        persistFilters: true,
      }}
    />
  );
};

export const SavedPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <Content>
      {xs ? (
        <SavedPageHeader
          headerOptions={{
            head: "Saved",
            placeholder: "Search saved",
          }}
          basicOptions={{
            query,
            setQuery,
            expanded,
            setExpanded,
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
          Saved
        </Typography>
      )}
      <SavedContent />
    </Content>
  );
};
