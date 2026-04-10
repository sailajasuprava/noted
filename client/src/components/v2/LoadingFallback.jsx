import { FaPenAlt } from "react-icons/fa";

const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* 1. High-Speed Top Progress Bar */}
      {/* <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#0c3f3f] via-[#3ecdc4] to-[#0c3f3f] animate-loading-bar w-[30%]" />
      </div> */}

      <div className="relative">
        {/* 2. Rotating Geometric Frame */}
        <div className="absolute -inset-6 border border-gray-100 animate-spin-slow" />
        <div className="absolute -inset-6 border-t-2 border-[#3ecdc4] animate-spin" />

        {/* 3. The Brand Mark with Scanning Effect */}
        <div
          className="w-20 h-20 flex items-center justify-center relative overflow-hidden shadow-2xl"
          style={{ background: "linear-gradient(135deg,#3ecdc4,#117a7a)" }}
        >
          <span className="text-4xl font-black text-white uppercase tracking-tighter z-10">
            <FaPenAlt color="black" />
          </span>

          {/* Glowing Scan Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#3ecdc4] shadow-[0_0_15px_#3ecdc4] animate-scan" />

          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#3ecdc4 1px, transparent 1px), linear-gradient(90deg, #3ecdc4 1px, transparent 1px)",
              size: "10px 10px",
            }}
          />
        </div>
      </div>

      {/* 4. Active Status Text */}
      <div className="mt-16 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0c3f3f]">
          Loading...
        </p>
        <div className="flex gap-1.5 justify-center mt-4">
          <span className="w-1.5 h-1.5 bg-[#3ecdc4] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-[#3ecdc4] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-[#3ecdc4] animate-bounce" />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes scan {
          0% {
            top: -5%;
          }
          100% {
            top: 105%;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingFallback;
