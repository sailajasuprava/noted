import { useBlog } from "../../context/BlogContext";
import useCreateBlog from "../../hooks/useCreateBlog";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PiSparkleFill,
  PiSpinnerGapBold,
  PiUploadSimpleBold,
} from "react-icons/pi";

function CreateBlog() {
  const {
    formData,
    isLoading,
    isGenerating,
    handleGenerateSummary,
    handleFormData,
    handleFormSubmission,
    handleImageChange,
  } = useCreateBlog();

  const { categories } = useBlog();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl shadow-teal-900/5 border border-gray-100 p-8 md:p-12">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-black text-[#0c3f3f] tracking-tight">
            Create a post
          </h1>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleFormSubmission}>
          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Post Title
              </label>
              <input
                type="text"
                placeholder="Enter a catchy title..."
                name="title"
                required
                className="w-full bg-gray-50 border border-gray-200 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3ecdc4]/30 focus:border-[#3ecdc4] transition-all text-lg font-semibold placeholder:font-normal"
                value={formData.title}
                onChange={handleFormData}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Category
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-200 px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3ecdc4]/30 focus:border-[#3ecdc4] transition-all appearance-none cursor-pointer"
                required
                name="category"
                value={formData.category}
                onChange={handleFormData}
              >
                <option value="">Select category</option>
                {categories.map((item, i) => (
                  <option key={i} value={item._id} className="capitalize">
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Enhanced File Upload */}
          <div className="space-y-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Cover Image
            </label>
            <div className="relative group">
              <input
                type="file"
                required
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="border-2 border-dashed border-gray-200 group-hover:border-[#3ecdc4] p-8 transition-all flex flex-col items-center justify-center bg-gray-50 group-hover:bg-[#3ecdc4]/5">
                <div className="p-4 bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <PiUploadSimpleBold size={24} className="text-[#117a7a]" />
                </div>
                <p className="text-sm font-bold text-[#0c3f3f]">
                  Click to upload banner
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG or WebP (Max 5MB)
                </p>
              </div>
            </div>

            {formData?.banner && (
              <div className="relative mt-4 overflow-hidden shadow-lg aspect-video border-4 border-white">
                <img
                  src={formData.banner}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Editor Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Content
            </label>
            <div className="bg-white border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#3ecdc4]/30 transition-all">
              <ReactQuill
                theme="snow"
                modules={modules}
                value={formData.content}
                onChange={(value) =>
                  handleFormData({ target: { name: "content", value } })
                }
                placeholder="Tell your story..."
                className="create-blog-editor h-80 mb-12"
              />
            </div>
          </div>

          {/* AI Summary Section */}
          <div className="space-y-3 bg-gray-50 p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Post Summary
              </label>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#3ecdc4]/30 text-[#117a7a] text-xs font-bold hover:bg-[#3ecdc4] hover:text-[#0c3f3f] transition-all shadow-sm disabled:opacity-50 disabled:grayscale"
                disabled={
                  formData.content?.replace(/<[^>]*>/g, "").length < 400 ||
                  isGenerating
                }
                onClick={() => handleGenerateSummary(formData.content)}
              >
                {isGenerating ? (
                  <PiSpinnerGapBold className="animate-spin" size={16} />
                ) : (
                  <PiSparkleFill size={16} />
                )}
                {isGenerating ? "Analyzing Content..." : "Generate with AI"}
              </button>
            </div>
            <textarea
              rows="3"
              name="summary"
              placeholder="A brief overview of your post..."
              required
              className="w-full bg-white border border-gray-200 px-5 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3ecdc4]/30 focus:border-[#3ecdc4] transition-all resize-none"
              value={formData.summary}
              onChange={handleFormData}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0c3f3f] to-[#117a7a] text-white font-bold hover:shadow-lg hover:shadow-[#117a7a]/20 transition-all active:scale-[0.98] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <PiSpinnerGapBold size={24} className="animate-spin" />
            ) : (
              "Publish Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
