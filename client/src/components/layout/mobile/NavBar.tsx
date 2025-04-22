import { Button, Grid, Typography, alpha, lighten } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { FontIcon } from "@/components";
import { colors } from "@/styles";
import { useState } from "react";

export const NavBar = ({ hidden }: { hidden: boolean }): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([
    {
      category: "home",
      icon: "zi-home",
      activeIcon: "zi-home-solid",
      to: "/",
      original: "/",
    },
    {
      category: "explore",
      icon: "fi-rs-apps",
      activeIcon: "fi-ss-apps",
      to: "/explore",
      original: "/explore",
    },
    {
      category: "saved",
      icon: "zi-saved",
      activeIcon: "zi-saved-solid",
      to: "/saved",
      original: "/saved",
    },
    {
      category: "search",
      icon: "fi-rr-search",
      activeIcon: "fi-rr-search",
      to: "/search",
      original: "/search",
    },
  ]);
  const [activeRoute, setActiveRoute] = useState("home");

  return (
    <Grid
      container
      sx={[
        {
          py: 1,
          maxHeight: hidden ? "0px" : "200px",
          borderTop: `solid 1px ${alpha(lighten(colors.bg, 0.16), 0.24)}`,
          opacity: hidden ? 0 : 1,
          transition: ".3s",
        },
      ]}
    >
      {routes.map((route) => {
        const active = activeRoute == route.category;
        return (
          <Grid item xs={3} key={route.category}>
            <Button
              sx={{
                width: "100%",

                gap: 0.75,

                textTransform: "none",

                flexDirection: "column",
                height: "fit-content",

                opacity: active ? 1 : 0.5,
                // color: active ? "primary.main" : "inherit",

                ...(active && {
                  background: `linear-gradient(45deg, ${colors.primary} 40%, #35ade0)`,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }),

                "&:hover": {
                  bgcolor: "inherit",
                },
              }}
              onClick={() => {
                if (active) {
                  navigate(route.original);
                  setRoutes((prev) => {
                    const i = prev.findIndex(
                      (prevRoute) => activeRoute == prevRoute.category
                    );
                    prev[i] = {
                      ...prev[i],
                      to: route.original,
                    };
                    return prev;
                  });
                } else {
                  setRoutes((prev) => {
                    const i = prev.findIndex(
                      (prevRoute) => activeRoute == prevRoute.category
                    );
                    prev[i] = {
                      ...prev[i],
                      to: location.pathname,
                    };
                    return prev;
                  });
                  navigate(route.to);
                  setActiveRoute(route.category);
                }
              }}
              disableRipple
            >
              <FontIcon
                icon={active ? route.activeIcon : route.icon}
                size={20}
              />
              <Typography
                variant="subtitle2"
                fontSize={11}
                color={active ? "inherit" : "text.secondary"}
                textTransform="capitalize"
              >
                {route.category}
              </Typography>
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};
