import { Button, Stack } from "@mui/material";

import { FontIcon } from "@/components";

export type OptionItem = {
  icon?: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  persistOnClick?: boolean;
};

export const OptionsList = ({
  variant,
  items,
}: {
  variant: "sheet" | "popover";
  items: OptionItem[];
}) => {
  return (
    <Stack
      sx={{
        py: variant == "sheet" ? 2 : 0,
      }}
    >
      {items.map((item) => (
        <Button
          key={item.title}
          id={!item.persistOnClick ? "closeOnClickOption" : undefined}
          onClick={item.onClick}
          disabled={item.disabled}
          fullWidth
          sx={{
            py: variant == "sheet" ? 3 : 3,
            px: variant == "sheet" ? "30px" : 2,

            justifyContent: "left",
            gap: variant == "sheet" ? "26px" : 2,

            borderRadius: 0,
            fontSize: variant == "sheet" ? 14 : 14,
            fontWeight: "500",
            textTransform: "none",

            ...(variant == "popover" && {
              "&:not(&:last-child)": {
                borderBottom: "1px solid rgba(255,255,255,.05)",
              },
            }),
          }}
        >
          <FontIcon
            icon={item.icon || ""}
            size={variant == "sheet" ? 20 : 16}
            sx={{
              minWidth: 20,
              opacity: 0.72,
            }}
          />
          {item.title}
        </Button>
      ))}
    </Stack>
  );
};
