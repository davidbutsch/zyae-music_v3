import { JSX } from "react";
import { styled } from "@mui/material";

const StyledImage = styled("img")(() => {
  return {};
});

interface ImageProps extends React.ComponentProps<typeof StyledImage> {
  src: string;
}

export const Image = (props: ImageProps): JSX.Element => {
  return <StyledImage {...props} src={props.src} />;
};
