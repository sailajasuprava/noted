import { CgSpinner } from "react-icons/cg";

function Spinner() {
  return (
    <div className="grid justify-center mt-40">
      <CgSpinner size={40} className="animate-spin" />
    </div>
  );
}

export default Spinner;
