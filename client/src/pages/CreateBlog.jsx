import useCreateBlog from "../hooks/useCreateBlog";

function CreateBlog() {
  const { formData, isLoading, handleFormData, handleFormSubmission } =
    useCreateBlog();

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmission}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            className="input"
            value={formData.title}
            onChange={handleFormData}
          />
          <select
            className="input w-auto"
            required
            name="category"
            value={formData.category}
            onChange={handleFormData}
          >
            <option value="">Select a category</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="finance">Finance</option>
            <option value="business">Business</option>
            <option value="movies">Movies</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="socialmedia">Social Media</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        {/* <div className="flex gap-4 items-center border-4 border-teal-500 border-dotted p-3">
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
        </div> */}

        <textarea
          rows="5"
          name="content"
          placeholder="Write something..."
          required
          className="input resize-none"
          value={formData.content}
          onChange={handleFormData}
        ></textarea>

        <button
          type="submit"
          className="btn-black rounded-none"
          disabled={isLoading}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
