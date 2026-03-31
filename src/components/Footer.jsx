import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold mb-2">Young Entrepreneurs Hub</h3>
          <p className="text-yellow-800 text-sm">
            Empowering and showcasing young businessmen and women building the future.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-yellow-800 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Explore</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex gap-6 text-xl text-yellow-800">
            
            <a href="#" className="hover:text-blue-500 hover:scale-125 transition duration-300">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-pink-500 hover:scale-125 transition duration-300">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-white hover:scale-125 transition duration-300">
              <FaTiktok />
            </a>

            <a href="#" className="hover:text-red-500 hover:scale-125 transition duration-300">
              <FaYoutube />
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-yellow-800 text-center py-4 text-yellow-800 text-sm">
        © {new Date().getFullYear()} Young Entrepreneurs Hub. All rights reserved.
      </div>
    </footer>
  );
}