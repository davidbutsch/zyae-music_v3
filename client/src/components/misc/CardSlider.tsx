import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlaticonIcon, IconButton } from "@/components";
import { useEffect, useRef, useState } from "react";

import { styled } from "@mui/material";
import { theme } from "@/styles";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)(({ theme }) => theme.unstable_sx({}));

const Header = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    position: "relative",

    mb: 2.5,

    flexDirection: "row",
    alignItems: "center",
  })
);

const Slider = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    position: "relative",

    mx: { xs: -2, sm: 0 },
    px: { xs: 2, sm: 0 },

    flexDirection: "row",
    gap: 2,

    overflowX: "scroll",
    scrollSnapType: "x mandatory",
    scrollBehavior: "smooth",

    "> div": {
      scrollSnapAlign: { xs: "none", sm: "end" },
    },

    "&::-webkit-scrollbar": {
      display: "none",
    },
  })
);

type CardSliderProps = {
  title?: string;
  moreUrl?: string;
  sx?: SxProps;
  children: React.ReactNode;
};

export const CardSlider = ({
  title,
  moreUrl,
  sx,
  children,
}: CardSliderProps) => {
  const navigate = useNavigate();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScroll, setCanScroll] = useState<{ left: boolean; right: boolean }>(
    {
      left: false,
      right: true,
    }
  );

  useEffect(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = sliderRef.current;

      setCanScroll({
        right: scrollLeft + offsetWidth < scrollWidth,
        left: scrollLeft > 0,
      });
    }
  }, [children]);

  const scroll = (val: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += val;
    }
  };

  return (
    <Container sx={sx}>
      <Header>
        {title && (
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
            variant="h5"
            fontWeight={500}
          >
            {title}
          </Typography>
        )}
        <Stack direction="row" spacing={1} ml="auto">
          {moreUrl && (
            <Button
              variant="outlined"
              size={xs ? "small" : "medium"}
              onClick={() => navigate(moreUrl)}
            >
              More
            </Button>
          )}
          <IconButton
            disabled={!canScroll.left}
            variant="outlined"
            size={xs ? "small" : "medium"}
            onClick={() => scroll(-(screen.width / 3))}
          >
            <FlaticonIcon icon="fi fi-rr-angle-small-left" />
          </IconButton>
          <IconButton
            disabled={!canScroll.right}
            variant="outlined"
            size={xs ? "small" : "medium"}
            onClick={() => scroll(screen.width / 3)}
          >
            <FlaticonIcon icon="fi fi-rr-angle-small-right" />
          </IconButton>
        </Stack>
      </Header>
      <Slider
        onScroll={(e) => {
          const { scrollLeft, scrollWidth, offsetWidth } = e.currentTarget;
          setCanScroll({
            right: scrollLeft + offsetWidth < scrollWidth,
            left: scrollLeft > 0,
          });
        }}
        ref={sliderRef}
      >
        {children}
      </Slider>
    </Container>
  );
};
