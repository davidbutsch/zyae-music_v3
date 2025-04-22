import { RouteObject } from "react-router-dom";
import { SavedPage } from "..";

export const savedRoutes: RouteObject[] = [
  {
    path: "/saved/",
    element: <SavedPage />,
  },
  {
    path: "/saved/:filter/",
    element: <SavedPage />,
  },
  {
    path: "/saved/:filter/:query",
    element: <SavedPage />,
  },
];
