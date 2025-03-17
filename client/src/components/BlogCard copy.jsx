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

  const publishedAt = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex gap-10 py-8 justify-between border-b border-gray-300">
      <div className="flex-1 space-y-2">
        <Link to={`/blogs/${_id}`}>
          <h1 className="text-2xl font-semibold capitalize hover:underline pb-4">
            {title}
          </h1>
        </Link>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="/defaultUser.png"
              alt="profilePic"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">{fullname}</p>
              <p className="text-sm">{publishedAt}</p>
            </div>
          </div>

          <div className="uppercase text-sm">{categoryName}</div>
        </div>
      </div>

      <div className="h-28 w-32">
        <img src={banner} alt="banner" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default BlogCard;
