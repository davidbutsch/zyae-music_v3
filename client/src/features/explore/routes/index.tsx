import { ExplorePage } from "..";
import { RouteObject } from "react-router-dom";
import { TrendingArtistsPage } from "../components/TrendingArtistsPage";

export const exploreRoutes: RouteObject[] = [
  {
    path: "/explore/",
    element: <ExplorePage />,
  },
  {
    path: "/explore/artists",
    element: <TrendingArtistsPage />,
  },
];
