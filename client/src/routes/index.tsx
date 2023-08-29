import { CssBaseline } from "@mui/material";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import { useRoutes } from "react-router-dom";
import { useTokenService } from "@/hooks";

export const AppRoutes = () => {
  const { status } = useTokenService();

  const element = useRoutes(status == "auth" ? privateRoutes : publicRoutes);

  if (status == "loading") return <CssBaseline />;
  return element;
};
