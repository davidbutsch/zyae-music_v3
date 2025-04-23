import { Content, MobileNavHeader } from "@/components";
import { Typography, useMediaQuery } from "@mui/material";

import { useAppSelector } from "@/hooks";
import { theme } from "@/styles";
import { JSX } from "react";
import { GuestHome } from "./GuestHome";

export const HomeContent = ({ loggedIn }: { loggedIn: boolean }) => {
  if (!loggedIn) return <GuestHome />;
};

export const HomePage = (): JSX.Element => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const user = useAppSelector((state) => state.user);

  return (
    <Content
      sx={{
        pt: {
          xs: "calc(48px + 40px + 40px + env(safe-area-inset-top))",
          sm: 4,
        },
        height: "100%",

        overflow: !Boolean(user) ? "hidden" : "inherit",
      }}
    >
      {xs ? (
        <MobileNavHeader head="Home" fadeTrigger={{ y: 48 }} />
      ) : (
        <Typography
          fontSize={{ xs: 24, sm: 32 }}
          fontWeight={500}
          sx={{
            mb: 5,

            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",

            "@supports(-webkit-line-clamp: 2)": {
              whiteSpace: "initial",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            },
          }}
        ></Typography>
      )}
      <HomeContent loggedIn={Boolean(user)} />
    </Content>
  );
};
