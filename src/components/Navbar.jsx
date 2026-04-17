import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth");
  };

  return (
    <>
      {/* Top Date & Time Bar */}
      <div className="bg-black text-yellow-800 text-center py-2 text-sm">
        {dateTime}
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Entrepreneurs Hub</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex font-bold space-x-6 mr-10 items-center">
            <Link to="/">Home</Link>
            <Link to="#">Vision</Link>
            <Link to="#">Explore</Link>
            <Link to="#">Contact</Link>

            {!token ? (
              <Link
                to="/auth"
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Login / Signup
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col mt-4 space-y-4 md:hidden">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>Vision</Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>Explore</Link>
            <Link to="#" onClick={() => setMenuOpen(false)}>Contact</Link>

            {!token ? (
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-600 text-white px-4 py-2 rounded text-center"
              >
                Login / Signup
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}