import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const whatsappNumber = "233279410426";

  const whatsappMessage =
    "Hello Young Entrepreneurs Hub, I would like to join the page.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold inline-block"
            >
              Young{" "}
              <span className="text-amber-400">
                Entrepreneurs
              </span>{" "}
              Hub
            </Link>

            <p className="text-slate-400 mt-5 leading-relaxed">
              Discover, celebrate, and promote young entrepreneurs
              who are building businesses, creating opportunities,
              and making an impact in their communities.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-5 mt-6">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-400 hover:text-blue-500 hover:scale-110 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 hover:text-pink-500 hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-slate-400 hover:text-white hover:scale-110 transition"
              >
                <FaTiktok />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-slate-400 hover:text-red-500 hover:scale-110 transition"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/vision"
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Our Vision
                </Link>
              </li>

              <li>
                <Link
                  to="/explore"
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Explore Entrepreneurs
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-amber-400 transition"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* For Entrepreneurs */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              For Entrepreneurs
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                Discover opportunities
              </li>

              <li>
                Promote your business
              </li>

              <li>
                Connect with other entrepreneurs
              </li>

              <li>
                Showcase your work
              </li>

            </ul>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 py-3 rounded-lg font-semibold transition"
            >
              <FaWhatsapp />
              Join the Hub
            </a>
          </div>

          {/* Admin */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Administration
            </h3>

            <p className="text-slate-400 leading-relaxed mb-5">
              Manage entrepreneur profiles, business information,
              images, videos, and social media links.
            </p>

            <Link
              to="/admin/login"
              className="inline-block border border-slate-700 hover:border-amber-400 hover:text-amber-400 text-slate-300 px-5 py-3 rounded-lg transition"
            >
              Admin Dashboard
            </Link>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-slate-500 text-center md:text-left">
            © {currentYear} Young Entrepreneurs Hub. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Designed by{" "}
            <span className="text-amber-400 font-semibold">
              JayTech Solutions
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
}