import { BottomBar } from ".";
import { Box } from "@mui/material";

type MobileLayoutProps = {
  children: React.ReactNode;
};

export const MobileLayout = ({ children }: MobileLayoutProps): JSX.Element => {
  return (
    <>
      <Box pb="calc(150px + env(safe-area-inset-bottom, 24px))">{children}</Box>
      <BottomBar />
    </>
  );
};
