import { Box } from "@mui/material";
import React from "react";

type ContentProps = {
  children: React.ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  return (
    <Box py={{ xs: 2, sm: 4, md: 4 }} px={{ xs: 2, sm: 5, md: 5 }}>
      {children}
    </Box>
  );
};
