import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 py-10 mt-40">
      <p className="text-7xl font-semibold">404</p>
      <p className="text-3xl font-bold opacity-30">Page Not Found!</p>
      <button className="btn-black" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
    </div>
  );
}

export default PageNotFound;
