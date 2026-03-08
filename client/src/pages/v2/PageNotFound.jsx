import { Link } from "react-router-dom";
import { PiArrowRightBold } from "react-icons/pi";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Section 1: Error Message & Action */}
        <div className="space-y-8 order-2 md:order-1">
          <div className="border-b border-gray-200 pb-10">
            <span className="text-[10px] font-black text-[#3ecdc4] uppercase tracking-[0.3em] mb-4 block">
              Error / Status Code
            </span>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#0c3f3f] leading-[0.8] tracking-tighter uppercase mb-6">
              404 <br />
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0c3f3f] tracking-tight uppercase leading-snug">
              Page Not Found
            </h2>
          </div>

          <p className="text-gray-500 leading-relaxed text-lg max-w-lg">
            The idea you&apos;re looking for might have been archived, deleted,
            or perhaps it was just a faint echo in the digital noise. We
            couldn&apos;t find anything here.
          </p>

          <Link to="/" className="flex items-center gap-4 group mt-6 max-w-sm">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0c3f3f]">
              Return to Home page
            </span>
            <div className="w-10 h-10 border border-[#0c3f3f] flex items-center justify-center group-hover:bg-[#0c3f3f] group-hover:text-white transition-all">
              <PiArrowRightBold />
            </div>
          </Link>
        </div>

        {/* Section 2: Editorial Image Placeholder */}
        <div className="relative group order-1 md:order-2">
          {/* Editorial Image Container */}
          <div className="aspect-[4/5] overflow-hidden border border-gray-200 relative">
            <img
              src="/404.jpg"
              alt="Empty room with light"
              className="w-full h-full object-cover grayscale-0 group-hover:grayscale transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
            />
            {/* Aesthetic Overlay Line */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 pointer-events-none"></div>
          </div>
          {/* Accent block that moves slightly on hover */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#3ecdc4] -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500"></div>
        </div>
      </div>

      {/* Footer Note */}
      {/* <div className="max-w-5xl mx-auto mt-32 pt-8 border-t border-gray-100 flex justify-between items-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          © 2026 Noted. Editorial / Errors
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-[10px] font-black uppercase tracking-widest text-[#0c3f3f] hover:text-[#3ecdc4]"
          >
            System Status
          </a>
          <a
            href="#"
            className="text-[10px] font-black uppercase tracking-widest text-[#0c3f3f] hover:text-[#3ecdc4]"
          >
            Support
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default PageNotFound;
