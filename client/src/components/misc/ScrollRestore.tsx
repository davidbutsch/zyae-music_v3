import { theme } from "@/styles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export const ScrollRestore = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const location = useLocation();

  const raw = localStorage.getItem("history");
  const history = JSON.parse(raw || "[]");

  useEffect(() => {
    const pastLocation = history.find(
      (historyItem: any) => historyItem.key == location.key
    );

    xs
      ? window.scrollTo(0, pastLocation?.scrollY || 0)
      : document.querySelector("main")?.scrollTo(0, pastLocation?.scrollY || 0);
  }, [location]);

  return null;
};
