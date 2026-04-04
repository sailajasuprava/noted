import { FaPenAlt } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold italic text-teal-500 mb-6">
            <span className="bg-teal-500 text-white px-1.5 py-2 rounded">
              {" "}
              <FaPenAlt />
            </span>{" "}
            Noted
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            A platform designed to help you express your ideas, share
            experiences, and inspire others.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-slate-800">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="hover:text-teal-600 transition">About Us</a>
            </li>
            <li>
              <a className="hover:text-teal-600 transition">Careers</a>
            </li>
            <li>
              <a className="hover:text-teal-600 transition">Blog</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-slate-800">Support</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <a className="hover:text-teal-600 transition">Help Center</a>
            </li>
            <li>
              <a className="hover:text-teal-600 transition">FAQ</a>
            </li>
            <li>
              <a className="hover:text-teal-600 transition">Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-slate-800">Stay Connected</h4>

          <div className="flex gap-5 items-center">
            <FaFacebook className="w-6 h-6 text-[#1877F2] hover:scale-110 transition cursor-pointer" />
            <FaTwitter className="w-6 h-6 text-[#1DA1F2] hover:scale-110 transition cursor-pointer" />
            <FaLinkedin className="w-6 h-6 text-[#0A66C2] hover:scale-110 transition cursor-pointer" />
            <FaInstagram className="w-6 h-6 text-[#E1306C] hover:scale-110 transition cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between text-slate-400 text-xs">
        <p>© 2025 Peterdraw. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-slate-600">Privacy Policy</a>
          <a className="hover:text-slate-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
