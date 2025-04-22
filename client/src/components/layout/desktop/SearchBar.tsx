import {
  Button,
  MenuItem,
  MenuList,
  Stack,
  darken,
  lighten,
  styled,
} from "@mui/material";
import { Content, FontIcon } from "@/components";
import { SearchSuggestions, useSearchSuggestions } from "@/features/search";
import { useEffect, useState } from "react";

import { colors } from "@/styles";
import { useAppNavigate } from "@/hooks";
import { useParams } from "react-router-dom";

type SuggestionsProps = {
  handleSearch: (query: string) => any;
  status: "loading" | "error" | "success";
  suggestions?: SearchSuggestions;
};

const Suggestions = ({
  handleSearch,
  status,
  suggestions = [],
}: SuggestionsProps) => {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (status !== "loading") setItems(suggestions);
  }, [suggestions]);

  if (items.length == 0) return null;

  return (
    <MenuList
      sx={{
        position: "absolute",
        top: 42,

        maxWidth: "100%",
        width: "465px",

        border: `solid 1px ${lighten(colors.bg, 0.1)}`,
        borderRadius: "22px",

        bgcolor: lighten(colors.bg, 0.05),
        zIndex: -1,
      }}
    >
      {items.map((suggestion) => (
        <MenuItem key={suggestion} onClick={() => handleSearch(suggestion)}>
          {suggestion}
        </MenuItem>
      ))}
    </MenuList>
  );
};

const StyledInput = styled("input")(({ theme }) =>
  theme.unstable_sx({
    pl: 2,

    width: "100%",
    maxWidth: "400px",

    color: "text.primary",
    fontSize: 16,

    bgcolor: "transparent",
    border: `solid 1px ${lighten(colors.bg, 0.1)}`,
    borderRadius: "22px",
    borderRight: "none",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    "&::placeholder": {
      color: darken(colors.accent, 0.5),
    },
    "&:focus": {
      outline: "none",
    },
  })
);

export const SearchBar = (): JSX.Element => {
  const navigate = useAppNavigate();
  const { query: urlQuery, filter } = useParams();

  const [query, setQuery] = useState<string>("");
  const [displaySuggested, setDisplaySuggested] = useState(false);

  const { status, data: suggestions } = useSearchSuggestions(query, {
    enabled: query !== "",
  });

  useEffect(() => {
    if (urlQuery) setQuery(urlQuery);
  }, [urlQuery]);

  const collapseSuggested = () => setDisplaySuggested(false);
  const expandSuggested = () => setDisplaySuggested(true);

  const handleSearch = (query: string) => {
    setQuery(query);
    collapseSuggested();
    navigate(`/search/${filter || "top"}/${query}`);
  };

  return (
    <Content sx={{ py: "0 !important" }}>
      <Stack
        onBlur={(e) => {
          if (!e.relatedTarget) collapseSuggested();
        }}
        onFocus={expandSuggested}
        direction="row"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        sx={{
          position: "relative",
          width: { md: 360, lg: 400 },
          zIndex: 2,
        }}
      >
        <StyledInput
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          type="text"
          placeholder="Search Zyae Music"
        />
        <Button
          type="submit"
          variant="translucent"
          onClick={() => handleSearch(query)}
          sx={{
            px: 3,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <FontIcon icon="fi fi-rr-search" />
        </Button>

        {query && displaySuggested && (
          <Suggestions
            handleSearch={handleSearch}
            suggestions={suggestions}
            status={status}
          />
        )}
      </Stack>
    </Content>
  );
};
