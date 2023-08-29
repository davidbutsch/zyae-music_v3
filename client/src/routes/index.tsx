import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import { useRoutes } from "react-router-dom";

export const AppRoutes = () => {
  const status = "auth";

  const element = useRoutes(status == "auth" ? privateRoutes : publicRoutes);

  return element;
};
