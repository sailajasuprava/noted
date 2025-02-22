import { Link } from "react-router-dom";
function BlogCard({ blog }) {
  const {
    author: { fullname },
    banner,
    title,
    category,
    createdAt,
    _id,
  } = blog;

  return (
    <div className="flex gap-10 pb-16 justify-between">
      <div className="flex-1 space-y-2">
        <Link to={`/blogs/${_id}`}>
          <h1 className="text-2xl font-semibold capitalize hover:underline">
            {title}
          </h1>
        </Link>
        <h3 className="uppercase opacity-45">{category}</h3>
        <div className="flex justify-between text-sm">
          <span>{fullname}</span>
          <span>{createdAt.split("T")[0]}</span>
        </div>
      </div>
      <div className="h-28 w-32">
        <img src={banner} alt="banner" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default BlogCard;
