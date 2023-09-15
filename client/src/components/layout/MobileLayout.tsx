import { Box, Grid, Stack, Typography, lighten, styled } from "@mui/material";
import { FlaticonIcon, IconButton, ImageIcon, LinkButton } from "..";

import { colors } from "@/styles";

type MobileLayoutProps = {
  children: React.ReactNode;
};

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
  {
    title: "Search",
    icon: "search",
    to: "/search",
  },
];

const StyledLinkButton = styled(LinkButton)(({ theme }) =>
  theme.unstable_sx({
    width: "100%",

    textTransform: "none",

    flexDirection: "column",
    height: "fit-content",

    "&:hover": {
      bgcolor: "inherit",
    },
  })
);

const Player = (): JSX.Element => {
  if (1 == (2 as number)) return <></>;
  else
    return (
      <Stack direction="row" spacing={2} py={1.5} px={2.5}>
        <FlaticonIcon
          sx={{
            p: 2,
            bgcolor: lighten(colors.bg, 0.1),
            color: "text.secondary",
            borderRadius: 0.5,
          }}
          icon="fi fi-sr-music-alt"
          size={20}
        />
        <Stack
          spacing={1.25}
          justifyContent="center"
          width="100%"
          maxWidth={200}
        >
          <Box
            component="span"
            sx={{
              display: "flex",

              height: 14,
              bgcolor: lighten(colors.bg, 0.1),
              borderRadius: 7,
            }}
          />
          <Box
            component="span"
            sx={{
              display: "flex",

              width: "75%",

              height: 14,
              bgcolor: lighten(colors.bg, 0.1),
              borderRadius: 7,
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="right"
          width="100%"
        >
          <IconButton size="large">
            <ImageIcon
              size={24}
              src="https://zyae.net/assets/images/icons/play.svg"
            />
          </IconButton>
          <IconButton size="large">
            <ImageIcon
              size={24}
              src="https://zyae.net/assets/images/icons/forward.svg"
            />
          </IconButton>
        </Stack>
      </Stack>
    );
};

const Nav = (): JSX.Element => {
  return (
    <Grid
      container
      sx={{
        py: 1,
        borderTop: `solid 1px ${lighten(colors.bg, 0.075)}`,
      }}
    >
      {navRoutes.map((route) => {
        return (
          <Grid item xs={3} key={route.title}>
            <StyledLinkButton
              to={route.to}
              disableRipple
              activeProps={{
                sx: { color: "primary.main" },
                children: (
                  <>
                    <FlaticonIcon icon={`fi fi-sr-${route.icon}`} size={18} />
                    <Typography variant="subtitle2" fontSize={12}>
                      {route.title}
                    </Typography>
                  </>
                ),
              }}
            >
              <FlaticonIcon icon={`fi fi-rr-${route.icon}`} size={18} />
              <Typography
                variant="subtitle2"
                fontSize={12}
                color="text.secondary"
              >
                {route.title}
              </Typography>
            </StyledLinkButton>
          </Grid>
        );
      })}
    </Grid>
  );
};

const BottomBar = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,

        width: "100%",

        bgcolor: lighten(colors.bg, 0.015),

        zIndex: 1,
      }}
    >
      <Player />
      <Nav />
    </Box>
  );
};

export const MobileLayout = ({ children }: MobileLayoutProps): JSX.Element => {
  return (
    <>
      <Box mb={"150px"}>{children}</Box>
      <BottomBar />
    </>
  );
};
