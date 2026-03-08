import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../lib/axios";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import CommentCard from "../../components/CommentCard";
import { useAuth } from "../../context/AuthContext";
import { GoComment } from "react-icons/go";
import { PiSpeakerHighLight, PiSpinnerGapBold } from "react-icons/pi";
import {
  FaRegPauseCircle,
  FaRegStopCircle,
  FaUserCircle,
} from "react-icons/fa"; // Added FaUserCircle
import { FaRegCirclePlay } from "react-icons/fa6";
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
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0c3f3f] leading-tight tracking-tight mb-8">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-100 pb-8">
              <span className="text-[#3ecdc4]">{categoryName}</span>
              <span className="hidden sm:block">•</span>
              <span>{publishedAt}</span>
              <span className="hidden sm:block">•</span>

              {/* Audio Controls */}
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-1.5 rounded-full text-[#117a7a]">
                {isSpeaking ? (
                  <button onClick={handlePause}>
                    <FaRegPauseCircle size={18} />
                  </button>
                ) : (
                  <button onClick={handleReadAloud}>
                    {isPaused ? (
                      <FaRegCirclePlay size={18} />
                    ) : (
                      <PiSpeakerHighLight size={18} />
                    )}
                  </button>
                )}
                <button onClick={handleStop} className="text-gray-300">
                  <FaRegStopCircle size={18} />
                </button>
                <span className="text-[10px] font-black ml-1">Listen</span>
              </div>
            </div>
          </div>

          {/* Main Layout: Sidebar + Article */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Sidebar (Updated Author Card) */}
            <aside className="lg:col-span-4">
              <div className="bg-[#f8fdfe] border border-gray-100 rounded-lg p-7 shadow-sm sticky top-8">
                {/* Avatar with Status Dot */}
                <div className="relative mb-6">
                  <FaUserCircle className="text-gray-200 text-7xl" />
                  <span className="absolute bottom-1 left-12 w-4 h-4 bg-[#3ecdc4] border-2 border-white rounded-full"></span>
                </div>

                <div className="mb-6">
                  <h4 className="text-[#0c3f3f] font-extrabold text-xl tracking-tight">
                    {fullname || "test1"}
                  </h4>
                  <p className="text-gray-400 text-sm font-medium">Author</p>
                </div>

                <button className="w-full py-3.5 bg-gradient-to-r from-[#47d7cf] to-[#168a8a] text-white text-xs font-black rounded-2xl hover:brightness-110 transition-all uppercase tracking-widest shadow-lg shadow-teal-100 mb-6">
                  Follow Author
                </button>

                <div className="flex gap-6 pt-5 border-t border-gray-100">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 group"
                  >
                    {likes.includes(auth?._id) ? (
                      <IoIosHeart size={20} fill="#ef4444" />
                    ) : (
                      <IoIosHeartEmpty
                        size={20}
                        className="text-gray-400 group-hover:text-red-400"
                      />
                    )}
                    <span className="font-bold text-gray-500 text-sm">
                      {numOfLikes}
                    </span>
                  </button>
                  <div className="flex items-center gap-2">
                    <GoComment size={18} className="text-gray-400" />
                    <span className="font-bold text-gray-500 text-sm">
                      {comments?.length}
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <main className="lg:col-span-8">
              <article className="prose prose-slate max-w-none text-gray-600 leading-relaxed text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content),
                  }}
                />
              </article>

              {/* Comment Section */}
              <div className="mt-16 pt-12 border-t border-gray-100">
                <h3 className="text-xl font-extrabold text-[#0c3f3f] mb-8">
                  Comments ({comments.length})
                </h3>

                <form
                  className="bg-gray-50 rounded-2xl p-5 mb-10 border border-gray-100"
                  onSubmit={handleCommentSubmit}
                >
                  <textarea
                    placeholder="Share your thoughts..."
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-700 resize-none min-h-[100px]"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="bg-[#0c3f3f] text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-[#117a7a] transition-all">
                      {isLoading ? (
                        <PiSpinnerGapBold className="animate-spin" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  {comments.map((item, i) => (
                    <CommentCard key={i} item={item} />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
