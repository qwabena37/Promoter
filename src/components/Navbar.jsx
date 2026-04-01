import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

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

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Date & Time Bar */}
      <div className="bg-gray-900 text-white text-center py-2 text-sm">
        {dateTime}
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Entrepreneurs Hub</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex font-bold space-x-6 mr-10">
            <a href="/">Home</a>
            <a href="#">Vision</a>
            <a href="#">Explore</a>
            <a href="Footer">Contact</a>
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
            <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Vision</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Explore</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>
    </>
  );
}