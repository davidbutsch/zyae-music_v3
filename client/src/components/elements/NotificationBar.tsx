import { Button, Grow, Stack, SxProps, Typography } from "@mui/material";
import { FontIcon, ProgressiveImage } from "@/components";
import { useEffect, useState } from "react";

import { useNotification } from "@/providers";

export const NotificationBar = ({ sx }: { sx?: SxProps }) => {
  const [open, setOpen] = useState(false);
  const { notification, clearNotification } = useNotification();

  useEffect(() => {
    const closeTimeout = setTimeout(close, 3000);

    if (notification) setOpen(true);
    else setOpen(false);

    return () => clearTimeout(closeTimeout);
  }, [notification]);

  const close = () => {
    setOpen(false);
    setTimeout(() => clearNotification(), 100);
  };

  return (
    <Grow appear in={open}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          position: "fixed",
          bottom: "env(safe-area-inset-bottom)",

          m: 1,
          p: 1,
          pl: notification?.thumbnail || notification?.icon ? 1 : 2,

          width: { xs: "calc(100% - 16px)", sm: "fit-content" },

          bgcolor: "#fff",

          borderRadius: 1 / 2,

          zIndex: 4,

          ...sx,
        }}
      >
        {notification?.icon && (
          <FontIcon
            icon={notification.icon}
            size={20}
            color="#000"
            sx={{
              mx: 0.5,
            }}
          />
        )}
        {notification?.thumbnail && (
          <ProgressiveImage
            src={notification.thumbnail}
            height={32}
            sx={{ borderRadius: 1 / 4 }}
          />
        )}
        <Typography color="#000" fontSize={14}>
          {notification?.message}
        </Typography>
        <Button
          onClick={close}
          size="small"
          sx={{
            ml: "auto",

            color: "#000",
          }}
        >
          Close
        </Button>
      </Stack>
    </Grow>
  );
};
