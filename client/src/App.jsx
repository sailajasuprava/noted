import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { useAuth } from "./context/AuthContext";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import Category from "./pages/Category";

function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route
            path="/profile"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
