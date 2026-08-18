
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../services/api";

export default function EntrepreneurCard({
  person,
  onClick,
}) {
  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const profileImage =
    person?.image ||
    person?.profile_image ||
    null;

  // =========================================================
  // GALLERY COMPATIBILITY
  // =========================================================

  const gallery = Array.isArray(person?.works)
    ? person.works
    : Array.isArray(person?.gallery)
    ? person.gallery
    : [];

  void gallery;

  // =========================================================
  // LIKE STATES
  // =========================================================

  const [liked, setLiked] = useState(false);

  const [likesCount, setLikesCount] = useState(
    Number(person?.likes_count || 0)
  );

  const [liking, setLiking] = useState(false);

  // =========================================================
  // UPDATE LIKE COUNT WHEN PERSON CHANGES
  // =========================================================

  useEffect(() => {
    setLikesCount(
      Number(person?.likes_count || 0)
    );
  }, [
    person?.id,
    person?.likes_count,
  ]);

  // =========================================================
  // VISITOR ID
  // =========================================================

  const getVisitorId = () => {
    let visitorId = localStorage.getItem(
      "entrepreneur_visitor_id"
    );

    if (!visitorId) {
      if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
      ) {
        visitorId = crypto.randomUUID();
      } else {
        visitorId =
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            (character) => {
              const random =
                (Math.random() * 16) | 0;

              const value =
                character === "x"
                  ? random
                  : (random & 0x3) | 0x8;

              return value.toString(16);
            }
          );
      }

      localStorage.setItem(
        "entrepreneur_visitor_id",
        visitorId
      );
    }

    return visitorId;
  };

  // =========================================================
  // CHECK LOCAL LIKE STATUS
  // =========================================================

  useEffect(() => {
    if (!person?.id) return;

    try {
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

      const entrepreneurId =
        String(person.id);

      let updatedLikes;

      if (isLiked) {
        updatedLikes = [
          ...new Set([
            ...storedLikes,
            entrepreneurId,
          ]),
        ];
      } else {
        updatedLikes =
          storedLikes.filter(
            (id) =>
              id !== entrepreneurId
          );
      }

      localStorage.setItem(
        "liked_entrepreneurs",
        JSON.stringify(
          updatedLikes
        )
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
    event.stopPropagation();

    if (!person?.id || liking) return;

    try {
      setLiking(true);

      const visitorId =
        getVisitorId();

      // =====================================================
      // UNLIKE
      // =====================================================

      if (liked) {
        const response =
          await api.delete(
            `/entrepreneurs/${person.id}/like/`,
            {
              params: {
                visitor_id:
                  visitorId,
              },
            }
          );

        setLiked(false);

        setLikesCount(
          Number(
            response.data?.likes_count ??
              Math.max(
                likesCount - 1,
                0
              )
          )
        );

        saveLikeStatus(false);

        return;
      }

      // =====================================================
      // LIKE
      // =====================================================

      const response =
        await api.post(
          `/entrepreneurs/${person.id}/like/`,
          {
            visitor_id:
              visitorId,
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
  // IMAGE FALLBACK
  // =========================================================

  const handleImageError = (event) => {
    event.currentTarget.style.display =
      "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".image-fallback"
      );

    if (fallback) {
      fallback.classList.remove(
        "hidden"
      );

      fallback.classList.add(
        "flex"
      );
    }
  };

  // =========================================================
  // OPEN ENTREPRENEUR PROFILE
  // =========================================================

  const handleOpenProfile = (event) => {
    if (event) {
      event.stopPropagation();
    }

    if (!person) return;

    if (typeof onClick === "function") {
      onClick(person);
    }
  };

  // =========================================================
  // CARD
  // =========================================================

  return (
    <article
      onClick={handleOpenProfile}
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
          h-72
          bg-slate-100
          overflow-hidden
        "
      >
        {/* =================================================
            BLURRED BACKGROUND
        ================================================== */}

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

        {/* =================================================
            MAIN PROFILE IMAGE
        ================================================== */}

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

          {/* =================================================
              IMAGE FALLBACK
          ================================================== */}

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

        {/* =================================================
            BOTTOM GRADIENT
        ================================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-36
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
            pointer-events-none
          "
        />

        {/* =================================================
            FEATURED
        ================================================== */}

        {person?.featured && (
          <div
            className="
              absolute
              top-3
              left-3
              bg-amber-400
              text-slate-900
              px-2
              py-1
              rounded-full
              text-[10px]
              font-bold
              shadow
              z-10
            "
          >
            Featured
          </div>
        )}

        {/* =================================================
            HELLO THERE / ENTREPRENEUR INTRO
        ================================================== */}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            text-white
            z-10
            pointer-events-none
          "
        >
          <p
            className="
              text-sm
              font-medium
              mb-1
            "
          >
            Hello there👋, meet
          </p>

        </div>

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

        {/* =================================================
            VIEW PROFILE HOVER LABEL
        ================================================== */}

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
          SIMPLE PROFILE CONTENT
      ====================================================== */}

      <div
        className="
          p-6
          flex
          flex-col
          flex-1
        "
      >
        {/* =================================================
            NAME
        ================================================== */}

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

        {/* =================================================
            JOB / BUSINESS TITLE
        ================================================== */}

        {person?.title ? (
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
        ) : (
          <p
            className="
              mt-2
              text-slate-400
              text-sm
            "
          >
            Entrepreneur
          </p>
        )}

        {/* =================================================
            EXPLORE BUTTON
        ================================================== */}

        <div
          className="
            mt-auto
            pt-6
          "
        >
          <button
            type="button"
            onClick={handleOpenProfile}
            className="
              w-full
              bg-slate-900
              hover:bg-blue-800
              active:bg-blue-900
              text-white
              py-3
              px-4
              rounded-xl
              font-semibold
              transition-all
              duration-300
              shadow-sm
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            Explore Entrepreneur
          </button>
        </div>
      </div>
    </article>
  );
}
