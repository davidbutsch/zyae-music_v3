import { CardSlider, ProgressiveImage } from "@/components";
import {
  Stack,
  StackProps,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

import { GenericCard } from "@/types";
import { theme } from "@/styles";

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: 13, sm: 16 },

    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  })
);

type CardOptions = {
  item: GenericCard;
  carousel?: boolean;
  elementProps: StackProps;
};

export const Card = ({ item, elementProps }: CardOptions) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Stack
      {...elementProps}
      sx={{
        position: "relative",
        width: {
          xs: "calc(calc(100% - 16px) / 2)",
          sm: "calc(calc(100% - 32px) / 3)",
          md: "calc(calc(100% - 48px) / 4)",
          lg: "calc(calc(100% - 64px) / 5)",
          xl: "calc(calc(100% - 80px) / 6)",
        },
        maxWidth: 192,

        cursor: "pointer",

        ".shy": {
          opacity: 0,
          transform: "translateY(-25%)",
          transition: ".3s",
        },

        "&:hover .shy": {
          opacity: 1,
          transform: "translateY(0)",
        },

        ...(xs
          ? {
              "&:active": {
                transform: "scale(.975)",
                opacity: 0.5,
              },
            }
          : {
              "&:hover": {
                opacity: 0.75,
              },
            }),

        transition: ".3s",

        ...elementProps.sx,
      }}
    >
      <ProgressiveImage
        src={item.thumbnails[item.thumbnails.length - 1].url}
        sx={{ borderRadius: 1 / 2 }}
      />
      <StyledTypography
        sx={{
          mt: { xs: 1, sm: 1.5 },

          fontWeight: 500,
        }}
      >
        {item.title}
      </StyledTypography>
      <StyledTypography color="text.secondary">{item.sub}</StyledTypography>
    </Stack>
  );
};

type CardViewOptions = {
  items: GenericCard[];
  carousel?: boolean;
  elementProps: (item: GenericCard) => StackProps;
  itemOptions: (item: GenericCard) => {};
};

export const CardView = ({
  items,
  carousel,
  elementProps,
}: CardViewOptions) => {
  const cards = items.map((item) => (
    <Card
      key={item.id}
      item={item}
      carousel={carousel}
      elementProps={elementProps(item)}
    />
  ));

  if (carousel) return <CardSlider>{cards}</CardSlider>;
  else
    return (
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {cards}
      </Stack>
    );
};
