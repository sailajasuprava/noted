import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div className=" max-w-3xl mx-auto overflow-hidden pt-12">
      <div className="flex flex-col gap-10 justify-center p-12">
        <h1 className="text-7xl font-bold">
          Tell your <span className="text-teal-400">story</span> to everyone.
        </h1>

        <p className="text-lg text-gray-400 font-semibold">
          A platform designed to help you express your ideas, share experiences,
          and inspire others. Create, read, listen, and engage with stories from
          around the world for a truly personalized reading experience.
        </p>

        <div>
          <Link to="/blogs">
            <button className="btn-black">Get started →</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
