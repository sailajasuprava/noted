import { Link } from "react-router-dom";
function BlogCard({ blog }) {
  const {
    author: { fullname },
    banner,
    title,
    category: { categoryName },
    createdAt,
    summary,
    _id,
  } = blog;
  console.log(blog);

  const publishedAt = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div className="h-56">
        <img src={banner} alt="banner" className="w-full h-full object-cover" />
      </div>

      <p className="text-xs uppercase py-7">
        <span className="px-2 bg-black text-white">{categoryName}</span>
        <span className="ml-4">{publishedAt}</span>
      </p>
      <Link to={`/blogs/${_id}`}>
        <h2 className="text-xl font-bold capitalize tracking-tight leading-6 hover:opacity-50 duration-300">
          {title}
        </h2>
      </Link>

      <p className="py-4">{summary}</p>
      <p className="text-red-500 uppercase text-xs font-bold">{fullname}</p>
    </div>
  );
}

export default BlogCard;
