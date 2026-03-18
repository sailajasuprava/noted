import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function useLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(error);
      // Clean up the URL so the error doesn't stay there if they refresh
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  function handleFormData(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleFormSubmission(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post("/auth/login", formData);
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

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  return {
    formData,
    isLoading,
    handleFormData,
    handleFormSubmission,
    handleGoogleLogin,
  };
}

export default useLogin;
