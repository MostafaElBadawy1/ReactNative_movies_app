import { useState } from "react";
import { useDebounce } from "src/shared/hooks/useDebounce";

export function useSearchInput(delay = 500) {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, delay);

  const clear = () => setQuery("");

  return {
    query,
    setQuery,
    debouncedQuery,
    isSearching: debouncedQuery.trim().length > 0,
    clear,
  };
}
