import { useState } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaGlobe,
  FaHeart,
  FaTimes,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function EntrepreneurModal({
  person,
  onClose,
}) {
  const [lightbox, setLightbox] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  if (!person) return null;

  // =========================================================
  // FAVORITE
  // =========================================================

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

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const profileImage =
    person.profile_image ||
    person.image ||
    "/placeholder.jpg";

  // =========================================================
  // WORK IMAGES
  // =========================================================
  /*
    Django:
    
    class WorkImage(models.Model):
        entrepreneur = models.ForeignKey(
            Entrepreneur,
            related_name="works",
            ...
        )

    Therefore the serializer should return:

    works: [
      {
        id: 1,
        image: "https://..."
      },
      ...
    ]
  */

  const works = Array.isArray(person.works)
    ? person.works
    : [];

  // =========================================================
  // SOCIAL MEDIA
  // =========================================================

  const whatsapp = person.whatsapp || "";
  const instagram = person.instagram || "";
  const facebook = person.facebook || "";
  const tiktok = person.tiktok || "";
  const youtube = person.youtube || "";
  const website = person.website || "";

  // =========================================================
  // WHATSAPP URL
  // =========================================================

  const whatsappNumber = whatsapp.replace(
    /[^0-9]/g,
    ""
  );

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "";

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    // If backend already returns complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Otherwise return the path
    return image;
  };

  return (
    <>
      {/* =====================================================
          MAIN MODAL
      ====================================================== */}

      <div
        className="
          fixed
          inset-0
          bg-black/70
          flex
          justify-center
          items-center
          p-4
          z-50
        "
      >

        <div
          className="
            bg-white
            max-w-4xl
            w-full
            rounded-2xl
            overflow-y-auto
            max-h-[90vh]
            shadow-2xl
          "
        >

          {/* =================================================
              PROFILE HEADER IMAGE
          ================================================== */}

          <div className="relative">

            <img
              src={getImageUrl(profileImage)}
              alt={person.name}
              className="
                w-full
                h-[300px]
                sm:h-[380px]
                object-contain
                bg-slate-100
              "
            />

            {/* IMAGE OVERLAY */}

            <div className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-transparent
              to-transparent
            " />

            {/* CLOSE BUTTON */}

            <button
              onClick={onClose}
              className="
                absolute
                top-4
                right-4
                w-10
                h-10
                rounded-full
                bg-black/60
                text-white
                flex
                items-center
                justify-center
                hover:bg-red-500
                transition
              "
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* FAVORITE */}

            <button
              onClick={handleFavoriteClick}
              className={`
                absolute
                bottom-4
                right-4
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/95
                shadow-lg
                text-xl
                transition
                ${
                  favorite
                    ? "text-red-500"
                    : "text-gray-500"
                }
              `}
              aria-label="Favorite entrepreneur"
            >

              <FaHeart />

              <span className="
                text-sm
                font-semibold
              ">
                {favoriteCount}
              </span>

            </button>

          </div>

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="p-6">

            {/* =================================================
                NAME
            ================================================== */}

            <h2 className="
              text-2xl
              sm:text-3xl
              font-bold
              text-gray-900
              mb-1
            ">
              {person.name}
            </h2>

            {/* TITLE */}

            {person.title && (
              <p className="
                text-amber-600
                font-semibold
                mb-3
              ">
                {person.title}
              </p>
            )}

            {/* LOCATION */}

            {person.location && (
              <div className="
                flex
                items-center
                gap-2
                text-gray-500
                mb-5
              ">

                <FaMapMarkerAlt />

                <span>
                  {person.location}
                </span>

              </div>
            )}

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            {person.description && (
              <div className="mb-7">

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                  mb-3
                ">
                  About
                </h3>

                <p className="
                  text-gray-700
                  leading-relaxed
                ">
                  {person.description}
                </p>

              </div>
            )}

            {/* =================================================
                WORK IMAGES
            ================================================== */}

            {works.length > 0 && (

              <div className="mb-8">

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                  mb-4
                ">
                  Their Work
                </h3>

                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-4
                ">

                  {works
                    .slice(0, 3)
                    .map((work, index) => {

                      const image =
                        typeof work === "string"
                          ? work
                          : work?.image;

                      if (!image) return null;

                      const imageUrl =
                        getImageUrl(image);

                      return (
                        <button
                          key={
                            work?.id ||
                            index
                          }
                          type="button"
                          onClick={() =>
                            setLightbox(
                              imageUrl
                            )
                          }
                          className="
                            group
                            relative
                            w-full
                            aspect-square
                            overflow-hidden
                            rounded-xl
                            bg-gray-100
                          "
                        >

                          <img
                            src={imageUrl}
                            alt={`
                              ${person.name}
                              work ${index + 1}
                            `}
                            className="
                              w-full
                              h-full
                              object-cover
                              transition
                              duration-300
                              group-hover:scale-105
                            "
                          />

                          {/* IMAGE OVERLAY */}

                          <div className="
                            absolute
                            inset-0
                            bg-black/0
                            group-hover:bg-black/20
                            transition
                          " />

                        </button>
                      );
                    })}

                </div>

              </div>

            )}

            {/* =================================================
                VIDEO
            ================================================== */}

            {person.video && (

              <div className="mb-8">

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                  mb-4
                ">
                  Featured Video
                </h3>

                <div className="
                  relative
                  w-full
                  aspect-video
                  rounded-xl
                  overflow-hidden
                  shadow-lg
                  bg-black
                ">

                  <iframe
                    className="
                      w-full
                      h-full
                    "
                    src={person.video}
                    title={`${person.name} video`}
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                      web-share
                    "
                    allowFullScreen
                  />

                </div>

              </div>

            )}

            {/* =================================================
                SOCIAL MEDIA
            ================================================== */}

            {(whatsapp ||
              instagram ||
              facebook ||
              tiktok ||
              youtube ||
              website) && (

              <div className="
                border-t
                border-gray-200
                pt-6
              ">

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                  mb-4
                ">
                  Connect With {person.name}
                </h3>

                {/* WHATSAPP BUTTON */}

                {whatsappUrl && (

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      justify-center
                      gap-3
                      w-full
                      mb-5
                      bg-green-500
                      hover:bg-green-600
                      text-white
                      py-3
                      px-5
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >

                    <FaWhatsapp
                      className="text-xl"
                    />

                    Contact Business
                    on WhatsApp

                  </a>

                )}

                {/* SOCIAL ICONS */}

                <div className="
                  flex
                  flex-wrap
                  items-center
                  gap-4
                ">

                  {/* INSTAGRAM */}

                  {instagram && (

                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        text-xl
                        hover:bg-pink-100
                        hover:text-pink-500
                        hover:scale-110
                        transition
                      "
                    >
                      <FaInstagram />
                    </a>

                  )}

                  {/* FACEBOOK */}

                  {facebook && (

                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        text-xl
                        hover:bg-blue-100
                        hover:text-blue-600
                        hover:scale-110
                        transition
                      "
                    >
                      <FaFacebook />
                    </a>

                  )}

                  {/* TIKTOK */}

                  {tiktok && (

                    <a
                      href={tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        text-xl
                        hover:bg-gray-200
                        hover:text-black
                        hover:scale-110
                        transition
                      "
                    >
                      <FaTiktok />
                    </a>

                  )}

                  {/* YOUTUBE */}

                  {youtube && (

                    <a
                      href={youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        text-xl
                        hover:bg-red-100
                        hover:text-red-600
                        hover:scale-110
                        transition
                      "
                    >
                      <FaYoutube />
                    </a>

                  )}

                  {/* WEBSITE */}

                  {website && (

                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-600
                        text-xl
                        hover:bg-green-100
                        hover:text-green-600
                        hover:scale-110
                        transition
                      "
                    >
                      <FaGlobe />
                    </a>

                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

      {lightbox && (

        <div
          onClick={() =>
            setLightbox(null)
          }
          className="
            fixed
            inset-0
            bg-black/90
            flex
            items-center
            justify-center
            z-[60]
            p-4
            cursor-pointer
          "
        >

          <button
            onClick={() =>
              setLightbox(null)
            }
            className="
              absolute
              top-5
              right-5
              w-10
              h-10
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-red-500
              transition
            "
            aria-label="Close image"
          >
            <FaTimes />
          </button>

          <img
            src={lightbox}
            alt="Enlarged work"
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              max-h-[90vh]
              max-w-[95vw]
              rounded-lg
              object-contain
              shadow-2xl
            "
          />

        </div>

      )}

    </>
  );
}