import { PiSpinnerGapBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const { formData, isLoading, handleFormData, handleFormSubmission } =
    useLogin();

  return (
    <div className="max-w-sm sm:max-w-md mx-auto p-8 rounded-md shadow-2xl mt-40">
      <form className="w-full space-y-4" onSubmit={handleFormSubmission}>
        <h1 className="text-3xl font-bold"> Log in to your account</h1>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            id="email"
            name="email"
            required
            className="input"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
            className="input"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>

        <button type="submit" className="btn-violet" disabled={isLoading}>
          {isLoading ? (
            <PiSpinnerGapBold
              size={24}
              fill="white"
              className="animate-spin mx-auto"
            />
          ) : (
            "Log in"
          )}
        </button>
      </form>

      <p className="pt-8 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-violet-400 hover:text-violet-500 hover:border-b"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
