import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import AppLayout from "./components/AppLayout";
import { useAuth } from "./context/AuthContext";
import About from "./pages/v2/About";
import Dashboard from "./pages/v2/Dashboard";

// Lazy-loaded pages
const Signup = lazy(() => import("./pages/v2/Signup"));
const Login = lazy(() => import("./pages/v2/Login"));
const PageNotFound = lazy(() => import("./pages/v2/PageNotFound"));
const CreateBlog = lazy(() => import("./pages/v2/CreateBlog"));
const BlogDetails = lazy(() => import("./pages/v2/BlogDetails"));
const Home = lazy(() => import("./pages/v2/Home"));

function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Suspense fallback UI */}
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={auth ? <Navigate to="/" /> : <Signup />}
            />
            <Route
              path="/login"
              element={auth ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/write"
              element={auth ? <CreateBlog /> : <Navigate to="/login" />}
            />

            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route
            path="/dashboard"
            element={auth ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
