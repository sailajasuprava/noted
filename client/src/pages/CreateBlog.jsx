import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            name="fullname"
            required
            className="input"
          />
          <select className="input w-auto">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        <div className="flex gap-4 items-center border-4 border-teal-500 border-dotted p-3">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gray-300 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <span className="text-gray-600">No file chosen</span>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />

        <button type="submit" className="btn-black rounded-none">
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
