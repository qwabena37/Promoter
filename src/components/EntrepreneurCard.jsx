
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../services/api";

export default function EntrepreneurCard({ person, onClick }) {
  const socials = person?.socials || {};

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const profileImage =
    person?.image ||
    person?.profile_image ||
    null;

  // =========================================================
  // GALLERY
  // =========================================================

  const gallery = Array.isArray(person?.gallery)
    ? person.gallery.filter(Boolean)
    : [];

  // =========================================================
  // LIKE STATES
  // =========================================================

  const [liked, setLiked] = useState(false);

  const [likesCount, setLikesCount] = useState(
    Number(person?.likes_count || 0)
  );

  const [liking, setLiking] = useState(false);

  // =========================================================
  // CREATE / GET VISITOR ID
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
  // CHECK WHETHER THIS VISITOR ALREADY LIKED
  // =========================================================

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!person?.id) return;

      try {
        const visitorId = getVisitorId();

        /*
         * If your backend has a status endpoint,
         * this can be replaced with that endpoint.
         *
         * For now we use localStorage to remember
         * the visitor's liked profiles.
         */

        const storedLikes = JSON.parse(
          localStorage.getItem(
            "liked_entrepreneurs"
          ) || "[]"
        );

        setLiked(
          storedLikes.includes(
            String(person.id)
          )
        );
      } catch (error) {
        console.error(
          "Failed to check like status:",
          error
        );
      }
    };

    checkLikeStatus();
  }, [person?.id]);

  // =========================================================
  // SAVE LOCAL LIKE STATUS
  // =========================================================

  const saveLikeStatus = (isLiked) => {
    try {
      const storedLikes = JSON.parse(
        localStorage.getItem(
          "liked_entrepreneurs"
        ) || "[]"
      );

      const entrepreneurId = String(person.id);

      let updatedLikes;

      if (isLiked) {
        updatedLikes = [
          ...new Set([
            ...storedLikes,
            entrepreneurId,
          ]),
        ];
      } else {
        updatedLikes = storedLikes.filter(
          (id) => id !== entrepreneurId
        );
      }

      localStorage.setItem(
        "liked_entrepreneurs",
        JSON.stringify(updatedLikes)
      );
    } catch (error) {
      console.error(
        "Failed to save like status:",
        error
      );
    }
  };

  // =========================================================
  // LIKE / UNLIKE
  // =========================================================

  const handleLike = async (event) => {
    /*
     * Prevent the card's onClick from opening
     * the entrepreneur modal.
     */
    event.stopPropagation();

    if (!person?.id || liking) return;

    try {
      setLiking(true);

      const visitorId = getVisitorId();

      // =====================================================
      // UNLIKE
      // =====================================================

      if (liked) {
        const response = await api.delete(
          `/entrepreneurs/${person.id}/like/`,
          {
            params: {
              visitor_id: visitorId,
            },
          }
        );

        setLiked(false);

        setLikesCount(
          Number(
            response.data?.likes_count ??
              Math.max(likesCount - 1, 0)
          )
        );

        saveLikeStatus(false);

        return;
      }

      // =====================================================
      // LIKE
      // =====================================================

      const response = await api.post(
        `/entrepreneurs/${person.id}/like/`,
        {
          visitor_id: visitorId,
        }
      );

      setLiked(true);

      setLikesCount(
        Number(
          response.data?.likes_count ??
            likesCount + 1
        )
      );

      saveLikeStatus(true);

    } catch (error) {
      console.error(
        "Failed to update like:",
        error
      );
    } finally {
      setLiking(false);
    }
  };

  // =========================================================
  // SOCIAL LINK HELPERS
  // =========================================================

  const whatsappNumber = socials.whatsapp
    ? socials.whatsapp.replace(/\D/g, "")
    : "";

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : null;

  const socialLinks = [
    {
      name: "WhatsApp",
      url: whatsappUrl,
      icon: "💬",
    },
    {
      name: "Instagram",
      url: socials.instagram,
      icon: "📸",
    },
    {
      name: "Facebook",
      url: socials.facebook,
      icon: "f",
    },
    {
      name: "TikTok",
      url: socials.tiktok,
      icon: "♪",
    },
    {
      name: "YouTube",
      url: socials.youtube,
      icon: "▶",
    },
    {
      name: "Website",
      url: socials.website,
      icon: "🌐",
    },
  ].filter((social) => social.url);

  // =========================================================
  // IMAGE FALLBACK
  // =========================================================

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".image-fallback"
      );

    if (fallback) {
      fallback.classList.remove("hidden");
      fallback.classList.add("flex");
    }
  };

  return (
    <article
      onClick={() => onClick?.(person)}
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        border
        border-slate-100
        hover:border-slate-200
        transition-all
        duration-300
        hover:-translate-y-1
        cursor-pointer
        h-full
        flex
        flex-col
      "
    >

      {/* =====================================================
          PROFILE IMAGE
      ====================================================== */}

      <div
        className="
          relative
          h-64
          bg-slate-100
          overflow-hidden
        "
      >

        {/* BLURRED BACKGROUND */}

        {profileImage && (
          <img
            src={profileImage}
            alt=""
            aria-hidden="true"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              scale-110
              blur-xl
              opacity-25
            "
          />
        )}

        {/* MAIN IMAGE */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >

          {profileImage ? (

            <img
              src={profileImage}
              alt={
                person?.name ||
                "Entrepreneur"
              }
              onError={handleImageError}
              className="
                relative
                w-full
                h-full
                object-cover
                object-top
                transition-transform
                duration-500
                group-hover:scale-[1.02]
              "
            />

          ) : (

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-200
                to-slate-300
                text-slate-500
              "
            >

              <div className="text-center">

                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    shadow
                  "
                >
                  👤
                </div>

                <p className="mt-3 text-sm">
                  No image available
                </p>

              </div>

            </div>

          )}

          {/* IMAGE ERROR FALLBACK */}

          {profileImage && (
            <div
              className="
                image-fallback
                hidden
                absolute
                inset-0
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-200
                to-slate-300
                text-slate-500
              "
            >

              <div className="text-center">

                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    shadow
                  "
                >
                  👤
                </div>

                <p className="mt-3 text-sm">
                  No image available
                </p>

              </div>

            </div>
          )}

        </div>

        {/* BOTTOM GRADIENT */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-black/40
            to-transparent
            pointer-events-none
          "
        />

        {/* FEATURED BADGE */}

        {person?.featured && (
          <div
            className="
              absolute
              top-4
              left-4
              bg-amber-400
              text-slate-900
              px-3
              py-1.5
              rounded-full
              text-xs
              font-bold
              shadow-lg
              z-10
            "
          >
            Featured
          </div>
        )}

        {/* =================================================
            LIKE BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={handleLike}
          disabled={liking}
          aria-label={
            liked
              ? "Unlike entrepreneur"
              : "Like entrepreneur"
          }
          className={`
            absolute
            top-4
            right-4
            z-20
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded-full
            bg-white/95
            backdrop-blur-sm
            shadow-lg
            transition-all
            duration-200
            hover:scale-105
            ${
              liked
                ? "text-red-500"
                : "text-slate-500"
            }
            ${
              liking
                ? "opacity-70 cursor-wait"
                : ""
            }
          `}
        >

          <FaHeart
            className={`
              text-lg
              transition-transform
              duration-200
              ${
                liked
                  ? "scale-110"
                  : ""
              }
            `}
          />

          <span
            className="
              text-sm
              font-bold
              min-w-[12px]
            "
          >
            {likesCount}
          </span>

        </button>

        {/* VIEW PROFILE */}

        <div
          className="
            absolute
            bottom-4
            right-4
            bg-white/95
            backdrop-blur-sm
            text-slate-900
            px-4
            py-2
            rounded-full
            text-xs
            font-semibold
            opacity-0
            translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            shadow-lg
            z-10
          "
        >
          View Profile
        </div>

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          p-6
          flex
          flex-col
          flex-1
        "
      >

        {/* NAME */}

        <h3
          className="
            text-xl
            font-bold
            text-slate-900
            leading-tight
            group-hover:text-blue-700
            transition
          "
        >
          {person?.name ||
            "Unnamed Entrepreneur"}
        </h3>

        {/* TITLE */}

        {person?.title && (
          <p
            className="
              mt-2
              text-amber-500
              font-semibold
              text-sm
            "
          >
            {person.title}
          </p>
        )}

        {/* LOCATION */}

        {person?.location && (
          <div
            className="
              flex
              items-center
              gap-2
              mt-3
              text-sm
              text-slate-500
            "
          >

            <span>📍</span>

            <span>
              {person.location}
            </span>

          </div>
        )}

        {/* DESCRIPTION */}

        {person?.description && (
          <p
            className="
              mt-4
              text-slate-600
              text-sm
              leading-relaxed
              line-clamp-4
            "
          >
            {person.description}
          </p>
        )}

        {/* ===================================================
            GALLERY PREVIEW
        ==================================================== */}

        {gallery.length > 0 && (

          <div className="mt-5">

            <div
              className="
                flex
                items-center
                justify-between
                mb-2
              "
            >

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Work Gallery
              </span>

              <span
                className="
                  text-xs
                  text-slate-400
                "
              >
                {gallery.length}{" "}
                {gallery.length === 1
                  ? "image"
                  : "images"}
              </span>

            </div>

            <div
              className="
                grid
                grid-cols-3
                gap-2
              "
            >

              {gallery
                .slice(0, 3)
                .map((image, index) => (

                  <div
                    key={`${image}-${index}`}
                    className="
                      h-20
                      rounded-xl
                      overflow-hidden
                      bg-slate-100
                      shadow-sm
                    "
                  >

                    <img
                      src={image}
                      alt={`
                        ${person?.name ||
                        "Entrepreneur"} work ${
                        index + 1
                      }
                      `}
                      className="
                        w-full
                        h-full
                        object-cover
                        hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />

                  </div>

                ))}

            </div>

          </div>

        )}

        {/* ===================================================
            SOCIAL LINKS
        ==================================================== */}

        {socialLinks.length > 0 && (

          <div
            className="
              mt-5
              pt-4
              border-t
              border-slate-100
            "
          >

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {socialLinks.map((social) => (

                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                  title={social.name}
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-slate-100
                    hover:bg-slate-900
                    hover:text-white
                    text-slate-600
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                    transition-all
                    duration-200
                  "
                >
                  {social.icon}
                </a>

              ))}

            </div>

          </div>

        )}

        {/* =================================================
            BOTTOM ACTION
        ================================================== */}

        <div
          className="
            mt-auto
            pt-5
          "
        >

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClick?.(person);
            }}
            className="
              w-full
              bg-slate-900
              hover:bg-blue-800
              text-white
              py-3
              px-4
              rounded-xl
              font-semibold
              transition-all
              duration-300
              shadow-sm
              hover:shadow-lg
            "
          >
            Explore Entrepreneur
          </button>

        </div>

      </div>

    </article>
  );
}

