import { LoadingBubblesPage } from "@/components";
import { ResultsWrapper } from "./ResultsWrapper";
import { TracksList } from "@/features/tracks";
import { useParams } from "react-router-dom";
import { useSearchResults } from "..";

export const VideosResults = () => {
  const { query } = useParams();

  if (!query) return;

  const { data: results } = useSearchResults(query, "videos");

  if (!results) return <LoadingBubblesPage />;

  return (
    <ResultsWrapper>
      <TracksList tracks={results} />
    </ResultsWrapper>
  );
};
