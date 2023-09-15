import { ArtistPage } from "@/features/artists";
import { RouteObject } from "react-router-dom";

export const artistRoutes: RouteObject[] = [
  {
    path: ":artistId",
    element: <ArtistPage />,
  },
];
