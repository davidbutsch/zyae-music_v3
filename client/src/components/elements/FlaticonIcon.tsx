import { styled } from "@mui/material";

const Icon = styled("i")({
  overflow: "visible",
  "::before": {
    display: "block",
  },
});

type FlaticonIconProps = React.ComponentProps<typeof Icon> & {
  icon: string;
  size?: number;
  color?: string;
};

export const FlaticonIcon = (props: FlaticonIconProps) => {
  const { icon, size, color, ...other } = props;

  return (
    <Icon
      {...other}
      className={props.icon}
      sx={{ fontSize: size || 16, color: color, ...other.sx }}
    />
  );
};
