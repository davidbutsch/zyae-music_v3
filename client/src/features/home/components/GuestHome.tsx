import { LinkButton, ProgressiveImage } from "@/components";
import {
  Box,
  Stack,
  Typography,
  alpha,
  darken,
  useMediaQuery,
} from "@mui/material";

import { useScroll } from "@/hooks";
import { theme } from "@/styles";
import { useState } from "react";
import { chooseGuestHomeAccent } from "../helpers";

export const GuestHome = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const [accent] = useState(chooseGuestHomeAccent());

  const { y } = useScroll();

  return (
    <Stack direction={xs ? "column" : "row"} gap={5}>
      {!xs && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            background: `linear-gradient(135deg, ${accent.color}15, transparent 75%)`,
          }}
        />
      )}

      <Stack pt={{ xs: 0, sm: "10vh" }} width={{ sm: "60%" }}>
        <Typography
          variant={"h2"}
          fontSize={xs ? 34 : 56}
          fontWeight={400}
          height="fit-content"
          color={accent.color}
          letterSpacing={"-1px"}
          zIndex={1}
        >
          Free and Unlimited Music Streaming
        </Typography>
        <Typography
          variant={"subtitle1"}
          height="fit-content"
          mt={2}
          color={accent.color}
          sx={{
            opacity: 0.7,
          }}
          zIndex={1}
        >
          Archived Project. Developed by David Butsch (2023).
        </Typography>

        <Stack direction="row" gap={1.5} mt={2.5}>
          <LinkButton
            variant="contained"
            sx={{
              px: 2,
              width: "fit-content",

              bgcolor: accent.color,

              "&:hover": {
                bgcolor: darken(accent.color, 0.32),
              },
            }}
            to={""}
            onClick={() =>
              alert(
                "Authentication does not work anymore and i will not be fixing it."
              )
            }
          >
            Get Started
          </LinkButton>

          <LinkButton
            variant="outlined"
            sx={{
              px: 2,
              width: "fit-content",

              bgcolor: alpha(accent.color, 0.08),
              color: accent.color,

              borderColor: alpha(accent.color, 0.24),
              backdropFilter: "blur(24px)",

              "&:hover": {
                bgcolor: alpha(accent.color, 0.24),
              },
            }}
            to={`https://github.com/davidbzyae/zyae-music_v3`}
          >
            Github
          </LinkButton>
        </Stack>
      </Stack>
      {xs ? (
        <ProgressiveImage
          src={accent.gridImageUrl}
          width="90vw"
          sx={{
            position: "fixed",
            top: `${-y}px`,
            left: "50%",
            width: "125vw",
            transform: "translateX(-50%) rotate(15deg)",
            mask: "linear-gradient(135deg, transparent 10%, rgba(0, 0, 0, 1))",
            zIndex: -1,
          }}
        />
      ) : (
        <Box position="relative" width="40%" height="60vh">
          <ProgressiveImage
            src={accent.gridImageUrl}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: "250%",
              transform: "translate(-15vw, -50%) rotate(15deg)",
            }}
          />
        </Box>
      )}
    </Stack>
  );
};
