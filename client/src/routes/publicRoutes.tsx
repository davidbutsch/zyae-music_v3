import { Navigate, Outlet, RouteObject } from "react-router-dom";

import { AppLayout } from "@/components";
import { AuthPromptPage } from "@/features/misc";
import { Explore } from "@/features/explore";
import { PNG_LOGO_URL } from "@/config";
import { Typography } from "@mui/material";
import { albumRoutes } from "@/features/albums";
import { artistRoutes } from "@/features/artists";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthPromptPage
            image={PNG_LOGO_URL}
            title="Personalize your Zyae Music"
            subtext="Pick your favorite artists and we'll adjust your feed"
            buttonText="Let's go"
          />
        ),
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/saved",
        element: (
          <AuthPromptPage
            icon="fi fi-rr-bookmark"
            title="Save your favorite tracks, artists, and albums"
            subtext="Saved music isn't available without an account"
            sx={{
              i: {
                fontSize: 96,
              },
            }}
          />
        ),
      },
      {
        path: "/search",
        element: <Typography variant="h5">Search</Typography>,
      },
      {
        path: "artist",
        children: artistRoutes,
      },
      {
        path: "album",
        children: albumRoutes,
      },
      {
        path: "*",
        element: <Navigate replace to="/" />,
      },
    ],
  },
];
