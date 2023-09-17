import { AlbumPage } from "@/features/albums";
import { RouteObject } from "react-router-dom";

export const albumRoutes: RouteObject[] = [
  {
    path: ":albumId",
    element: <AlbumPage />,
  },
];
