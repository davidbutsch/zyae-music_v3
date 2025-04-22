import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { DelayFade, List, LoadingBubblesPage } from "@/components";
import { TopResult, useSearchHistory, useSearchResults } from "..";
import { useEffect, useState } from "react";

import { GenericCard } from "@/types";
import { Peak } from "./Peak";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";
import { useParams } from "react-router-dom";

const Category = ({
  category,
}: {
  category: TopResult;
  setPeaked: React.Dispatch<React.SetStateAction<GenericCard | null>>;
}) => {
  const { query } = useParams();
  const navigate = useAppNavigate();
  const searchHistory = useSearchHistory();

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1.5}
      >
        <Typography variant="h5" fontWeight={500}>
          {category.type}
        </Typography>
        {category.type !== "Top results" && (
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              navigate(
                `../${category.type.split(" ")[0].toLowerCase()}/${query}`,
                { persistScroll: false }
              )
            }
          >
            More
          </Button>
        )}
      </Stack>
      <List
        items={category.items}
        view="list"
        elementProps={(item) => ({
          onMouseDown: () => searchHistory.add(item),
        })}
      />
    </Box>
  );
};

export const TopResults = () => {
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  const [peaked, setPeaked] = useState<GenericCard | null>(null);

  const { query } = useParams();

  const { data: results } = useSearchResults(query!, "top", {
    enabled: Boolean(query),
  });

  useEffect(() => {
    if (results) setPeaked(results[0].items[0]);
  }, [results]);

  if (!query) return;

  return (
    <DelayFade
      sx={{
        height: "100%",

        display: "flex",
        flexDirection: "row",
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",

          mask: {
            xs: "none",
            sm: "linear-gradient(transparent, #fff 7.5%, #fff 92.5%, transparent)",
          },
        }}
      >
        <Stack
          spacing={3}
          width="100%"
          sx={{
            py: { xs: 0, sm: 5 },
            pt: { xs: 1, sm: 5 },
            overflowX: "hidden",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {!results ? (
            <LoadingBubblesPage />
          ) : (
            results.map((result, i) => (
              <DelayFade key={result.type} delay={i * 50}>
                <Category category={result} setPeaked={setPeaked} />
              </DelayFade>
            ))
          )}
        </Stack>

        {!sm && <Peak peaked={peaked} />}
      </Stack>
    </DelayFade>
  );
};
