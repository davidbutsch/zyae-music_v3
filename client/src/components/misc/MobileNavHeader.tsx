import { useAppSelector, useScroll } from "@/hooks";
import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  alpha,
  lighten,
} from "@mui/material";

import { AccountControls } from "@/features/auth";
import { colors } from "@/styles";

type MobileNavHeaderProps = {
  head: string;
  fadeTrigger?: { y: number; fadeHeadY?: number };
  sx?: SxProps;
};

export const MobileNavHeader = ({
  head,
  fadeTrigger = { y: 1 },
  sx,
}: MobileNavHeaderProps) => {
  const { y } = useScroll();
  const user = useAppSelector((state) => state.user);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,

        pt: "env(safe-area-inset-top)",
        px: 2,

        transition: `padding 0.3s`,

        ":before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          bgcolor: alpha(lighten(colors.bg, 0.025), 0.9),
          outline: `solid 1px ${alpha("#fff", 0.1)}`,
          backdropFilter: "blur(20px)",

          zIndex: -1,
          transition: ".1s",

          opacity: 0,
          ...(y >= fadeTrigger.y && {
            opacity: 1,
          }),
        },

        zIndex: 3,

        ...sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          position: "relative",
          pt: 5,
          pb: 1,

          transition: `padding 0.3s`,

          ...(y >= fadeTrigger.y && {
            py: 0,
          }),
        }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          textAlign="center"
          sx={[
            {
              width: 0,

              transition: `all 0.3s, transform .4s, font-size 0s, padding 0s`,

              ...(y >= (fadeTrigger.fadeHeadY || fadeTrigger.y) && {
                mt: 0,

                width: "100%",
                transform: "scale(0.53125)",
              }),
            },
          ]}
          style={{
            paddingTop: -y / 1.5,
          }}
        >
          {head}
        </Typography>
        <Box
          sx={[
            {
              position: "absolute",
              right: 0,

              transition: `all 0.3s, transform .4s, padding 0s`,
            },
            y >= 1 && {
              mt: "-35px !important",
              opacity: 0,
              filter: "blur(16px)",
            },
          ]}
          style={{
            paddingTop: -y / 1.5,
          }}
        >
          {user ? (
            <AccountControls />
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() =>
                // (window.location.href = `https://zyae.net/login/?rd=${window.location.href}`)
                alert(
                  "Authentication does not work anymore and i will not be fixing it."
                )
              }
            >
              Log in
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
