import {
  Box,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  FontIcon,
  IconButton,
  ItemOptions,
  ProgressiveImage,
} from "@/components";

import { GenericCard } from "@/types";
import { theme } from "@/styles";

type RowOptions = {
  item: GenericCard;
  elementProps: StackProps;
  itemOptions?: ItemOptions;
};

export const Row = ({ item, elementProps, itemOptions }: RowOptions) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Stack
      direction="row"
      alignItems="center"
      {...elementProps}
      key={item.id}
      sx={{
        py: 1,

        "&:not(&:last-child)": {
          borderBottom: "1px solid rgba(255,255,255,.05)",
        },

        ...(xs
          ? {
              "&:active:not(button)": {
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
        sx={{
          height: { xs: 56, sm: 64 },
          aspectRatio:
            parseInt(item.thumbnails[item.thumbnails.length - 1].width) /
            parseInt(item.thumbnails[item.thumbnails.length - 1].height),

          borderRadius: item.type == "artist" ? "100%" : 1 / 4,
        }}
      />
      <Box
        ml={1.5}
        sx={{
          cursor: "pointer",

          overflow: "hidden",
          "& p, h6": {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          },
        }}
      >
        <Typography fontWeight={500}>{item.title}</Typography>
        <Typography fontWeight={500} variant="subtitle2" color="text.secondary">
          {item.sub}
        </Typography>
      </Box>

      {itemOptions?.buttons ? (
        itemOptions.buttons.map((button, i) => (
          <IconButton
            key={i}
            onClick={button.onClick}
            sx={{
              ml: "auto",
            }}
          >
            <FontIcon
              icon={button.icon}
              size={button.size}
              color="rgba(255,255,255,.75)"
            />
          </IconButton>
        ))
      ) : (
        <IconButton
          sx={{
            ml: "auto",
          }}
        >
          <FontIcon
            icon={"zi-angle-forward"}
            size={12}
            color="rgba(255,255,255,.75)"
          />
        </IconButton>
      )}
    </Stack>
  );
};

type ListViewOptions = {
  items: GenericCard[];
  elementProps: (item: GenericCard) => StackProps;
  itemOptions: (item: GenericCard) => ItemOptions;
};

export const ListView = ({
  items,
  elementProps,
  itemOptions,
}: ListViewOptions) => {
  const rows = items.map((item) => (
    <Row
      key={item.id}
      item={item}
      elementProps={elementProps(item)}
      itemOptions={itemOptions(item)}
    />
  ));

  return <Stack>{rows}</Stack>;
};
