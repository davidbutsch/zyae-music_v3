import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
