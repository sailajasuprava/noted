import Spinner from "./Spinner";
import BlogCard from "./BlogCard";
import { useBlog } from "../context/BlogContext";

function BlogList() {
  const { blogs, hasMore, isLoading, fetchAllBlogs } = useBlog();

  if (!blogs.length) return <Spinner />;

  return (
    <div className="w-full">
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
