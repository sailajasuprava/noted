import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";

function SearchResults() {
  const {
    searchResults,
    setSearchResults,
    page,
    setPage,
    hasMore,
    setHasMore,
    isLoading,
    setIsLoading,
  } = useBlog();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  useEffect(() => {
    fetchBlogsBySearch();

    return () => {
      setSearchResults([]);
      setPage(1);
    };
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
      setPage(pageNum);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!searchResults.length) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <p className="text-2xl">
        Search results for{" "}
        <span className="font-semibold">&quot;{searchTerm}&quot;</span>
      </p>

      {searchResults.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}

      {hasMore ? (
        <button
          onClick={() => fetchBlogsBySearch(page + 1)}
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
