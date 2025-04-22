import {
  Box,
  Stack,
  SxProps,
  Typography,
  alpha,
  darken,
  lighten,
  styled,
} from "@mui/material";
import { FormEvent, useRef, useState } from "react";

import { FontIcon } from ".";
import { colors } from "@/styles";

type MobileSearchBarProps = {
  head?: string;
  placeholder: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>, query: string) => any;
  sx?: SxProps;
};

export const MobileSearchBar = ({
  head = "Search",
  placeholder,
  onSubmit,
  sx,
}: MobileSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <Stack sx={sx} gap={1}>
      <Typography
        variant="h4"
        fontWeight={500}
        fontSize={28}
        sx={[
          expanded && {
            mt: "-45px",
            opacity: 0,
            filter: "blur(16px)",
          },
          {
            transition: "0.3s",
          },
        ]}
      >
        {head}
      </Typography>
      <BasicSearchBar
        placeholder={placeholder}
        query={query}
        setQuery={setQuery}
        expanded={expanded}
        setExpanded={setExpanded}
        onSubmit={onSubmit}
      />
    </Stack>
  );
};

const StyledInput = styled("input")(({ theme }) =>
  theme.unstable_sx({
    pt: 0.5,

    width: "100%",
    height: 32,

    color: "text.primary",

    bgcolor: "transparent",
    border: `none`,

    fontSize: 17,

    "&::placeholder": {
      color: darken(colors.accent, 0.5),
    },
    "&:focus": {
      outline: "none",
    },
  })
);

type BasicSearchBarProps = {
  placeholder: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (e: FormEvent<HTMLFormElement>, query: string) => any;
  onCancel?: () => any;
  sx?: SxProps;
};

export const BasicSearchBar = ({
  placeholder,
  query,
  setQuery,
  expanded,
  setExpanded,
  onSubmit,
  onCancel,
  sx,
}: BasicSearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Stack direction="row" alignItems="center" gap={0} mb={1.5} sx={sx}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          pl: 1.5,

          width: "100%",
          height: 35,

          bgcolor: alpha(lighten(colors.bg, 0.16), 0.24),

          borderRadius: 1 / 1.5,
        }}
      >
        <FontIcon
          icon="fi fi-rr-search"
          color={lighten(colors.bg, 0.5)}
          sx={{ height: "fit-content" }}
        />
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            inputRef.current?.blur();
            onSubmit && onSubmit(e, query);
            setExpanded(false);
          }}
          width="100%"
        >
          <StyledInput
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onFocus={() => setExpanded(true)}
            type="text"
            placeholder={placeholder}
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </Box>

        {query.length > 0 && (
          <FontIcon
            icon="fi fi-rr-cross-small"
            size={22}
            color={lighten(colors.bg, 0.5)}
            sx={{ height: "fit-content", mr: 1 }}
            onClick={() => {
              inputRef.current?.focus();
              setQuery("");
            }}
          />
        )}
      </Stack>
      <Typography
        color="primary"
        sx={[
          !(query.length > 0 || expanded)
            ? {
                width: 0,
                opacity: 0,
              }
            : {
                width: 50,
                ml: 1,
              },
          { transition: ".3s" },
        ]}
        onClick={() => {
          setQuery("");
          onCancel && onCancel();
          setExpanded(false);
        }}
      >
        Cancel
      </Typography>
    </Stack>
  );
};
