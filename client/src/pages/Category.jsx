import { useParams } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import BlogCard from "../components/BlogCard";

function Category() {
  const { category } = useParams();
  const { categories } = useCategory();
  const [isLoading, setIsLoading] = useState(false);
  const [blogsByCategory, setBlogsByCategory] = useState([]);
  const filteredCategory = categories.filter(
    (item) => item.categoryName === category
  );

  const categoryId = filteredCategory[0]?._id;
  useEffect(() => {
    async function fetchBlogsByCategory() {
      try {
        setIsLoading(true);
        const res = await axios.get(`blogs/category/${categoryId}`);
        setBlogsByCategory(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogsByCategory();
  }, [categoryId]);

  console.log(blogsByCategory);

  if (isLoading) return;

  return (
    <div className="mt-36 space-y-6">
      <h1 className="uppercase text-center font-bold bg-gray-100 dark:bg-gray-800 text-3xl py-10">
        Category:{" "}
        <span className="text-red-700 dark:text-amber-300">{category}</span>
      </h1>
      <div className="w-3xl mx-auto grid grid-cols-2 gap-10">
        {blogsByCategory.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Category;
