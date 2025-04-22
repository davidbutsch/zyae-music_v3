import { Box } from "@mui/material";
import { BoxProps } from "@mui/material";

export const ShyParent = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        ".shy": {
          opacity: 0,
        },

        "&:hover .shy": {
          opacity: 1,
        },

        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export const ShyChild = (props: BoxProps) => {
  return (
    <Box {...props} className="shy">
      {props.children}
    </Box>
  );
};
