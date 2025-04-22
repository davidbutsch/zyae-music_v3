import { AppProvider } from "@/providers";
import { AppRoutes } from "@/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScrollRestore } from "@/components";
import { theme } from "./styles";
import { useMediaQuery } from "@mui/material";

const App = (): JSX.Element => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <AppProvider>
      <AppRoutes />
      <ScrollRestore />
      {!xs && <ReactQueryDevtools />}
    </AppProvider>
  );
};

export default App;
