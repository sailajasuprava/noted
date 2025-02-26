import Spinner from "./Spinner";
import BlogCard from "./BlogCard";

function BlogList({ blogs, hasMore, isLoading, fetchAllBlogs }) {
  if (!blogs.length) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}

      {hasMore ? (
        <button
          onClick={fetchAllBlogs}
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

export default BlogList;
