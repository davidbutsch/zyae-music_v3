import React, { useState } from "react";

import { Popover } from "@mui/material";

interface PopoverElementProps
  extends Omit<React.ComponentProps<typeof Popover>, "open"> {
  anchorEl: null | HTMLElement;
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}
const PopoverElement: React.FC<PopoverElementProps> = (props) => {
  const { isOpen, onOpen, onClose, anchorEl, ...other } = props;

  return (
    <Popover
      {...other}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
    >
      {props.children}
    </Popover>
  );
};

export const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;

  const onOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const onClose = () => setAnchorEl(null);

  return {
    Element: PopoverElement,
    elementProps: { isOpen, anchorEl, onClose, onOpen },
    isOpen,
    open: onOpen,
    close: onClose,
  };
};
