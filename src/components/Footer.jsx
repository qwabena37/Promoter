import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-amber-400 mb-2">
            Young Entrepreneurs Hub
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Empowering and showcasing young businessmen and women
            building the future through innovation, leadership,
            and entrepreneurship.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>
              <a href="/home" className="hover:text-amber-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/explore" className="hover:text-amber-400 transition">
                Explore
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-amber-400 transition">
                Contact
              </a>
            </li>
          </ul>
          {/* Admin */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Administration
            </h3>

            <p className="text-slate-400 mb-4">
              Manage entrepreneur profiles, images,
              videos and social media information.
            </p>

            <Link
              to="/admin/login"
              className="inline-block bg-amber-400 text-slate-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-300 transition"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-white mb-3">
            Connect With Us
          </h4>

          <div className="flex gap-5 text-xl text-slate-300">
            <a
              href="https://www.facebook.com/youngentrepreneurshub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:scale-110 transition duration-300"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/youngentrepreneurshub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 hover:scale-110 transition duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@youngentrepreneurshub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition duration-300"
            >
              <FaTiktok />
            </a>

            <a
              href="https://www.youtube.com/@youngentrepreneurshub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 hover:scale-110 transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>
          <h2 className="text-slate-300 text-sm mt-4">
            Design by <span className="text-amber-400">JayTech </span>Solutions💻
          </h2>
        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-4 text-slate-400 text-sm">
        © {new Date().getFullYear()} Young Entrepreneurs Hub. All rights reserved.
      </div>
    </footer>
  );
}