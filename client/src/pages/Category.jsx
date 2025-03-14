import { useParams } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

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
        const res = await axios.get(`/categories/${categoryId}`);
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
    <div>
      <h1 className="uppercase text-center font-bold bg-gray-800 text-3xl py-10">
        Category: <span>{category}</span>
      </h1>
    </div>
  );
}

export default Category;
