import { BottomSheetMenu } from "../components";
import { useState } from "react";

export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return {
    Element: BottomSheetMenu,
    elementProps: { isOpen, onOpen, onClose },
    open: onOpen,
    close: onClose,
  };
};
