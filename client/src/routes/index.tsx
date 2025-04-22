import { routes } from "./routes";
import { useRoutes } from "react-router-dom";
import { useTokenService } from "@/hooks";

export const AppRoutes = () => {
  const { status } = useTokenService();

  const element = useRoutes(routes);

  if (status == "loading") return null;

  return element;
};
