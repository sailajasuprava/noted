import { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setIsInitialLoading(true);
        const res = await axios.get("/auth/profile");
        setAuth(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext used outside of provider");
  return context;
}

export default AuthProvider;
