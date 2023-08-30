import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  darken,
  lighten,
  styled,
} from "@mui/material";
import { FlaticonIcon, ImageIcon, LinkButton } from "@/components";

import { AccountControls } from "@/features/auth";
import { JSX } from "react";
import { NavPlaylists } from "@/features/playlists";
import { colors } from "@/styles";
import { useNavigate } from "react-router-dom";

const navRoutes = [
  {
    title: "Home",
    icon: "music-alt",
    to: "/",
  },
  {
    title: "Explore",
    icon: "world",
    to: "/explore",
  },
  {
    title: "Saved",
    icon: "bookmark",
    to: "/saved",
  },
];

const StyledLinkButton = styled(LinkButton)(({ theme }) =>
  theme.unstable_sx({
    justifyContent: "left",
    gap: 2.5,
    px: 2.5,
  })
);

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Stack width="240px" height="100vh" px={1.5}>
      <Stack
        height={64}
        direction="row"
        alignItems="center"
        spacing={1.5}
        ml={1.25}
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
          ":hover": {
            "> h5": { textDecoration: "underline" },
          },
        }}
      >
        <ImageIcon
          url="https://zyae.net/assets/images/brand/zyae/zm_logo.png"
          size={32}
        />
        <Typography variant="h5" fontSize={28}>
          Music
        </Typography>
      </Stack>
      <Stack spacing={0.5}>
        <StyledLinkButton
          to="/"
          activeProps={{
            variant: "translucent",
            children: (
              <>
                <FlaticonIcon icon="fi fi-sr-music-alt" /> Home
              </>
            ),
          }}
        >
          <FlaticonIcon icon="fi fi-rr-music-alt" /> Home
        </StyledLinkButton>
        <StyledLinkButton
          to="/browse"
          activeProps={{
            variant: "translucent",
            children: (
              <>
                <FlaticonIcon icon="fi fi-sr-search" /> Browse
              </>
            ),
          }}
        >
          <FlaticonIcon icon="fi fi-rr-search" /> Browse
        </StyledLinkButton>
        <StyledLinkButton
          to="/favorites"
          activeProps={{
            variant: "translucent",
            children: (
              <>
                <FlaticonIcon icon="fi fi-sr-bookmark" /> Saves
              </>
            ),
          }}
        >
          <FlaticonIcon icon="fi fi-rr-bookmark" /> Saves
        </StyledLinkButton>
      </Stack>
      <Divider
        sx={{ my: 2, mx: -1.5, borderColor: lighten(colors.bg, 0.075) }}
      />
      <NavPlaylists />
    </Stack>
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
      outline: "solid 2px",
      outlineColor: colors.primary,
    },
  })
);

const SearchBar = (): JSX.Element => {
  return (
    <Stack direction="row" width="100%">
      <StyledInput type="text" placeholder="Search Zyae Music" />
      <Button
        variant="translucent"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <FlaticonIcon icon="fi fi-rr-search" />
      </Button>
    </Stack>
  );
};

const Header = (): JSX.Element => {
  return (
    <AppBar position="relative" color="transparent" sx={{ pr: "18px" }}>
      <Toolbar disableGutters>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <SearchBar />
          <AccountControls />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

const Main = styled("main")(({ theme }) =>
  theme.unstable_sx({
    px: 5,
    py: 4,

    height: "calc(100vh - 64px)",

    bgcolor: "background.default",

    border: `solid 1px ${lighten(colors.bg, 0.075)}`,
    borderRight: "none",
    borderBottom: "none",
    borderTopLeftRadius: 16,
  })
);

type DesktopLayoutProps = {
  children: React.ReactNode;
};

export const DesktopLayout = ({
  children,
}: DesktopLayoutProps): JSX.Element => {
  return (
    <Grid container bgcolor={lighten(colors.bg, 0.015)}>
      <CssBaseline />
      <Navbar />
      <Grid item xs>
        <Header />
        <Main>{children}</Main>
      </Grid>
    </Grid>
  );
};
