import { ArtistPage, ArtistSaved, DiscographyPage } from "@/features/artists";

import { RouteObject } from "react-router-dom";

export const artistRoutes: RouteObject[] = [
  {
    path: ":artistId",
    element: <ArtistPage />,
  },
  {
    path: "/artist/:artistId/discography/:type",
    element: <DiscographyPage />,
  },
  {
    path: "/artist/:artistId/saved",
    element: <ArtistSaved />,
  },
];
