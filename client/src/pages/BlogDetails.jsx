import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import CommentCard from "../components/CommentCard";
import { useAuth } from "../context/AuthContext";
import { GoComment } from "react-icons/go";

function BlogDetails() {
  const [blog, setBlog] = useState();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchABlog() {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    fetchABlog();
  }, [id]);

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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

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
    <div className="max-w-3xl mx-auto mt-44">
      <div className="h-[400px]">
        <img src={banner} alt="banner" className="w-full h-full object-cover" />
      </div>

      <div className="text-xs uppercase py-7 flex justify-between">
        <div>
          <span className="px-2 bg-black text-white">{categoryName}</span>
          <span className="ml-4">{publishedAt}</span>
        </div>
        <div className="text-red-500 uppercase text-xs font-bold">
          {fullname}
        </div>
      </div>

      <div className="flex justify-between items-center py-2 border-y border-gray-200">
        <div className="text-gray-400">
          {Math.round(content.length / 1000)} min read
        </div>

        <div className="flex gap-8">
          <div className="flex gap-1">
            <button
              className="cursor-pointer hover:text-red-500"
              onClick={handleLike}
            >
              {likes.includes(auth?._id) ? (
                <IoIosHeart size={22} fill="red" />
              ) : (
                <IoIosHeartEmpty size={22} />
              )}
            </button>
            <span>{numOfLikes}</span>
          </div>
          <div className="flex gap-1">
            <button>
              <GoComment size={20} />
            </button>
            <span>{comments?.length}</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold capitalize tracking-tight leading-6 pt-6 pb-4">
        {title}
      </h1>

      <p className="">{content}</p>

      <form
        className="border p-4 my-10 space-y-4 text-end rounded-md"
        onSubmit={handleCommentSubmit}
      >
        <textarea
          name="comment"
          placeholder="Add a comment..."
          className="input"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <button className="btn-black" disabled={isLoading}>
          Submit
        </button>
      </form>

      <div>
        <h1 className="text-xl font-bold tracking-tight">
          Comments ({comments.length})
        </h1>

        {comments.map((item, i) => (
          <CommentCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BlogDetails;
