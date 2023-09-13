import { CSSObject, alpha, styled } from "@mui/material";
import { colors, theme } from "@/styles";

import MuiIconButton from "@mui/material/IconButton";
import { StyledOptions } from "@emotion/styled";

const translucentStyle = (color = colors.accent) =>
  theme.unstable_sx({
    bgcolor: alpha(color, 0.08),
    color: color,
    "&:hover": {
      backgroundColor: alpha(color, 0.16),
    },
  });

const outlinedStyle = (color = colors.accent) =>
  theme.unstable_sx({
    color: color,
    border: `1px solid ${alpha(color, 0.25)}`,
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      bgcolor: alpha(color, 0.16),
      border: `1px solid ${alpha(color, 0)}`,
    },
  });

type IconButtonProps = {
  variant?: "default" | "translucent" | "outlined";
};

const options: StyledOptions = {
  shouldForwardProp: (prop) => prop !== "variant",
};

export const IconButton = styled(
  MuiIconButton,
  options
)<IconButtonProps>(({ variant, color }) => {
  variant = variant || "default";
  color = color || "accent";

  const styles: CSSObject[] = [];

  if (variant === "translucent") styles.push(translucentStyle(colors[color]));
  if (variant === "outlined") styles.push(outlinedStyle(colors[color]));

  return styles;
});
