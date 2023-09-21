import { FlaticonIcon, LinkButton } from "@/components";
import { Grid, Typography, lighten, styled } from "@mui/material";

import { colors } from "@/styles";

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

export const NavBar = (): JSX.Element => {
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
