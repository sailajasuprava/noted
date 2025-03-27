import { Link } from "react-router-dom";
import { FaPenAlt } from "react-icons/fa";

function Logo() {
  return (
    <Link to="/">
      <div className="font-bold uppercase text-2xl xs:text-3xl flex gap-1">
        Noted.
        <span>
          <FaPenAlt />
        </span>
      </div>
    </Link>
  );
}

export default Logo;
