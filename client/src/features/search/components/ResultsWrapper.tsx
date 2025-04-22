import { Stack, useMediaQuery } from "@mui/material";

import { DelayFade } from "@/components";
import { ReactNode } from "react";
import { theme } from "@/styles";

type ResultsWrapperProps = {
  children?: ReactNode;
};

export const ResultsWrapper = ({ children }: ResultsWrapperProps) => {
  const xs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DelayFade
      sx={
        !xs
          ? {
              py: 5,
              height: "100%",
              overflowY: "scroll",
              "::-webkit-scrollbar": {
                display: "none",
              },
              mask: {
                xs: "none",
                sm: "linear-gradient(transparent, #fff 7.5%, #fff 92.5%, transparent)",
              },
            }
          : {}
      }
    >
      <Stack>{children}</Stack>
    </DelayFade>
  );
};
