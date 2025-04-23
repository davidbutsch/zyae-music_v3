import { ScrollRestore } from "@/components";
import { AppProvider } from "@/providers";
import { AppRoutes } from "@/routes";

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <AppRoutes />
      <ScrollRestore />
      {/* {!xs && <ReactQueryDevtools />} */}
    </AppProvider>
  );
};

export default App;
