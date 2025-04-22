import { GenericCard } from "@/types";
import { useLocalStorage } from "@/hooks";

export const useSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<GenericCard[]>(
    "searchHistory",
    []
  );

  const add = (item: GenericCard) => {
    const filteredHistory = history.filter(
      (historyItem) => historyItem.id !== item.id
    );
    setHistory([item, ...filteredHistory]);
  };

  const remove = (itemId: string) => {
    const filteredHistory = history.filter(
      (historyItem) => historyItem.id !== itemId
    );
    setHistory(filteredHistory);
  };

  const clear = () => setHistory([]);

  return { history, add, remove, clear };
};
