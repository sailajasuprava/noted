import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

const initialState = {
  title: "",
  category: "",
  content: "",
};

function useCreateBlog() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  function handleFormData(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleFormSubmission(e) {
    e.preventDefault();
    const success = handleInputValidation();
    if (!success) return;

    try {
      setIsLoading(true);
      const res = await axios.post("/blogs", formData);
      toast.success(res.data.message);
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputValidation() {
    const { title, content } = formData;

    if (title.length < 3 || title.length > 50) {
      toast.error("Title must be between 3-50 characters.");
      return false;
    }
    if (content.length < 200) {
      toast.error("Content must be of at least 200 characters.");
      return false;
    }

    return true;
  }

  return { formData, isLoading, handleFormData, handleFormSubmission };
}

export default useCreateBlog;
