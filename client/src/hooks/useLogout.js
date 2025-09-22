import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "../lib/axios";

function useLogout() {
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    try {
      setIsLoading(true);
      const res = await axios.get("/auth/logout");
      toast.success(res.data.message);
      setAuth(null);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, handleLogout };
}

export default useLogout;
