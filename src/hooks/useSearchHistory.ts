import { useState } from 'react';

const SEARCH_HISTORY_KEY = 'athos-search-history';
const MAX_HISTORY_ITEMS = 10;

const readSearchHistory = (): string[] => {
  try {
    const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) ?? '[]');
    return Array.isArray(history)
      ? history.filter((query): query is string => typeof query === 'string')
      : [];
  } catch {
    return [];
  }
};

const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(readSearchHistory);

  const addSearch = (query: string) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    const nextHistory = [
      normalizedQuery,
      ...history.filter((historyQuery) => historyQuery !== normalizedQuery),
    ].slice(0, MAX_HISTORY_ITEMS);

    setHistory(nextHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
  };

  return { history, addSearch };
};

export default useSearchHistory;
