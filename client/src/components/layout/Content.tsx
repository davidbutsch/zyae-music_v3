import { Box } from "@mui/material";
import React from "react";

type ContentProps = {
  children: React.ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  return (
    <Box
      position="absolute"
      width="100%"
      py={{ xs: 2, sm: 4, md: 4 }}
      px={{ xs: 2, sm: 4, md: 4, lg: 8 }}
    >
      {children}
    </Box>
  );
};
