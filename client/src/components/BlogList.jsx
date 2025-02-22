import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "./Spinner";
import BlogCard from "./BlogCard";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchAllBlogs() {
      try {
        const res = await axios.get("/blogs");
        setBlogs(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    fetchAllBlogs();
  }, []);

  if (!blogs.length) return <Spinner />;

  console.log(blogs);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {blogs.map((blog, i) => (
        <BlogCard key={i} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
