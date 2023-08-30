import { Container } from "@mui/material";

type MobileLayoutProps = {
  children: React.ReactNode;
};

export const MobileLayout = ({ children }: MobileLayoutProps): JSX.Element => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};
