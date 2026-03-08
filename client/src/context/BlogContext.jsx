import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

const BlogContext = createContext();

function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [mostLikedBlogs, setMostLikedBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    fetchMostLikedBlogs();
  }, []);

  async function fetchAllCategories() {
    try {
      const res = await axios.get(`/categories`);
      setCategories(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function fetchAllBlogs(
    pageNumber = 1,
    keyword = search,
    category = activeCategory,
  ) {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `/blogs?page=${pageNumber}&search=${keyword}&category=${category}`,
      );

      setBlogs(res.data.data);
      setHasMore(res.data.hasMore);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
        blogs,
        setBlogs,
        page,
        setPage,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        fetchAllBlogs,
        mostLikedBlogs,
        search,
        setSearch,
        categories,
        setCategories,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) throw new Error("BlogContext used outside of provider");
  return context;
}

export default BlogProvider;
