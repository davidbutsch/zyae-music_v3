import { styled } from "@mui/material";

const Icon = styled("i")({
  "::before": {
    display: "block",
  },
});

type FlaticonIconProps = React.ComponentProps<typeof Icon> & {
  icon: string;
  size?: number;
};

export const FlaticonIcon = (props: FlaticonIconProps) => {
  const { icon, size, ...other } = props;

  return (
    <Icon {...other} className={props.icon} sx={{ fontSize: size || 16 }} />
  );
};
