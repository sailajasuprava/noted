import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { generateSummary } from "../lib/gemini";
import { useBlog } from "../context/BlogContext";

const initialState = {
  title: "",
  category: "",
  content: "",
  summary: "",
  banner: "",
};

function useCreateBlog() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { setBlogs } = useBlog();

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
      setBlogs((prev) => [res.data.data, ...prev]);
      setFormData(initialState);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputValidation() {
    const { title, content } = formData;

    if (title.length < 3 || title.length > 100) {
      toast.error("Title must be between 3-100 characters.");
      return false;
    }
    const plainText = content.replace(/<[^>]+>/g, "");

    if (plainText.length < 400) {
      toast.error("Content must be at least 400 characters.");
      return false;
    }

    return true;
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({ ...formData, banner: reader.result });
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleGenerateSummary(content) {
    try {
      setIsGenerating(true);
      const data = await generateSummary(content);
      setFormData((prev) => ({ ...prev, summary: data }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerating(false);
    }
  }

  return {
    formData,
    isLoading,
    isGenerating,
    handleGenerateSummary,
    handleFormData,
    handleFormSubmission,
    handleImageChange,
  };
}

export default useCreateBlog;
