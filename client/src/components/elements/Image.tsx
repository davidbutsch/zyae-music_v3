import { Icon, styled } from "@mui/material";

import { JSX } from "react";

type StyledIconProps = {
  size?: number;
};

const StyledImage = styled("img")(({ size }: StyledIconProps) => {
  return {
    width: "100%",
  };
});

interface ImageProps extends React.ComponentProps<typeof StyledImage> {
  url: string;
}

export const Image = (props: ImageProps): JSX.Element => {
  return <StyledImage src={props.url} {...props} size={props.size || 16} />;
};
