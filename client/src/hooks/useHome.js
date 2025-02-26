import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

function useHome() {
  const [active, setActive] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllBlogs();
  }, [active]);

  const handleCategoryClick = (category) => {
    setActive(category);
    setPage(1);
  };

  async function fetchAllBlogs() {
    try {
      setIsLoading(true);
      const res = await axios.get(`/blogs?page=${page}&category=${active}`);
      if (page === 1) {
        setBlogs([...res.data.data]); // Reset blogs when category changes
      } else {
        setBlogs((prev) => [...prev, ...res.data.data]); // Append more blogs
      }

      setHasMore(res.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    active,
    setActive,
    blogs,
    hasMore,
    isLoading,
    fetchAllBlogs,
    handleCategoryClick,
  };
}

export default useHome;
