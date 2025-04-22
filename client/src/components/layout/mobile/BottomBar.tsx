import { Stack, alpha, lighten } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { NavBar } from ".";
import { PlayerBar } from "@/features/player";
import { colors } from "@/styles";

export const BottomBar = (): JSX.Element => {
  const playerExpandedState = useState(false);
  const [expanded, setExpanded] = playerExpandedState;

  const barRef = useRef<any>();

  useEffect(() => {
    var initialTouchY = 0;
    var lastTouchY = 0;
    var direction = "down";

    const handleTouchStart = (e: TouchEvent) => {
      if (
        (e.target as Element).closest("#queueScroller") &&
        (document.querySelector("#queueScroller")?.scrollTop || 0) > 0
      )
        return;

      const touchY = e.touches[0].clientY;
      initialTouchY = touchY;
      barRef.current.style.transition = "0s";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (
        (e.target as Element).closest("#queueScroller") &&
        (document.querySelector("#queueScroller")?.scrollTop || 0) > 0
      )
        return;

      const touchY = e.touches[0].clientY;

      const isSlider = Boolean(
        (e.target as HTMLElement).closest("#timeSlider")
      );

      if (!isSlider) {
        if (lastTouchY < touchY) direction = "down";
        else direction = "up";

        lastTouchY = touchY;

        barRef.current.style.bottom = `-${touchY - initialTouchY}px`;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        (e.target as Element).closest("#queueScroller") &&
        (document.querySelector("#queueScroller")?.scrollTop || 0) > 0
      )
        return;

      if (direction == "down" && lastTouchY - initialTouchY > 100)
        setExpanded(false);
      barRef.current.style.transition = ".35s";
      barRef.current.style.bottom = `0px`;

      initialTouchY = 0;
      lastTouchY = 0;
    };

    barRef.current?.addEventListener("touchstart", handleTouchStart);
    barRef.current?.addEventListener("touchmove", handleTouchMove);
    barRef.current?.addEventListener("touchend", handleTouchEnd);

    return () => {
      barRef.current?.removeEventListener("touchstart", handleTouchStart);
      barRef.current?.removeEventListener("touchmove", handleTouchMove);
      barRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [barRef]);

  return (
    <Stack
      ref={barRef}
      justifyContent="space-between"
      sx={[
        {
          position: "fixed",
          bottom: !expanded ? "0 !important" : "0",

          pb: "calc(env(safe-area-inset-bottom, 24px) - 10px)",

          width: "100%",
          minHeight: expanded ? "100%" : "0%",

          bgcolor: alpha(lighten(colors.bg, 0.025), expanded ? 1 : 0.9),
          backdropFilter: `blur(${expanded ? "64" : "20"}px)`,

          borderTopLeftRadius: expanded ? 24 : 0,
          borderTopRightRadius: expanded ? 24 : 0,

          zIndex: 3,

          touchAction: "none",
          overflow: "hidden",
        },
      ]}
    >
      <PlayerBar playerExpandedState={playerExpandedState} />
      <NavBar hidden={expanded} />
    </Stack>
  );
};
