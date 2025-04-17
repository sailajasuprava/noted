import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import BlogProvider from "./context/BlogContext.jsx";
import CategoryProvider from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <BlogProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </BlogProvider>
  </AuthProvider>
  // </StrictMode>
);
