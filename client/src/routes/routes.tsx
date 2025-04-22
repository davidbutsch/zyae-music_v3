import { Outlet, RouteObject } from "react-router-dom";

import { AppLayout } from "@/components";
import { albumRoutes } from "@/features/albums";
import { artistRoutes } from "@/features/artists";
import { exploreRoutes } from "@/features/explore";
import { genreRoutes } from "@/features/genres";
import { homeRoutes } from "@/features/home";
import { playlistRoutes } from "@/features/playlists";
import { savedRoutes } from "@/features/saved";
import { searchRoutes } from "@/features/search";

export const routes: RouteObject[] = [
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
        children: homeRoutes,
      },
      {
        path: "/explore",
        children: exploreRoutes,
      },
      {
        path: "/genres",
        children: genreRoutes,
      },
      {
        path: "/saved",
        children: savedRoutes,
        // <AuthPromptPage
        //   icon="fi fi-rr-bookmark"
        //   title="Save your favorite tracks, artists, and albums"
        //   subtext="Saved music isn't available without an account"
        //   sx={{
        //     i: {
        //       fontSize: 96,
        //     },
        //   }}
        // />
      },
      {
        path: "/search",
        children: searchRoutes,
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
        path: "playlist",
        children: playlistRoutes,
      },
      // {
      //   path: "*",
      //   element: <Navigate replace to="/" />,
      // },
    ],
  },
];
