import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
const BlogContext = createContext();

function BlogProvider({ children }) {
  const [active, setActive] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [mostLikedBlogs, setMostLikedBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    fetchMostLikedBlogs();
  }, []);

  const handleCategoryClick = (category) => {
    setActive(category);
    setBlogs([]);
    setPage(1);
  };

  async function fetchAllBlogs() {
    try {
      setIsLoading(true);
      const res = await axios.get(`/blogs?page=${page}&category=${active}`);
      setBlogs((prev) => [...prev, ...res.data.data]);
      setHasMore(res.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMostLikedBlogs() {
    try {
      const res = await axios.get(`/blogs/most-liked`);
      setMostLikedBlogs((prev) => [...prev, ...res.data.data]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <BlogContext.Provider
      value={{
        active,
        setActive,
        blogs,
        setBlogs,
        page,
        setPage,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        searchResults,
        setSearchResults,
        fetchAllBlogs,
        handleCategoryClick,
        mostLikedBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) throw new Error("BlogContext used outside of provider.");
  return context;
}

export default BlogProvider;
