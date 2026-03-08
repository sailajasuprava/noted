import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function useSignup() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  function handleFormData(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleFormSubmission(e) {
    e.preventDefault();
    const success = handleInputValidation(formData);
    if (!success) return;

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/signup", formData);
      toast.success(res.data.message);
      setAuth(res.data.data);
      setFormData(initialState);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputValidation(formData) {
    const { password, passwordConfirm } = formData;

    if (password.length < 8) {
      toast.error("Password must be of at least 8 characters.");
      return false;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords don't match.");
      return false;
    }

    return true;
  }
  return { formData, isLoading, handleFormData, handleFormSubmission };
}

export default useSignup;
