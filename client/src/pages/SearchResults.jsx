import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import useSearchResults from "../hooks/useSearchResults";

function SearchResults() {
  const {
    searchResults,
    searchPage,
    hasMore,
    isLoading,
    searchTerm,
    fetchBlogsBySearch,
  } = useSearchResults();

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto mt-40">
      <p className="text-2xl pb-10">
        Search results for{" "}
        <span className="font-semibold text-red-500 dark:text-amber-300">
          &quot;{searchTerm}&quot;
        </span>
      </p>

      {!searchResults.length ? (
        <p className="text-5xl font-semibold text-gray-500">No blogs found!</p>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-2 gap-10">
            {searchResults.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {hasMore ? (
            <button
              onClick={() => fetchBlogsBySearch(searchPage + 1)}
              disabled={isLoading}
              className="btn-black mt-10"
            >
              {isLoading ? "Loading..." : "Load more"}
            </button>
          ) : (
            <p className="mt-10 font-semibold tracking-wide text-lg opacity-40">
              No more results
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResults;
