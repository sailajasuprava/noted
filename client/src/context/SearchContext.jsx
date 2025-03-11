import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchPage,
        setSearchPage,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("SearchContext used outside of provider.");
  return context;
}

export default SearchProvider;
