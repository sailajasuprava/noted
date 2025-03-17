import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useSearch } from "../context/SearchContext";

function SearchResults() {
  const {
    searchResults,
    setSearchResults,
    searchPage,
    setSearchPage,
    hasMore,
    setHasMore,
    isLoading,
    setIsLoading,
  } = useSearch();

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

  if (!searchResults.length) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto mt-40">
      <p className="text-2xl pb-10">
        Search results for{" "}
        <span className="font-semibold">&quot;{searchTerm}&quot;</span>
      </p>

      <div className="grid grid-cols-2 gap-10">
        {searchResults.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {hasMore ? (
        <button
          onClick={() => fetchBlogsBySearch(searchPage + 1)}
          disabled={isLoading}
          className="btn-white mt-10"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      ) : (
        <p className="mt-10 font-semibold tracking-wide text-lg opacity-40">
          No more results
        </p>
      )}
    </div>
  );
}

export default SearchResults;
