import { RouteObject } from "react-router-dom";
import { HomePage } from "../components";

export const homeRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
];
