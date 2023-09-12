import { CssBaseline, useMediaQuery } from "@mui/material";

import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";
import { theme } from "@/styles";

type AppLayoutProps = {
  children: React.ReactNode;
};

export * from "./Content";

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <CssBaseline />
      {isSmallScreen ? (
        <MobileLayout children={children} />
      ) : (
        <DesktopLayout children={children} />
      )}
    </>
  );
};
