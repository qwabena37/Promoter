
import React from "react";

export default function EntrepreneurCard({ person, onClick }) {
  const socials = person?.socials || {};

  // Prefer the serializer's "image" field.
  // Fall back to profile_image for compatibility.
  const profileImage =
    person?.image ||
    person?.profile_image ||
    null;

  const gallery = Array.isArray(person?.gallery)
    ? person.gallery.filter(Boolean)
    : [];

  // ---------------------------------------------------------
  // SOCIAL LINK HELPERS
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  // IMAGE FALLBACK
  // ---------------------------------------------------------

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".image-fallback"
      );

    if (fallback) {
      fallback.classList.remove("hidden");
    }
  };

  return (
    <article
      onClick={onClick}
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-xl
        border
        border-slate-100
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

      <div className="relative h-64 bg-slate-100 overflow-hidden">
        {profileImage ? (
          <>
            <img
              src={profileImage}
              alt={person?.name || "Entrepreneur"}
              onError={handleImageError}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />

            {/* Fallback */}
            <div
              className="
                image-fallback
                hidden
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
          </>
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
              shadow
            "
          >
            Featured
          </div>
        )}

        {/* VIEW PROFILE */}

        <div
          className="
            absolute
            bottom-4
            right-4
            bg-white/95
            text-slate-900
            px-3
            py-1.5
            rounded-full
            text-xs
            font-semibold
            opacity-0
            translate-y-2
            group-hover:opacity-100
            group-hover:translate-y-0
            transition-all
            duration-300
            shadow
          "
        >
          View Profile
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="p-6 flex flex-col flex-1">

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
          {person?.name || "Unnamed Entrepreneur"}
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

            <div className="flex items-center justify-between mb-2">
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

            <div className="grid grid-cols-3 gap-2">

              {gallery
                .slice(0, 3)
                .map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="
                      h-20
                      rounded-lg
                      overflow-hidden
                      bg-slate-100
                    "
                  >
                    <img
                      src={image}
                      alt={`${person?.name || "Entrepreneur"} work ${
                        index + 1
                      }`}
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
          <div className="mt-5 pt-4 border-t border-slate-100">

            <div className="flex flex-wrap gap-2">

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

        {/* ===================================================
            BOTTOM ACTION
        ==================================================== */}

        <div className="mt-auto pt-5">

          <button
            type="button"
            onClick={onClick}
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
            "
          >
            Explore Entrepreneur
          </button>

        </div>

      </div>
    </article>
  );
}
