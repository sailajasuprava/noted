import { CgSpinner } from "react-icons/cg";

function Spinner() {
  return (
    <div className="grid justify-center animate-spin mt-16">
      <CgSpinner size={40} />
    </div>
  );
}

export default Spinner;
