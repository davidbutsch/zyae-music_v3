import { BottomBar } from ".";
import { Box } from "@mui/material";

type MobileLayoutProps = {
  children: React.ReactNode;
};

export const MobileLayout = ({ children }: MobileLayoutProps): JSX.Element => {
  return (
    <>
      <Box mb={"150px"}>{children}</Box>
      <BottomBar />
    </>
  );
};
