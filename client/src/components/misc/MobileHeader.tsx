import { Box, SxProps, Typography, alpha, lighten } from "@mui/material";
import { FontIcon, IconButton } from "..";
import {
  MenuHeader,
  MenuHeaderOptions,
  OptionItem,
  OptionsList,
  useBottomSheet,
} from "@/features/menus";

import { colors } from "@/styles";
import { useScroll } from "@/hooks";

type Options = {
  icon?: string;
  headerOptions?: MenuHeaderOptions;
  items: OptionItem[];
};

const OptionsButton = ({ options = { items: [] } }: { options?: Options }) => {
  const optionsSheet = useBottomSheet();

  const displayOptions = options.items.length > 0;

  return (
    <>
      <optionsSheet.Element
        {...optionsSheet.elementProps}
        header={<MenuHeader {...options.headerOptions} />}
      >
        <OptionsList variant="sheet" items={options.items} />
      </optionsSheet.Element>
      <Box minWidth="40px">
        {displayOptions && (
          <IconButton
            onClick={optionsSheet.open}
            disableRipple
            sx={{
              "&:active": {
                filter: "brightness(0.5)",
              },
            }}
          >
            <FontIcon
              size={18}
              icon={options.icon || "fi-rr-menu-dots-vertical"}
            />
          </IconButton>
        )}
      </Box>
    </>
  );
};

type MobileHeaderProps = {
  head: string;
  fadeTrigger?: { y: number; fadeHeadY?: number };
  back?: boolean;
  options?: Options;
  sx?: SxProps;
};

export const MobileHeader = ({
  head,
  fadeTrigger = { y: 0 },
  back = true,
  options,
  sx,
}: MobileHeaderProps) => {
  const { y } = useScroll();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,

        pt: "env(safe-area-inset-top)",
        pl: 1,
        pr: 2,

        height: "calc(48px + env(safe-area-inset-top))",

        display: "flex",
        alignItems: "center",

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

          opacity: 0,
          ...(y >= fadeTrigger.y && {
            opacity: 1,
          }),
        },

        zIndex: 3,

        ...sx,
      }}
    >
      <Box minWidth="40px">
        {back && (
          <IconButton
            onClick={() => history.back()}
            disableRipple
            sx={{
              "&:active": {
                filter: "brightness(0.5)",
              },
            }}
          >
            <FontIcon icon="zi-angle-backward" size={18} />
          </IconButton>
        )}
      </Box>
      <Typography
        width="100%"
        textAlign="center"
        fontSize={17}
        fontWeight={500}
        noWrap
        sx={{
          px: "20vw",
          opacity: fadeTrigger.fadeHeadY ? 0 : 1,

          transition: fadeTrigger.fadeHeadY ? ".3s" : "0s",

          ...(fadeTrigger.fadeHeadY &&
            y >= fadeTrigger.fadeHeadY && {
              opacity: 1,
              px: 2.5,
            }),
        }}
      >
        {head}
      </Typography>
      <OptionsButton options={options} />
    </Box>
  );
};
