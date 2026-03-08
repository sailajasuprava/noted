import {
  PiArrowRightBold,
  PiQuotesFill,
  PiTargetBold,
  PiUsersThreeBold,
} from "react-icons/pi";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section 1: Hero Header */}
        <div className="border-b border-gray-200 pb-12 mb-16">
          <span className="text-[10px] font-black text-[#3ecdc4] uppercase tracking-[0.3em] mb-4 block">
            Our Story / 01
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0c3f3f] leading-[0.9] tracking-tighter uppercase">
            Noted Is For <br />
            <span className="text-gray-300">The Modern Mind.</span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 max-w-2xl leading-relaxed">
            We built a space where ideas aren&apos;t just stored—they are
            celebrated. A minimalist ecosystem designed for thinkers, writers,
            and visionaries.
          </p>
        </div>

        {/* Section 2: Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 mb-20">
          <div className="p-10 border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors">
            <PiTargetBold size={32} className="text-[#0c3f3f] mb-6" />
            <h3 className="text-xs font-black uppercase tracking-widest mb-4">
              The Mission
            </h3>
            <p className="text-sm text-gray-500 leading-loose">
              To strip away the noise of the modern web and provide a
              high-contrast canvas for meaningful long-form content.
            </p>
          </div>
          <div className="p-10 border-b md:border-b-0 md:border-r border-gray-200 group hover:bg-gray-50 transition-colors">
            <PiUsersThreeBold size={32} className="text-[#0c3f3f] mb-6" />
            <h3 className="text-xs font-black uppercase tracking-widest mb-4">
              The Community
            </h3>
            <p className="text-sm text-gray-500 leading-loose">
              A diverse collective of creators sharing insights across
              technology, art, and lifestyle without the distraction of
              algorithms.
            </p>
          </div>
          <div className="p-10 group hover:bg-gray-50 transition-colors">
            <PiQuotesFill size={32} className="text-[#3ecdc4] mb-6" />
            <h3 className="text-xs font-black uppercase tracking-widest mb-4">
              The Philosophy
            </h3>
            <p className="text-sm text-gray-500 leading-loose">
              We believe in &quot;Noted over Noticed.&quot; Quality of thought
              should always outshine the quantity of engagement.
            </p>
          </div>
        </div>

        {/* Section 3: Statement & Action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Editorial Image Container */}
            <div className="aspect-[4/5] overflow-hidden border border-gray-200 relative">
              <img
                src="/about.avif"
                alt="Editorial workspace"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
              />
              {/* Aesthetic Overlay Line */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 pointer-events-none"></div>
            </div>
            {/* Accent block that moves slightly on hover */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#3ecdc4] -z-10 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-500"></div>
          </div>

          <div className="space-y-6">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
              Join Us / 02
            </span>
            <h2 className="text-3xl font-bold text-[#0c3f3f] uppercase tracking-tight leading-none">
              Start your own <br /> digital journal.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Whether you&apos;re a professional developer documenting your
              journey or a storyteller painting with words, Noted. provides the
              tools and the audience to make your mark.
            </p>
            <button className="flex items-center gap-4 group mt-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0c3f3f]">
                Get Started Now
              </span>
              <div className="w-10 h-10 border border-[#0c3f3f] flex items-center justify-center group-hover:bg-[#0c3f3f] group-hover:text-white transition-all">
                <PiArrowRightBold />
              </div>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        {/* <div className="mt-32 pt-8 border-t border-gray-100 flex justify-between items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © 2026 Noted. Editorial
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-[#0c3f3f] hover:text-[#3ecdc4]"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-[#0c3f3f] hover:text-[#3ecdc4]"
            >
              Instagram
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
