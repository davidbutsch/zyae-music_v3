import {
  GenreAlbumsPage,
  GenrePage,
  GenrePlaylistsPage,
  GenreTracksPage,
  GenresPage,
} from "..";

import { RouteObject } from "react-router-dom";

export const genreRoutes: RouteObject[] = [
  {
    path: "",
    element: <GenresPage />,
  },
  {
    path: ":params",
    element: <GenrePage />,
  },
  {
    path: ":params/tracks",
    element: <GenreTracksPage />,
  },
  {
    path: ":params/albums",
    element: <GenreAlbumsPage />,
  },
  {
    path: ":params/playlists",
    element: <GenrePlaylistsPage />,
  },
];
