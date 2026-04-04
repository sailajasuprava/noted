import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../lib/axios";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import CommentCard from "../../components/CommentCard";
import { useAuth } from "../../context/AuthContext";
import { GoComment } from "react-icons/go";
// import { PiSpeakerHighLight, PiSpinnerGapBold } from "react-icons/pi";
import {
  // FaRegPauseCircle,
  // FaRegStopCircle,
  FaUserCircle,
} from "react-icons/fa"; // Added FaUserCircle
// import { FaRegCirclePlay } from "react-icons/fa6";
import DOMPurify from "dompurify";

function BlogDetails() {
  const [blog, setBlog] = useState();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchABlog() {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching blog");
      }
    }
    fetchABlog();
  }, [id]);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!auth) {
      navigate("/login");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`/comments`, { blogId: id, comment: input });
      setBlog({ ...blog, comments: [...blog.comments, res.data.data] });
      setInput("");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLike() {
    if (!auth) {
      navigate("/login");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.patch(`/blogs/like/${id}`);
      setBlog({
        ...blog,
        likes: res.data.data.likes,
        numOfLikes: res.data.data.numOfLikes,
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleReadAloud = () => {
    if (!content) return;
    if (isPaused) {
      speechSynthesis.resume();
      setIsSpeaking(true);
      setIsPaused(false);
      return;
    }
    speechSynthesis.cancel();
    const newUtterance = new SpeechSynthesisUtterance(
      content.slice(currentCharIndex),
    );
    newUtterance.lang = "en-US";
    newUtterance.onboundary = (event) => setCurrentCharIndex(event.charIndex);
    newUtterance.onend = () => {
      setIsSpeaking(false);
      setCurrentCharIndex(0);
    };
    speechSynthesis.speak(newUtterance);
    setIsSpeaking(true);
  };

  const handlePause = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsSpeaking(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentCharIndex(0);
  };

  if (!blog) return <Spinner />;

  const {
    author: { fullname },
    banner,
    title,
    content,
    comments,
    likes,
    numOfLikes,
    createdAt,
    category: { categoryName },
  } = blog;

  const publishedAt = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Full-Width Banner Image */}
      <div className="w-full h-[50vh] md:h-[90vh] relative">
        <img src={banner} alt={title} className="w-full h-full object-cover" />
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 2. Overlapping Content Card */}
      <div className="max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 relative -mt-32 md:-mt-36 z-10 pb-20">
        <div className="bg-white shadow-xl  overflow-hidden p-6 md:p-12 lg:p-14">
          {/* Header Area */}
          <header className="mb-6 border-b border-gray-300 pb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#3ecdc4] text-[10px] font-black uppercase tracking-[0.3em]">
                {categoryName}
              </span>
              <span className="text-gray-300 text-[10px]">•</span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                {publishedAt}
              </span>
            </div>

            <h1 className="text-4xl capitalize md:text-6xl font-bold text-[#0c3f3f] leading-[1.1] tracking-tighter mb-6">
              {title}
            </h1>

            {/* Integrated Author & Audio Section */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                  {/* Replace with auth.avatar if available, otherwise FaUserCircle */}
                  <img
                    src={auth?.avatar}
                    alt={fullname}
                    className="w-full h-full object-cover grayscale"
                  />
                  <FaUserCircle className="text-gray-200 w-full h-full" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Written By
                  </p>
                  <h4 className="text-[#0c3f3f] font-bold text-base leading-none">
                    {fullname || "Guest Author"}
                  </h4>
                </div>
              </div>

              {/* Audio Controls */}
              {/* <div className="flex items-center gap-3 bg-gray-50 px-5 py-2 rounded-full text-[#117a7a] border border-gray-100">
                {isSpeaking ? (
                  <button
                    onClick={handlePause}
                    className="hover:scale-110 transition-transform"
                  >
                    <FaRegPauseCircle size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleReadAloud}
                    className="hover:scale-110 transition-transform"
                  >
                    {isPaused ? (
                      <FaRegCirclePlay size={20} />
                    ) : (
                      <PiSpeakerHighLight size={20} />
                    )}
                  </button>
                )}
                <button
                  onClick={handleStop}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <FaRegStopCircle size={20} />
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest ml-1">
                  Listen
                </span>
              </div> */}

              <div className="px-5 py-2 flex items-center gap-8">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 group transition-all"
                >
                  {likes.includes(auth?._id) ? (
                    <IoIosHeart
                      size={24}
                      fill="#ef4444"
                      className="animate-pulse"
                    />
                  ) : (
                    <IoIosHeartEmpty
                      size={24}
                      className="text-gray-400 group-hover:text-red-400"
                    />
                  )}
                  <span className="font-black text-[#0c3f3f] text-sm uppercase tracking-widest">
                    {numOfLikes} Likes
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <GoComment size={22} className="text-gray-400" />
                  <span className="font-black text-[#0c3f3f] text-sm uppercase tracking-widest">
                    {comments?.length} Comments
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Layout: Sidebar + Article */}
          <main className="max-w-5xl mx-auto">
            <article className="prose prose-slate lg:prose-xl max-w-none text-gray-600 leading-relaxed font-serif">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            </article>

            {/* Post-Article Interaction Bar */}

            {/* Comment Section */}
            <section className="border-t border-gray-100 pt-16">
              <div className="flex items-center gap-3 mb-10">
                <h3 className="text-xl font-bold text-[#0c3f3f]">Comments</h3>
                <span className="bg-[#3ecdc4]/20 text-[#0c3f3f] px-3 py-0.5 rounded-full text-xs font-bold">
                  {comments.length}
                </span>
              </div>

              {/* Refined Input Area (Reference: Skill Sprout Style) */}
              <form
                className="bg-gray-50 rounded-2xl p-4 mb-16 border border-gray-100 shadow-sm"
                onSubmit={handleCommentSubmit}
              >
                <textarea
                  placeholder="Add comment..."
                  className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-gray-700 resize-none min-h-[80px] text-base placeholder:text-gray-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    disabled={isLoading}
                    className="bg-gradient-to-br from-[#0c3f3f] via-[#117a7a] to-[#3ecdc4] text-white px-8 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-teal-900/10"
                  >
                    {isLoading ? "Posting..." : "Submit"}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-1">
                {comments.map((item, i) => (
                  <CommentCard key={i} item={item} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
