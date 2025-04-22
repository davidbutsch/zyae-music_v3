import { CssBaseline, useMediaQuery } from "@mui/material";
import { DesktopLayout, MobileLayout } from ".";

import { Audio } from "@/features/player";
import { theme } from "@/styles";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <CssBaseline />
      <Audio />
      {sm ? (
        <MobileLayout children={children} />
      ) : (
        <DesktopLayout children={children} />
      )}
    </>
  );
};
