import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

function useSearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  useEffect(() => {
    setSearchResults([]);
    setSearchPage(1);
    fetchBlogsBySearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  async function fetchBlogsBySearch(pageNum = 1) {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/blogs?page=${pageNum}&search=${searchTerm}`
      );
      setSearchResults((prev) => [...prev, ...res.data.data]);
      setHasMore(res.data.hasMore);
      setSearchPage(pageNum);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    searchResults,
    searchPage,
    hasMore,
    isLoading,
    fetchBlogsBySearch,
    searchTerm,
  };
}

export default useSearchResults;
