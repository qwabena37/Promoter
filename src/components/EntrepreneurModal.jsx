import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaGlobe,
  FaWhatsapp,
  FaHeart,
} from "react-icons/fa";

export default function EntrepreneurModal({ person, onClose }) {
  const [lightbox, setLightbox] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0); // New state

  if (!person) return null;

  const handleFavoriteClick = () => {
    if (!favorite) {
      setFavoriteCount(favoriteCount + 1); // Increment only when favoriting
    } else {
      setFavoriteCount(favoriteCount > 0 ? favoriteCount - 1 : 0); // Optional: allow un-favoriting
    }
    setFavorite(!favorite);
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
        <div className="bg-white max-w-4xl w-full rounded-xl overflow-y-auto max-h-[90vh] p-6">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={onClose} className="text-red-500 hover:underline">
              Close
            </button>

            {/* Favorite */}
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-2 text-2xl transition ${
                favorite ? "text-red-500" : "text-gray-400"
              }`}
            >
              <FaHeart />
              <span className="text-base font-semibold">{favoriteCount}</span>
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">{person.name}</h2>

          <img
            src={person.image}
            className="w-full h-70 object-cover rounded-lg mb-4"
          />

          <p className="mb-6 text-gray-700">{person.description}</p>

          {/* Gallery */}
<div className="grid grid-cols-3 gap-2 mb-6">
  {person.gallery.map((img, i) => (
    <div key={i} className="w-full aspect-square overflow-hidden rounded-lg">
      <img
        src={img}
        onClick={() => setLightbox(img)}
        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition"
      />
    </div>
  ))}
</div>

{/* Video */}
<div className="w-full mb-6">
  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
    <iframe
      className="w-full h-full"
      src={person.video} // make sure NO ?autoplay=1 in the URL
      title="Entrepreneur video"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${person.socials.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-6 text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Contact Business on WhatsApp
          </a>

          {/* Social Icons */}
          <div className="flex gap-6 text-2xl text-gray-600">
            <a href={person.socials.instagram} target="_blank" className="hover:text-pink-500 hover:scale-125 transition">
              <FaInstagram />
            </a>
            <a href={person.socials.facebook} target="_blank" className="hover:text-blue-600 hover:scale-125 transition">
              <FaFacebook />
            </a>
            <a href={person.socials.tiktok} target="_blank" className="hover:text-black hover:scale-125 transition">
              <FaTiktok />
            </a>
            <a href={person.socials.youtube} target="_blank" className="hover:text-red-600 hover:scale-125 transition">
              <FaYoutube />
            </a>
            <a href={person.socials.website} target="_blank" className="hover:text-green-600 hover:scale-125 transition">
              <FaGlobe />
            </a>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]"
        >
          <img
            src={lightbox}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />
        </div>
      )}
    </>
  );
}