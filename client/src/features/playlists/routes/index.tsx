import { PlaylistPage } from "../components/PlaylistPage";
import { RouteObject } from "react-router-dom";

export const playlistRoutes: RouteObject[] = [
  {
    path: ":playlistId",
    element: <PlaylistPage />,
  },
];
