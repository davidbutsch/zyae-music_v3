import { ArtistPage, artistRoutes } from "@/features/artists";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

import { AppLayout } from "@/components";
import { Typography } from "@mui/material";
import { albumRoutes } from "@/features/albums";

export const privateRoutes: RouteObject[] = [
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
          <Typography variant="h5">Welcome back (not implemented)</Typography>
        ),
      },
      {
        path: "/explore",
        element: (
          <Typography variant="h5">Explore (not implemented)</Typography>
        ),
      },
      {
        path: "/saved",
        element: <Typography variant="h5">Saved (not implemented)</Typography>,
      },
      {
        path: "/search",
        element: <Typography variant="h5">Search (not implemented)</Typography>,
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
