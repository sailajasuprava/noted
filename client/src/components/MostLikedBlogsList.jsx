import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import Spinner from "./Spinner";

function MostLikedBlogsList() {
  const { mostLikedBlogs } = useBlog();

  if (!mostLikedBlogs.length) return <Spinner />;

  return (
    <div className="w-full">
      <h1 className="text-lg font-bold opacity-30 pb-4">Most Popular</h1>
      <ul className="space-y-4 text-lg">
        {mostLikedBlogs.map((blog, i) => (
          <li key={blog._id} className="flex gap-1">
            <span className="text-2xl font-bold opacity-20">0{i + 1}.</span>
            <Link to={`/blods/${blog._id}`}>
              <span className="font-semibold capitalize tracking-tight leading-6 hover:opacity-50 duration-300 pb-4">
                {blog.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostLikedBlogsList;
