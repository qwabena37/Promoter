
import { useEffect, useState } from "react";
import api from "../services/api";

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

  // =========================================================
  // LIKE STATES
  // =========================================================

  const [favorite, setFavorite] = useState(false);

  const [favoriteCount, setFavoriteCount] = useState(
    person?.likes_count || 0
  );

  const [liking, setLiking] = useState(false);

  // =========================================================
  // GET / CREATE VISITOR ID
  // =========================================================

  const getVisitorId = () => {
    let visitorId = localStorage.getItem(
      "entrepreneur_visitor_id"
    );

    if (!visitorId) {
      visitorId = crypto.randomUUID();

      localStorage.setItem(
        "entrepreneur_visitor_id",
        visitorId
      );
    }

    return visitorId;
  };

  // =========================================================
  // LOAD LIKE INFORMATION
  // =========================================================

  useEffect(() => {
    if (!person?.id) return;

    const loadLikeInformation = async () => {
      try {
        const visitorId = getVisitorId();

        /*
         * Load the latest entrepreneur information.
         * This ensures that the displayed count is coming
         * from the backend/database.
         */

        const response = await api.get(
          `/entrepreneurs/${person.id}/`
        );

        const likes =
          response.data?.likes_count ??
          person.likes_count ??
          0;

        setFavoriteCount(likes);

        /*
         * If your backend serializer eventually returns
         * liked_by_me, we will use it.
         */

        if (
          typeof response.data?.liked_by_me ===
          "boolean"
        ) {
          setFavorite(
            response.data.liked_by_me
          );
        } else {
          /*
           * Temporary browser-side fallback.
           *
           * This allows the UI to remember that this browser
           * has already liked the entrepreneur even if the
           * GET endpoint does not yet return liked_by_me.
           */

          const likedProfiles =
            JSON.parse(
              localStorage.getItem(
                "liked_entrepreneurs"
              ) || "[]"
            );

          setFavorite(
            likedProfiles.includes(
              String(person.id)
            )
          );
        }

        // Keep visitorId initialized
        if (!visitorId) {
          getVisitorId();
        }

      } catch (error) {
        console.error(
          "Failed to load like information:",
          error
        );

        /*
         * Fall back to the data already received
         * from the entrepreneurs endpoint.
         */

        setFavoriteCount(
          person.likes_count || 0
        );
      }
    };

    loadLikeInformation();
  }, [person?.id]);

  // =========================================================
  // LIKE / UNLIKE
  // =========================================================

  const handleFavoriteClick = async () => {
    if (!person?.id || liking) return;

    try {
      setLiking(true);

      const visitorId = getVisitorId();

      // =====================================================
      // LIKE
      // =====================================================

      if (!favorite) {
        const response = await api.post(
          `/entrepreneurs/${person.id}/like/`,
          {
            visitor_id: visitorId,
          }
        );

        setFavorite(true);

        setFavoriteCount(
          response.data?.likes_count ??
          favoriteCount + 1
        );

        /*
         * Remember liked entrepreneur locally.
         */

        const likedProfiles =
          JSON.parse(
            localStorage.getItem(
              "liked_entrepreneurs"
            ) || "[]"
          );

        if (
          !likedProfiles.includes(
            String(person.id)
          )
        ) {
          likedProfiles.push(
            String(person.id)
          );
        }

        localStorage.setItem(
          "liked_entrepreneurs",
          JSON.stringify(likedProfiles)
        );
      }

      // =====================================================
      // UNLIKE
      // =====================================================

      else {
        const response = await api.delete(
          `/entrepreneurs/${person.id}/like/`,
          {
            params: {
              visitor_id: visitorId,
            },
          }
        );

        setFavorite(false);

        setFavoriteCount(
          response.data?.likes_count ??
          Math.max(
            favoriteCount - 1,
            0
          )
        );

        /*
         * Remove entrepreneur from local liked list.
         */

        const likedProfiles =
          JSON.parse(
            localStorage.getItem(
              "liked_entrepreneurs"
            ) || "[]"
          );

        const updatedProfiles =
          likedProfiles.filter(
            (id) =>
              id !== String(person.id)
          );

        localStorage.setItem(
          "liked_entrepreneurs",
          JSON.stringify(
            updatedProfiles
          )
        );
      }

    } catch (error) {
      console.error(
        "Failed to update entrepreneur like:",
        error
      );

      console.error(
        "Like API response:",
        error.response?.data
      );
    } finally {
      setLiking(false);
    }
  };

  // =========================================================
  // CLOSE / RESET
  // =========================================================

  if (!person) return null;

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

  const works = Array.isArray(person.works)
    ? person.works
    : [];

  // =========================================================
  // SOCIAL MEDIA
  // =========================================================

  const socials = person.socials || {};

  /*
   * Support both:
   *
   * person.socials.instagram
   *
   * and older:
   *
   * person.instagram
   */

  const whatsapp =
    socials.whatsapp ||
    person.whatsapp ||
    "";

  const instagram =
    socials.instagram ||
    person.instagram ||
    "";

  const facebook =
    socials.facebook ||
    person.facebook ||
    "";

  const tiktok =
    socials.tiktok ||
    person.tiktok ||
    "";

  const youtube =
    socials.youtube ||
    person.youtube ||
    "";

  const website =
    socials.website ||
    person.website ||
    "";

  // =========================================================
  // WHATSAPP URL
  // =========================================================

  const whatsappNumber =
    whatsapp.replace(
      /[^0-9]/g,
      ""
    );

  const whatsappUrl =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : "";

  // =========================================================
  // IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return image;
  };

  // =========================================================
  // MODAL
  // =========================================================

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
          backdrop-blur-sm
          flex
          justify-center
          items-center
          p-4
          z-50
        "
        onClick={onClose}
      >

        <div
          className="
            bg-white
            max-w-4xl
            w-full
            rounded-3xl
            overflow-hidden
            max-h-[90vh]
            shadow-2xl
            border
            border-white/20
          "
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* =================================================
              PROFILE HEADER IMAGE
          ================================================== */}

          <div className="relative">

            <img
              src={getImageUrl(profileImage)}
              alt={
                person.name ||
                "Entrepreneur"
              }
              className="
                w-full
                h-[300px]
                sm:h-[380px]
                object-contain
                bg-slate-100
              "
            />

            {/* IMAGE OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                via-black/10
                to-transparent
                pointer-events-none
              "
            />

            {/* =================================================
                CLOSE BUTTON
            ================================================== */}

            <button
              onClick={onClose}
              className="
                absolute
                top-4
                right-4
                w-11
                h-11
                rounded-full
                bg-black/60
                backdrop-blur-sm
                text-white
                flex
                items-center
                justify-center
                hover:bg-red-500
                hover:scale-105
                transition
                z-20
              "
              aria-label="Close profile"
            >
              <FaTimes />
            </button>

            {/* =================================================
                LIKE BUTTON
            ================================================== */}

            <button
              onClick={handleFavoriteClick}
              disabled={liking}
              className={`
                absolute
                bottom-5
                right-5
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-full
                bg-white/95
                backdrop-blur-sm
                shadow-xl
                transition-all
                duration-300
                z-20
                ${
                  favorite
                    ? "text-red-500"
                    : "text-slate-600"
                }
                ${
                  liking
                    ? "opacity-70 cursor-wait"
                    : "hover:scale-105"
                }
              `}
              aria-label={
                favorite
                  ? "Unlike entrepreneur"
                  : "Like entrepreneur"
              }
            >

              <FaHeart
                className={`
                  text-xl
                  transition-transform
                  duration-300
                  ${
                    favorite
                      ? "fill-current scale-110"
                      : ""
                  }
                `}
              />

              <span className="text-sm font-bold">
                {favoriteCount}
              </span>

              <span className="text-xs font-medium">
                {favoriteCount === 1
                  ? "Like"
                  : "Likes"}
              </span>

            </button>

          </div>

          {/* =================================================
              CONTENT
          ================================================== */}

          <div
            className="
              p-6
              sm:p-8
              overflow-y-auto
              max-h-[calc(90vh-300px)]
            "
          >

            {/* =================================================
                NAME
            ================================================== */}

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-gray-900
                mb-1
              "
            >
              {person.name}
            </h2>

            {/* =================================================
                TITLE
            ================================================== */}

            {person.title && (
              <p
                className="
                  text-amber-600
                  font-semibold
                  mb-3
                "
              >
                {person.title}
              </p>
            )}

            {/* =================================================
                LIKE SUMMARY
            ================================================== */}

            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <div
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  ${
                    favorite
                      ? "bg-red-50 text-red-500"
                      : "bg-slate-100 text-slate-600"
                  }
                  transition
                `}
              >

                <FaHeart
                  className={
                    favorite
                      ? "fill-current"
                      : ""
                  }
                />

                <span className="font-bold">
                  {favoriteCount}
                </span>

                <span className="text-sm">
                  {favoriteCount === 1
                    ? "person likes this"
                    : "people like this"}
                </span>

              </div>

            </div>

            {/* =================================================
                LOCATION
            ================================================== */}

            {person.location && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-gray-500
                  mb-6
                "
              >

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
              <div className="mb-8">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    mb-3
                  "
                >
                  About
                </h3>

                <p
                  className="
                    text-gray-700
                    leading-relaxed
                  "
                >
                  {person.description}
                </p>

              </div>
            )}

            {/* =================================================
                WORK IMAGES
            ================================================== */}

            {works.length > 0 && (

              <div className="mb-8">

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    mb-4
                  "
                >
                  Their Work
                </h3>

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-4
                  "
                >

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
                            shadow-sm
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

                          <div
                            className="
                              absolute
                              inset-0
                              bg-black/0
                              group-hover:bg-black/20
                              transition
                            "
                          />

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

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    mb-4
                  "
                >
                  Featured Video
                </h3>

                <div
                  className="
                    relative
                    w-full
                    aspect-video
                    rounded-xl
                    overflow-hidden
                    shadow-lg
                    bg-black
                  "
                >

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

              <div
                className="
                  border-t
                  border-gray-200
                  pt-6
                "
              >

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    mb-4
                  "
                >
                  Connect With {person.name}
                </h3>

                {/* =================================================
                    WHATSAPP
                ================================================== */}

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
                      shadow-sm
                      hover:shadow-lg
                    "
                  >

                    <FaWhatsapp
                      className="text-xl"
                    />

                    Contact Business
                    on WhatsApp

                  </a>
                )}

                {/* =================================================
                    SOCIAL ICONS
                ================================================== */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-4
                  "
                >

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
            onClick={(event) =>
              event.stopPropagation()
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
