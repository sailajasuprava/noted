import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import AppLayout from "./components/AppLayout";
import { useAuth } from "./context/AuthContext";

// Lazy-loaded pages
const Signup = lazy(() => import("./pages/v2/Signup"));
const Login = lazy(() => import("./pages/v2/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const BlogDetails = lazy(() => import("./pages/v2/BlogDetails"));
const SearchResults = lazy(() => import("./pages/v1/SearchResults"));
const Category = lazy(() => import("./pages/Category"));
const Home2 = lazy(() => import("./pages/v2/Home"));

function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Suspense fallback UI */}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home2 />} />
            <Route
              path="/signup"
              element={auth ? <Navigate to="/blogs" /> : <Signup />}
            />
            <Route
              path="/login"
              element={auth ? <Navigate to="/blogs" /> : <Login />}
            />
            <Route
              path="/write"
              element={auth ? <CreateBlog /> : <Navigate to="/login" />}
            />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
