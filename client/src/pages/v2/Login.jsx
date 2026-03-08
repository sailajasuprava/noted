import { PiSpinnerGapBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {
  const { formData, isLoading, handleFormData, handleFormSubmission } =
    useLogin();

  return (
    // Page background is a soft gray, creating clear separation from your gradient navbar
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-gray-50 p-6">
      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#0c3f3f] tracking-tight">
            Noted
          </h1>
        </div>

        <form className="space-y-5" onSubmit={handleFormSubmission}>
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              name="email"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3ecdc4]/30 focus:border-[#3ecdc4] transition-all"
              value={formData.email}
              onChange={handleFormData}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="#"
                className="text-xs text-[#117a7a] hover:underline font-medium"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3ecdc4]/30 focus:border-[#3ecdc4] transition-all"
              value={formData.password}
              onChange={handleFormData}
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0c3f3f] to-[#117a7a] text-white font-bold hover:shadow-lg hover:shadow-[#117a7a]/20 transition-all active:scale-[0.98] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <PiSpinnerGapBold size={24} className="animate-spin mx-auto" />
            ) : (
              "Log in"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400 font-medium">
              OR
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all shadow-sm"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <p className="mt-8 text-center text-sm text-gray-500">
          New here?{" "}
          <Link
            to="/signup"
            className="text-[#117a7a] font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
