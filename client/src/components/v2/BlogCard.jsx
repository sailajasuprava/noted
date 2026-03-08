import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

function BlogCard({ blog }) {
  const {
    author: { fullname, avatar },
    banner,
    title,
    category: { categoryName },
    createdAt,
    // summary,
    content,
    id,
  } = blog;

  const publishedAt = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const readTime = "10 mins read";

  return (
    <div key={id} className="group cursor-pointer flex flex-col">
      {/* Image Wrap with Floating Arrow */}
      <div className="relative mb-6">
        <div className="aspect-[1.5/1] overflow-hidden">
          <img
            src={banner}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Floating Action Button - Matches the Black/Orange square in screenshot */}
        {/* <div className="absolute -bottom-4 -right-0 w-12 h-12 bg-black text-white flex items-center justify-center transition-colors duration-300">
                    <MdArrowOutward size={24} />
                  </div> */}
      </div>

      {/* Content Wrap */}
      <div className="flex flex-col">
        {/* Category with Dash - Matches the screenshot style */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-[2px] w-8 bg-slate-800"></div>
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
            {categoryName}
          </span>
        </div>

        {/* Title - Bold, Uppercase, and Compact */}
        <Link to={`/blogs/${id}`}>
          <h3 className="font-black text-xl text-slate-900 mb-4 leading-[1.2] uppercase tracking-tight group-hover:text-teal-500 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          />
        </p>

        {/* Bottom Metadata - Matches the icon layout in screenshot */}
        {/* Author */}
        <div className="flex items-center gap-3 mt-auto">
          <img
            src={avatar}
            alt={fullname}
            className="w-10 h-10 rounded-full object-cover grayscale"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-800 text-sm">
              {fullname}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-xs mt-0.5">
              <span>{publishedAt}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
