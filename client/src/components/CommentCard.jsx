import { FaUserCircle } from "react-icons/fa";
// import {
//   FiThumbsUp,
//   FiThumbsDown,
//   FiMessageSquare,
//   FiMoreHorizontal,
// } from "react-icons/fi";

function CommentCard({ item }) {
  const {
    comment,
    userId: { fullname },
    createdAt,
  } = item;

  // Simple relative time or formatted date
  const dateObj = new Date(createdAt);
  const timeAgo =
    dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) +
    " at " +
    dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="group py-6 first:pt-0">
      <div className="flex gap-4">
        {/* Profile Avatar */}
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-200 border border-white overflow-hidden shadow-sm">
            <img
              src="/default-profile.png"
              alt="avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <FaUserCircle className="text-gray-300 w-full h-full hidden" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-[#0c3f3f] text-sm">{fullname}</h4>
            <span className="text-xs text-gray-400">{timeAgo}</span>
          </div>

          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            {comment}
          </p>

          {/* Action Bar (Reference: Screenshot Buttons) */}
          {/* <div className="flex items-center gap-5 text-gray-400">
            <button className="flex items-center gap-1.5 hover:text-[#3ecdc4] transition-colors">
              <FiThumbsUp size={16} />
              <span className="text-xs font-bold">25</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <FiThumbsDown size={16} />
              <span className="text-xs font-bold">3</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-[#0c3f3f] transition-colors">
              <FiMessageSquare size={16} />
              <span className="text-xs font-bold uppercase tracking-tight">
                Reply
              </span>
            </button>
            <button className="hover:text-[#0c3f3f] ml-auto">
              <FiMoreHorizontal size={18} />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
