import { CSSObject, alpha, styled } from "@mui/material";
import { colors, theme } from "@/styles";

import MuiIconButton from "@mui/material/IconButton";
import { StyledOptions } from "@emotion/styled";

const translucentStyle = (color = colors.accent) =>
  theme.unstable_sx({
    bgcolor: alpha(color, 0.15),
    color: color,
    "&:hover": {
      backgroundColor: alpha(color, 0.2),
    },
  });

type IconButtonProps = {
  variant?: "default" | "translucent";
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
  return styles;
});
