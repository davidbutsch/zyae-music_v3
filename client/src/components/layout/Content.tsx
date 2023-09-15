import { Box, SxProps } from "@mui/material";

import React from "react";

type ContentProps = {
  children: React.ReactNode;
  sx: SxProps;
};

export const Content = ({ children, sx }: ContentProps) => {
  return (
    <Box
      maxWidth="1700px"
      mx="auto"
      sx={{ overflow: "visible", ...sx }}
      py={{ xs: 4, lg: 8 }}
      px={{ xs: 2, sm: 4, md: 4, lg: 8 }}
    >
      {children}
    </Box>
  );
};
