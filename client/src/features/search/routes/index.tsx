import { RouteObject } from "react-router-dom";
import { SearchPage } from "@/features/search";

export const searchRoutes: RouteObject[] = [
  {
    path: "/search/",
    element: <SearchPage />,
  },
  {
    path: "/search/:filter/",
    element: <SearchPage />,
  },
  {
    path: "/search/:filter/:query",
    element: <SearchPage />,
  },
];
