import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "./Spinner";
import BlogCard from "./BlogCard";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  async function fetchAllBlogs() {
    try {
      setIsLoading(true);
      const res = await axios.get(`/blogs?page=${page}`);
      setBlogs([...blogs, ...res.data.data]);
      setHasMore(res.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!blogs.length) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {blogs.map((blog, i) => (
        <BlogCard key={i} blog={blog} />
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
