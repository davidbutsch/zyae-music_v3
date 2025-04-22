import {
  Box,
  Button,
  ButtonProps,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { ReactNode } from "react";
import { theme } from "@/styles";

type RowHeaderProps = {
  title?: string;
  buttons?: {
    title?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    props?: ButtonProps;
  }[];
  sx?: SxProps;
  children?: ReactNode;
};

export const RowHeader = ({
  title,
  buttons,
  sx,
  children,
}: RowHeaderProps): JSX.Element => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box sx={sx} zIndex={1}>
      {title && (
        <Stack direction="row" alignItems="center" mb={2.5}>
          <Typography variant="h5" fontWeight={500}>
            {title}
          </Typography>
          <Stack marginLeft="auto" direction="row" alignItems="center" gap={1}>
            {buttons?.map((button) => (
              <Button
                key={button.title}
                size={xs ? "small" : "medium"}
                variant="outlined"
                onClick={button.onClick}
                {...button.props}
                sx={{ transition: ".3s", ...button.props?.sx }}
              >
                {button.title}
              </Button>
            ))}
          </Stack>
        </Stack>
      )}
      {children}
    </Box>
  );
};
