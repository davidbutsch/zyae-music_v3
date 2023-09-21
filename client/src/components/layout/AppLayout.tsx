import { CssBaseline, useMediaQuery } from "@mui/material";
import { DesktopLayout, MobileLayout } from ".";

import { theme } from "@/styles";

type AppLayoutProps = {
  children: React.ReactNode;
};

// const useLayoutScroll = () => {
//   const { pathname } = useLocation();

//   type History = {
//     path: string;
//     scrollY: number;
//   };

//   const [history, setHistory] = useState<History[]>([]);

//   const pushHistory = (path: string, scrollY: number) =>
//     setHistory((prev) => prev.concat([{ path, scrollY }]));

//   const popHistory = () =>
//     setHistory((prev) => {
//       prev.pop();
//       return prev;
//     });

//   useEffect(() => {
//     const main = document.querySelector("main");
//     if (!main) return;

//     if (history[history.length - 2]?.path == pathname) {
//       // main.scrollTo(0, history[history.length - 2].scrollY);
//       popHistory();
//     } else {
//       console.log(main.scrollTop);
//       pushHistory(pathname, main.scrollTop);
//       // main.scrollTo(0, 0);
//     }
//   }, [pathname]);
// };

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // useLayoutScroll();

  return (
    <>
      <CssBaseline />
      {isSmallScreen ? (
        <MobileLayout children={children} />
      ) : (
        <DesktopLayout children={children} />
      )}
    </>
  );
};
