import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import AppLayout from "./components/AppLayout";
import { useAuth } from "./context/AuthContext";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Category = lazy(() => import("./pages/Category"));
const HomeScreen = lazy(() => import("./pages/HomeScreen"));

function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Suspense fallback UI */}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route element={<AppLayout />}>
            <Route path="/blogs" element={<Home />} />
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
