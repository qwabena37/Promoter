import { useState } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaGlobe,
  FaHeart,
} from "react-icons/fa";

export default function EntrepreneurModal({
  person,
  onClose,
}) {
  const [lightbox, setLightbox] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  if (!person) return null;

  const handleFavoriteClick = () => {
    if (!favorite) {
      setFavoriteCount((count) => count + 1);
    } else {
      setFavoriteCount((count) =>
        count > 0 ? count - 1 : 0
      );
    }

    setFavorite(!favorite);
  };

  const gallery = person.gallery || [];

  const socials = person.socials || {};

  return (
    <>
      {/* MAIN MODAL */}

      <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">

        <div className="bg-white max-w-4xl w-full rounded-xl overflow-y-auto max-h-[90vh] p-6">

          {/* TOP BAR */}

          <div className="flex justify-between items-center mb-4">

            <button
              onClick={onClose}
              className="text-red-500 hover:underline"
            >
              Close
            </button>

            <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-2 text-2xl transition ${
                favorite
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              <FaHeart />

              <span className="text-base font-semibold">
                {favoriteCount}
              </span>
            </button>

          </div>

          {/* NAME */}

          <h2 className="text-2xl font-bold mb-1">
            {person.name}
          </h2>

          {person.title && (
            <p className="text-gray-500 mb-4">
              {person.title}
            </p>
          )}

          {/* PROFILE IMAGE */}

          <img
            src={person.image || person.profile_image}
            alt={person.name}
            className="w-full h-70 object-cover rounded-lg mb-4"
          />

          {/* LOCATION */}

          {person.location && (
            <p className="text-gray-500 mb-4">
              📍 {person.location}
            </p>
          )}

          {/* DESCRIPTION */}

          <p className="mb-6 text-gray-700 leading-relaxed">
            {person.description}
          </p>

          {/* GALLERY */}

          {gallery.length > 0 && (
            <>
              <h3 className="text-xl font-bold mb-3">
                Their Work
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

                {gallery.map((img, index) => (
                  <div
                    key={index}
                    className="w-full aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={img}
                      alt={`${person.name} work ${
                        index + 1
                      }`}
                      onClick={() =>
                        setLightbox(img)
                      }
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition"
                    />
                  </div>
                ))}

              </div>
            </>
          )}

          {/* VIDEO */}

          {person.video && (
            <div className="w-full mb-6">

              <h3 className="text-xl font-bold mb-3">
                Featured Video
              </h3>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">

                <iframe
                  className="w-full h-full"
                  src={person.video}
                  title={`${person.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>

            </div>
          )}

          {/* WHATSAPP */}

          {socials.whatsapp && (
            <a
              href={`https://wa.me/${socials.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              Contact Business on WhatsApp
            </a>
          )}

          {/* SOCIAL ICONS */}

          <div className="flex flex-wrap gap-6 text-2xl text-gray-600">

            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 hover:scale-125 transition"
              >
                <FaInstagram />
              </a>
            )}

            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 hover:scale-125 transition"
              >
                <FaFacebook />
              </a>
            )}

            {socials.tiktok && (
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black hover:scale-125 transition"
              >
                <FaTiktok />
              </a>
            )}

            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 hover:scale-125 transition"
              >
                <FaYoutube />
              </a>
            )}

            {socials.website && (
              <a
                href={socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600 hover:scale-125 transition"
              >
                <FaGlobe />
              </a>
            )}

          </div>

        </div>

      </div>

      {/* LIGHTBOX */}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 cursor-pointer"
        >
          <img
            src={lightbox}
            alt="Enlarged work"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}

    </>
  );
}