import { JSX, useEffect, useState } from "react";

import { styled } from "@mui/material";

type StyledImageProps = {
  loaded?: boolean;
};

const StyledImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "loaded",
})<StyledImageProps>(({ loaded }) => {
  return {
    ...(loaded
      ? {
          opacity: 1,
        }
      : {
          opacity: 0,
        }),
    transition: "opacity .3s",
  };
});

interface ImageProps extends React.ComponentProps<typeof StyledImage> {
  src: string;
}

export const ProgressiveImage = ({
  src,
  ...other
}: ImageProps): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <StyledImage
      {...other}
      loaded={loaded}
      sx={{ minWidth: other.width, minHeight: other.height, ...other.sx }}
      src={src}
    />
  );
};
