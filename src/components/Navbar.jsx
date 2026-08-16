import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleString("en-GH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDateTime(formatted);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // WhatsApp number
  const whatsappNumber = "233279410426";

  const whatsappMessage =
    "Hello Young Entrepreneurs Hub, I would like to join the page.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      {/* =====================================================
          TOP DATE & TIME BAR
      ====================================================== */}
      <div className="bg-slate-900 text-slate-200 text-center py-2 px-4 text-sm">
        {dateTime}
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* =================================================
              LOGO
          ================================================== */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl md:text-2xl font-bold text-slate-900"
          >
            Young{" "}
            <span className="text-amber-400">
              Entrepreneurs
            </span>{" "}
            Hub
          </Link>

          {/* =================================================
              DESKTOP MENU
          ================================================== */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium">

            {/* Home */}
            <Link
              to="/"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Home
            </Link>

            {/* Vision */}
            <Link
              to="/vision"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Vision
            </Link>

            {/* Explore */}
            <Link
              to="/explore"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Explore
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Contact
            </Link>

            {/* =================================================
                ADMIN DASHBOARD
            ================================================== */}
            <Link
              to="/admin/login"
              className="
                flex
                items-center
                gap-2
                border
                border-slate-300
                text-slate-700
                px-4
                py-2
                rounded-lg
                hover:border-slate-900
                hover:bg-slate-900
                hover:text-white
                transition
                duration-300
              "
            >
              <FaUserShield className="text-sm" />

              <span>
                Admin
              </span>
            </Link>

            {/* =================================================
                JOIN BUTTON
            ================================================== */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-amber-400
                hover:bg-amber-500
                text-slate-900
                px-5
                py-2
                rounded-lg
                font-semibold
                transition
                duration-300
              "
            >
              Join
            </a>

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <button
            className={`
              md:hidden
              relative
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-slate-300/70
              bg-slate-100/70
              backdrop-blur-md
              text-slate-800
              shadow-sm
              transition-all
              duration-300
              hover:bg-slate-200/80
              hover:shadow-md
              active:scale-95
            `}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="transition-all duration-300">
              {menuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </span>
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${
              menuOpen
                ? "max-h-[650px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <div
            className="
              mx-4
              mb-4
              rounded-2xl
              border
              border-slate-200/70
              bg-white/90
              backdrop-blur-xl
              shadow-xl
              overflow-hidden
            "
          >

            <div className="flex flex-col px-6 py-5 space-y-2">

              {/* =================================================
                  HOME
              ================================================== */}
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Home
              </Link>

              {/* =================================================
                  VISION
              ================================================== */}
              <Link
                to="/vision"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Vision
              </Link>

              {/* =================================================
                  EXPLORE
              ================================================== */}
              <Link
                to="/explore"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Explore
              </Link>

              {/* =================================================
                  CONTACT
              ================================================== */}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Contact
              </Link>

              {/* =================================================
                  ADMIN DASHBOARD
              ================================================== */}
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-slate-300
                  text-slate-700
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-900
                  hover:text-white
                  hover:border-slate-900
                  transition
                  duration-300
                "
              >
                <FaUserShield />

                <span>
                  Admin Dashboard
                </span>
              </Link>

              {/* =================================================
                  MOBILE JOIN BUTTON
              ================================================== */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="
                  mt-2
                  bg-amber-400
                  hover:bg-amber-500
                  text-slate-900
                  px-4
                  py-3
                  rounded-xl
                  text-center
                  font-semibold
                  shadow-sm
                  hover:shadow-md
                  transition
                  duration-300
                "
              >
                Join
              </a>

            </div>
          </div>
        </div>

      </nav>
    </>
  );
}