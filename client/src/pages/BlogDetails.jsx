import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const [blog, setBlog] = useState();
  const { id } = useParams();

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

  if (!blog) return <Spinner />;
  console.log(blog);

  const {
    author: { fullname },
    banner,
    title,
    content,
    createdAt,
  } = blog;

  const publishedAt = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-10">
      <h1 className="text-4xl font-bold capitalize">{title}</h1>

      <div className="flex justify-between">
        <span>{fullname}</span>
        <span>{publishedAt}</span>
      </div>
      <div className="flex justify-center items-center">
        <img src={banner} alt="banner" className="w-full" />
      </div>

      <p className="text-xl font-serif leading-8">{content}</p>
    </div>
  );
}

export default BlogDetails;
