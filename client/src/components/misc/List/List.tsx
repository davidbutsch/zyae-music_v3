import { CardView } from "./CardView";
import { GenericCard } from "@/types";
import { ListView } from "./ListView";
import { MouseEventHandler } from "react";
import { StackProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueue } from "@/features/player";

export type ItemOptions = {
  buttons?: {
    icon: string;
    size?: number;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }[];
};

type ListOptions = {
  items?: GenericCard[];
  view?: "cards" | "list";
  elementProps?: (item: GenericCard) => StackProps;
  itemOptions?: (item: GenericCard) => ItemOptions;
};

export const List = ({
  items = [],
  view = "list",
  elementProps,
  itemOptions,
}: ListOptions) => {
  const navigate = useNavigate();

  const { playQueue } = useQueue();

  const defaultElementProps = (item: GenericCard): StackProps => {
    return {
      onClick: () =>
        item.type == "track"
          ? playQueue({
              id: item.id,
              title: item.title,
              thumbnails: item.thumbnails,
              artists: [
                {
                  id: null,
                  name: item.sub.slice(8),
                },
              ],
              isAvailable: true,
              isExplicit: item.isExplicit,
            })
          : navigate(`../../${item.type}/${item.id}`),

      ...(item.type == "artist" && {
        sx: {
          textAlign: view == "cards" ? "center" : "inherit",
          "> img": {
            borderRadius: "100% !important",
          },
        },
      }),

      ...(elementProps && elementProps(item)),
    };
  };

  const defaultItemOptions = (item: GenericCard): ItemOptions => {
    return {
      ...(item.type == "track" && {
        buttons: [
          {
            icon: "fi-rr-menu-dots-vertical",
            size: 16,
            onClick: (e) => {
              e.stopPropagation();
            },
          },
        ],
      }),
    };
  };

  if (view == "list")
    return (
      <ListView
        items={items}
        elementProps={defaultElementProps}
        itemOptions={itemOptions || defaultItemOptions}
      />
    );
  else
    return (
      <CardView
        items={items}
        elementProps={elementProps || defaultElementProps}
        itemOptions={itemOptions || defaultItemOptions}
      />
    );
};
