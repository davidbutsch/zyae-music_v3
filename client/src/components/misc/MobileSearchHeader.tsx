import {
  Box,
  Button,
  Collapse,
  Stack,
  SxProps,
  Typography,
  alpha,
  lighten,
} from "@mui/material";
import { useAppNavigate, useAppSelector, useScroll } from "@/hooks";

import { AccountControls } from "@/features/auth";
import { BasicSearchBar } from "..";
import { Filters } from "@/features/search";
import { colors } from "@/styles";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export type MobileSearchHeaderProps = {
  basicOptions: {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  };
  headerOptions: {
    head?: string;
    placeholder?: string;
    fadeTrigger?: { y: number; fadeHeadY?: number };
  };
  searchOptions: {
    filters: string[];
    persistFilters?: boolean;
  };
  sx?: SxProps;
};

const SearchBar = ({
  basicOptions: { query, setQuery, expanded, setExpanded },
  headerOptions: { head = "Search", placeholder = "Search Zyae Music" },
  searchOptions: { filters, persistFilters },
  sx,
}: MobileSearchHeaderProps) => {
  const navigate = useAppNavigate();

  const { y } = useScroll();

  const { query: urlQuery, filter } = useParams();

  useEffect(() => {
    setQuery(urlQuery || "");
  }, [urlQuery]);

  const user = useAppSelector((state) => state.user);

  return (
    <Stack
      sx={{
        pt: "env(safe-area-inset-top)",
        pb: 0.5,
        px: 2,

        width: "100%",

        zIndex: 2,

        ...sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: "relative",
          pt: 5,
          pb: 1,

          transition: `padding 0.3s`,

          ...((expanded || query.length > 0 || y >= 1) && {
            py: 0,
          }),
        }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          textAlign="center"
          sx={[
            (expanded || query.length > 0) && {
              mt: "-35px !important",
              opacity: 0,
              filter: "blur(16px)",
            },
            {
              width: 0,
              transition: `all 0.3s, transform .4s`,

              ...(y >= 1 && {
                width: "100%",
                transform: "scale(0.53125)",
              }),
            },
          ]}
        >
          {head}
        </Typography>
        <Box
          sx={[
            {
              position: "absolute",
              right: 0,

              transition: `all 0.3s, transform .4s`,
            },
            (expanded || query.length > 0 || y >= 1) && {
              mt: "-35px !important",
              opacity: 0,
              filter: "blur(16px)",
            },
          ]}
        >
          {user ? (
            <AccountControls />
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() =>
                (window.location.href = `https://zyae.net/login/?rd=${window.location.href}`)
              }
            >
              Log in
            </Button>
          )}
        </Box>
      </Stack>
      <BasicSearchBar
        placeholder={placeholder}
        query={query}
        setQuery={setQuery}
        expanded={expanded}
        setExpanded={setExpanded}
        onSubmit={(_e, query) =>
          navigate(`../${filter || filters[0]}/${query}`)
        }
        onCancel={() => navigate(`../${filter || filters[0]}`)}
        sx={{ width: "100%" }}
      />
      <Collapse in={persistFilters || !!query}>
        <Filters filters={filters} />
      </Collapse>
    </Stack>
  );
};

export const MobileSearchHeader = (props: MobileSearchHeaderProps) => {
  const {
    headerOptions: { fadeTrigger = { y: 1 } },
    sx,
  } = props;

  const { y } = useScroll();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,

          ":before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            bgcolor: alpha(lighten(colors.bg, 0.025), 0.9),
            outline: `solid 1px ${alpha("#fff", 0.1)}`,
            backdropFilter: "blur(20px)",

            zIndex: -1,

            opacity: 0,
            ...(y >= fadeTrigger.y && {
              opacity: 1,
            }),
          },

          zIndex: 3,

          ...sx,
        }}
        style={{
          paddingTop: -y / 1.5,
        }}
      >
        <SearchBar {...props} />
      </Box>
      <Box
        sx={{
          mt: -2,
          height: `calc(env(safe-area-inset-top) + 
          35px + 
          90px + 
          ${
            props.searchOptions.persistFilters || !!props.basicOptions.query
              ? "32px + 12px"
              : "0px"
          } - 
          ${
            props.basicOptions.expanded || props.basicOptions.query.length > 0
              ? "85px"
              : "0px"
          } +
          24px
          )`,
          transition: "height .3s",
          // bgcolor: "red",
        }}
      ></Box>
      {/* <SearchBar
        {...props}
        sx={{
          on: "relative",
          opacity: 0,
          zIndex: -1,
          pt: "env(safe-area-inset-top)",
          pb: 0,
        }}
      /> */}
    </>
  );
};
