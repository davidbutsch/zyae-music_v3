import { BottomSheetMenu, PopoverMenu, PopupMenu } from "../components";

import { theme } from "@/styles";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";

type UseMenuOptions = {
  variant: "popup" | "popover" | "sheet";
};

export const useMenu = (props?: UseMenuOptions) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const isOpen = !!anchorEl;

  const onOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(undefined);

  const Element =
    props?.variant === "popover"
      ? PopoverMenu
      : props?.variant === "popup"
      ? PopupMenu
      : props?.variant === "sheet"
      ? BottomSheetMenu
      : xs
      ? BottomSheetMenu
      : PopoverMenu;

  const elementProps = { isOpen, anchorEl, onOpen, onClose };

  return {
    Element,
    elementProps,
    isOpen,
    open: onOpen,
    close: onClose,
  };
};
