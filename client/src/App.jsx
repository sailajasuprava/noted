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
import Category from "./pages/Category";
import HomeScreen from "./pages/HomeScreen";

function App() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <ScrollToTop />
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
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
