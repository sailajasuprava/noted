import { useBlog } from "../context/BlogContext";
import Spinner from "./Spinner";

function MostLikedBlogsList() {
  const { mostLikedBlogs } = useBlog();

  if (!mostLikedBlogs.length) return <Spinner />;

  return (
    <div className="flex-1">
      <h1 className="text-lg font-bold opacity-30 pb-4">Most Popular</h1>
      <ul className="space-y-2 text-lg">
        {mostLikedBlogs.map((blog, i) => (
          <li key={blog._id} className="flex gap-1">
            <span className="text-2xl font-bold opacity-20">0{i + 1}.</span>
            <span className="font-semibold capitalize hover:underline pb-4">
              {blog.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostLikedBlogsList;
