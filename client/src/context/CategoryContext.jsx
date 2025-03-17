import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);
  console.log(categories);

  async function fetchAllCategories() {
    try {
      const res = await axios.get(`/categories`);
      setCategories(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("CategoryContext used outside of provider.");
  return context;
}

export default CategoryProvider;
