import React, { useState } from "react";
import { PopoverMenu } from "../components";

export const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;

  const onOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(null);

  return {
    Element: PopoverMenu,
    elementProps: { isOpen, anchorEl, onClose, onOpen },
    isOpen,
    open: onOpen,
    close: onClose,
  };
};
