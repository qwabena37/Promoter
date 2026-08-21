import React, {
  useEffect,
  useState,
} from "react";

import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaGlobe,
  FaHeart,
  FaTimes,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaPlay,
} from "react-icons/fa";

import api from "../services/api";

export default function EntrepreneurModal({
  person,
  onClose,
}) {
  const [lightbox, setLightbox] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    Number(person?.likes_count || 0)
  );
  const [liking, setLiking] = useState(false);

  /* =========================================================
     UPDATE LIKE COUNT
  ========================================================= */

  useEffect(() => {
    setLikesCount(
      Number(person?.likes_count || 0)
    );
  }, [person?.id, person?.likes_count]);

  /* =========================================================
     CHECK LOCAL LIKE STATUS
  ========================================================= */

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
        "Failed to read like status:",
        error
      );
    }
  }, [person?.id]);

  /* =========================================================
     PREVENT BODY SCROLL
  ========================================================= */

  useEffect(() => {
    if (!person) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [person]);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!person) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (lightbox) {
          setLightbox(null);
        } else {
          onClose?.();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [person, lightbox, onClose]);

  if (!person) {
    return null;
  }

  /* =========================================================
     VISITOR ID
  ========================================================= */

  const getVisitorId = () => {
    let visitorId =
      localStorage.getItem(
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

  /* =========================================================
     SAVE LIKE STATUS
  ========================================================= */

  const saveLikeStatus = (isLiked) => {
    try {
      const storedLikes = JSON.parse(
        localStorage.getItem(
          "liked_entrepreneurs"
        ) || "[]"
      );

      const id = String(person.id);

      const updatedLikes = isLiked
        ? [
            ...new Set([
              ...storedLikes,
              id,
            ]),
          ]
        : storedLikes.filter(
            (item) => item !== id
          );

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

  /* =========================================================
     LIKE / UNLIKE
  ========================================================= */

  const handleLike = async (event) => {
    event.stopPropagation();

    if (!person?.id || liking) return;

    try {
      setLiking(true);

      const visitorId = getVisitorId();

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
        "Failed to update entrepreneur like:",
        error
      );
    } finally {
      setLiking(false);
    }
  };

  /* =========================================================
     PROFILE IMAGE
  ========================================================= */

  const profileImage =
    person?.profile_image ||
    person?.image ||
    "/placeholder.jpg";

  /* =========================================================
     WORK GALLERY
  ========================================================= */

  const works =
    Array.isArray(person?.works)
      ? person.works
      : Array.isArray(person?.gallery)
      ? person.gallery
      : [];

  /* =========================================================
     SOCIAL DATA
  ========================================================= */

  const socials = person?.socials || {};

  const whatsapp =
    person?.whatsapp ||
    socials?.whatsapp ||
    "";

  const instagram =
    person?.instagram ||
    socials?.instagram ||
    "";

  const facebook =
    person?.facebook ||
    socials?.facebook ||
    "";
const linkedin = person?.linkedin || 
person?.linkedin_url || 
person?.linkedin_profile || 
person?.linkedin_profile_url || 
socials?.linkedin || 
socials?.linkedin_url ||
socials?.linkedin_profile ||
socials?.linkedin_profile_url || 
"";

  const tiktok =
    person?.tiktok ||
    socials?.tiktok ||
    "";

  const youtube =
    person?.youtube ||
    socials?.youtube ||
    "";

  const website =
    person?.website ||
    socials?.website ||
    "";

  /* =========================================================
     WHATSAPP
  ========================================================= */

  const whatsappNumber = String(
    whatsapp
  ).replace(/[^0-9]/g, "");

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "";

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (image) => {
    if (!image) {
      return "/placeholder.jpg";
    }

    if (
      typeof image === "string" &&
      (
        image.startsWith("http://") ||
        image.startsWith("https://")
      )
    ) {
      return image;
    }

    return image;
  };

  /* =========================================================
     BACKDROP
  ========================================================= */

  const handleBackdropClick = (event) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose?.();
    }
  };

  /* =========================================================
     VIDEO URL
  ========================================================= */

  const videoUrl = String(
    person?.video ||
      person?.video_url ||
      ""
  ).trim();

  /* =========================================================
     VIDEO TYPE DETECTION
  ========================================================= */

  const getVideoType = (url) => {
    if (!url) return "none";

    const lowerUrl = url.toLowerCase();

    /*
     * DIRECT VIDEO
     * Check this first because Cloudinary URLs
     * can contain query parameters.
     */

    if (
      /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(
        lowerUrl
      )
    ) {
      return "direct";
    }

    /*
     * YOUTUBE
     */

    if (
      lowerUrl.includes("youtube.com") ||
      lowerUrl.includes("youtu.be")
    ) {
      return "youtube";
    }

    /*
     * TIKTOK
     */

    if (
      lowerUrl.includes("tiktok.com")
    ) {
      return "tiktok";
    }

    return "external";
  };

  const videoType =
    getVideoType(videoUrl);

  /* =========================================================
     YOUTUBE VIDEO ID
  ========================================================= */

  const getYouTubeVideoId = (url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      /*
       * youtube.com/watch?v=VIDEO_ID
       */

      const watchId =
        parsedUrl.searchParams.get("v");

      if (watchId) {
        return watchId;
      }

      /*
       * youtu.be/VIDEO_ID
       */

      if (
        parsedUrl.hostname.includes(
          "youtu.be"
        )
      ) {
        return parsedUrl.pathname
          .replace("/", "")
          .split("/")[0];
      }

      /*
       * youtube.com/shorts/VIDEO_ID
       */

      const shortsMatch =
        parsedUrl.pathname.match(
          /\/shorts\/([^/?]+)/
        );

      if (shortsMatch?.[1]) {
        return shortsMatch[1];
      }

      /*
       * youtube.com/embed/VIDEO_ID
       */

      const embedMatch =
        parsedUrl.pathname.match(
          /\/embed\/([^/?]+)/
        );

      if (embedMatch?.[1]) {
        return embedMatch[1];
      }
    } catch (error) {
      console.error(
        "Invalid YouTube URL:",
        error
      );
    }

    return "";
  };

  const youtubeVideoId =
    getYouTubeVideoId(videoUrl);

  const youtubeEmbedUrl =
    youtubeVideoId
      ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0`
      : "";

  /* =========================================================
     TIKTOK VIDEO ID
  ========================================================= */

  const getTikTokVideoId = (url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      /*
       * Standard:
       * /@username/video/123456789
       */

      const match =
        parsedUrl.pathname.match(
          /\/video\/(\d+)/
        );

      if (match?.[1]) {
        return match[1];
      }
    } catch (error) {
      console.error(
        "Invalid TikTok URL:",
        error
      );
    }

    return "";
  };

  const tiktokVideoId =
    getTikTokVideoId(videoUrl);

  const tiktokEmbedUrl =
    tiktokVideoId
      ? `https://www.tiktok.com/player/v1/${tiktokVideoId}?description=1&music_info=1`
      : "";

  /* =========================================================
     VIDEO LABEL
  ========================================================= */

  const videoPlatformLabel =
    videoType === "tiktok"
      ? "Watch More on TikTok"
      : videoType === "youtube"
      ? "Watch More on YouTube"
      : videoType === "direct"
      ? "Open Video"
      : "Watch Video";

  return (
    <>
      {/* =====================================================
          MAIN MODAL
      ====================================================== */}

      <div
        className="
          fixed
          inset-0
          z-[100]
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-3
          sm:p-6
        "
        onMouseDown={handleBackdropClick}
      >
        <div
          className="
            relative
            w-full
            max-w-5xl
            max-h-[94vh]
            bg-white
            rounded-2xl
            sm:rounded-3xl
            shadow-2xl
            overflow-hidden
            flex
            flex-col
          "
          onMouseDown={(event) =>
            event.stopPropagation()
          }
        >
          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              top-4
              right-4
              z-30
              w-11
              h-11
              rounded-full
              bg-black/60
              hover:bg-red-500
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              transition
            "
            aria-label="Close entrepreneur profile"
          >
            <FaTimes />
          </button>

          {/* =================================================
              SCROLLABLE CONTENT
          ================================================== */}

          <div className="overflow-y-auto overscroll-contain">

            {/* =================================================
                HERO
            ================================================== */}

            <div
              className="
                relative
                w-full
                h-[280px]
                sm:h-[380px]
                lg:h-[430px]
                bg-slate-100
                overflow-hidden
              "
            >
              <img
                src={getImageUrl(profileImage)}
                alt=""
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  scale-110
                  blur-2xl
                  opacity-30
                "
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={getImageUrl(profileImage)}
                  alt={
                    person?.name ||
                    "Entrepreneur"
                  }
                  className="
                    relative
                    z-10
                    w-full
                    h-full
                    object-contain
                    object-center
                  "
                />
              </div>

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-40
                  bg-gradient-to-t
                  from-black/70
                  via-black/20
                  to-transparent
                  z-20
                  pointer-events-none
                "
              />

              {/* FEATURED */}

              {person?.featured && (
                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    z-30
                    bg-amber-400
                    text-slate-900
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-bold
                    shadow-lg
                  "
                >
                  Featured Entrepreneur
                </div>
              )}

              {/* LIKE */}

              <button
                type="button"
                onClick={handleLike}
                disabled={liking}
                className={`
                  absolute
                  bottom-5
                  right-5
                  z-30
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-full
                  bg-white/95
                  shadow-xl
                  transition
                  hover:scale-105
                  ${
                    liked
                      ? "text-red-500"
                      : "text-slate-600"
                  }
                `}
              >
                <FaHeart className="text-lg" />

                <span className="text-sm font-bold">
                  {likesCount}
                </span>
              </button>
            </div>

            {/* =================================================
                CONTENT
            ================================================== */}

            <div
              className="
                p-5
                sm:p-8
                lg:p-10
              "
            >
              {/* NAME */}

              <div className="mb-7">
                <h2
                  className="
                    text-3xl
                    sm:text-4xl
                    font-extrabold
                    tracking-tight
                    text-slate-900
                  "
                >
                  {person?.name ||
                    "Unnamed Entrepreneur"}
                </h2>

                {person?.title && (
                  <p
                    className="
                      mt-2
                      text-amber-600
                      font-bold
                      text-base
                      sm:text-lg
                    "
                  >
                    {person.title}
                  </p>
                )}

                {person?.location && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-3
                      text-slate-500
                      text-sm
                    "
                  >
                    <FaMapMarkerAlt />

                    <span>
                      {person.location}
                    </span>
                  </div>
                )}
              </div>

              {/* ABOUT */}

              {person?.description && (
                <section className="mb-9">
                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-slate-900
                      mb-3
                    "
                  >
                    About
                  </h3>

                  <p
                    className="
                      text-slate-600
                      leading-7
                    "
                  >
                    {person.description}
                  </p>
                </section>
              )}

              {/* =================================================
                  WORK
              ================================================== */}

              {works.length > 0 && (
                <section className="mb-9">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                    "
                  >
                    <h3
                      className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      My Work
                    </h3>

                    <span className="text-sm text-slate-400">
                      {Math.min(works.length, 3)}{" "}
                      {Math.min(works.length, 3) === 1
                        ? "project"
                        : "projects"}
                    </span>
                  </div>

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
                            : work?.image ||
                              work?.image_url;

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
                              aspect-square
                              overflow-hidden
                              rounded-2xl
                              bg-slate-100
                              shadow-sm
                              hover:shadow-xl
                              transition
                            "
                          >
                            <img
                              src={imageUrl}
                              alt={`${person.name} work ${
                                index + 1
                              }`}
                              className="
                                w-full
                                h-full
                                object-cover
                                transition-transform
                                duration-500
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

                            <div
                              className="
                                absolute
                                bottom-3
                                right-3
                                opacity-0
                                group-hover:opacity-100
                                bg-white/90
                                text-slate-900
                                px-3
                                py-1.5
                                rounded-full
                                text-xs
                                font-semibold
                                transition
                              "
                            >
                              View
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </section>
              )}

              {/* =================================================
                  IMPROVED VIDEO SECTION
              ================================================== */}

              {videoUrl && (
                <section className="mb-9">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                      gap-4
                      flex-wrap
                    "
                  >
                    <h3
                      className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      Featured Video
                    </h3>

                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-blue-600
                        hover:text-blue-800
                      "
                    >
                      {videoPlatformLabel}

                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>

                  {/* =================================================
                      YOUTUBE
                  ================================================== */}

                  {videoType === "youtube" && (
                    <>
                      {youtubeEmbedUrl ? (
                        <div
                          className="
                            relative
                            w-full
                            aspect-video
                            rounded-2xl
                            overflow-hidden
                            bg-black
                            shadow-lg
                          "
                        >
                          <iframe
                            className="w-full h-full"
                            src={youtubeEmbedUrl}
                            title={`${person.name} YouTube video`}
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
                      ) : (
                        <ExternalVideoCard
                          icon={<FaYoutube />}
                          title="Watch this YouTube video"
                          description="Open the original video on YouTube."
                          url={videoUrl}
                          buttonText="Watch on YouTube"
                        />
                      )}
                    </>
                  )}

                  {/* =================================================
                      TIKTOK
                  ================================================== */}

                  {videoType === "tiktok" && (
                    <>
                      {tiktokEmbedUrl ? (
                        <div
                          className="
                            relative
                            w-full
                            aspect-video
                            rounded-2xl
                            overflow-hidden
                            bg-black
                            shadow-lg
                          "
                        >
                          <iframe
                            className="w-full h-full"
                            src={tiktokEmbedUrl}
                            title={`${person.name} TikTok video`}
                            allow="
                              autoplay;
                              encrypted-media;
                              fullscreen;
                              picture-in-picture;
                            "
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <ExternalVideoCard
                          icon={<FaTiktok />}
                          title="Watch this TikTok"
                          description="Open the original video on TikTok."
                          url={videoUrl}
                          buttonText="Watch on TikTok"
                        />
                      )}
                    </>
                  )}

                  {/* =================================================
                      DIRECT VIDEO
                  ================================================== */}

                  {videoType === "direct" && (
                    <div
                      className="
                        relative
                        w-full
                        aspect-video
                        rounded-2xl
                        overflow-hidden
                        bg-black
                        shadow-lg
                      "
                    >
                      <video
                        className="
                          w-full
                          h-full
                          object-contain
                        "
                        controls
                        playsInline
                        preload="metadata"
                        src={videoUrl}
                      >
                        Your browser does not support
                        video playback.
                      </video>
                    </div>
                  )}

                  {/* =================================================
                      OTHER EXTERNAL VIDEO
                  ================================================== */}

                  {videoType === "external" && (
                    <ExternalVideoCard
                      icon={<FaPlay />}
                      title="Featured Video"
                      description="This video is hosted externally."
                      url={videoUrl}
                      buttonText="Watch Video"
                    />
                  )}
                </section>
              )}

              {/* =================================================
                  SOCIAL / CONTACT
              ================================================== */}

              {(whatsapp ||
                instagram ||
                facebook ||
                linkedin ||
                tiktok ||
                youtube ||
                website) && (
                <section
                  className="
                    border-t
                    border-slate-200
                    pt-7
                  "
                >
                  <h3
                    className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-slate-900
                      mb-5
                    "
                  >
                    Connect With {person.name}
                  </h3>

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
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        py-3.5
                        px-5
                        rounded-xl
                        font-bold
                        mb-5
                        transition
                      "
                    >
                      <FaWhatsapp className="text-xl" />

                      Contact Business
                      on WhatsApp
                    </a>
                  )}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-3
                    "
                  >
                    {instagram && (
                      <SocialLink
                        href={instagram}
                        label="Instagram"
                        className="hover:bg-pink-100 hover:text-pink-500"
                      >
                        <FaInstagram />
                      </SocialLink>
                    )}

                    {facebook && (
                      <SocialLink
                        href={facebook}
                        label="Facebook"
                        className="hover:bg-blue-100 hover:text-blue-600"
                      >
                        <FaFacebook />
                      </SocialLink>
                    )}
                    
                    <SocialLink
  href="https://www.linkedin.com"
  label="LinkedIn"
  className="hover:bg-blue-100 hover:text-blue-600"
>
  <FaLinkedin />
</SocialLink>

                    {tiktok && (
                      <SocialLink
                        href={tiktok}
                        label="TikTok"
                        className="hover:bg-slate-200 hover:text-black"
                      >
                        <FaTiktok />
                      </SocialLink>
                    )}

                    {youtube && (
                      <SocialLink
                        href={youtube}
                        label="YouTube"
                        className="hover:bg-red-100 hover:text-red-600"
                      >
                        <FaYoutube />
                      </SocialLink>
                    )}

                    {website && (
                      <SocialLink
                        href={website}
                        label="Website"
                        className="hover:bg-green-100 hover:text-green-600"
                      >
                        <FaGlobe />
                      </SocialLink>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          IMAGE LIGHTBOX
      ====================================================== */}

      {lightbox && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            bg-black/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="
              absolute
              top-5
              right-5
              z-20
              w-11
              h-11
              rounded-full
              bg-white/10
              hover:bg-red-500
              text-white
              flex
              items-center
              justify-center
            "
            aria-label="Close image"
          >
            <FaTimes />
          </button>

          <img
            src={lightbox}
            alt="Enlarged entrepreneur work"
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              max-w-[95vw]
              max-h-[90vh]
              object-contain
              rounded-xl
              shadow-2xl
            "
          />
        </div>
      )}
    </>
  );
}


/* =========================================================
   EXTERNAL VIDEO CARD
========================================================= */

function ExternalVideoCard({
  icon,
  title,
  description,
  url,
  buttonText,
}) {
  return (
    <div
      className="
        relative
        w-full
        aspect-video
        rounded-2xl
        overflow-hidden
        bg-gradient-to-br
        from-slate-900
        to-slate-700
        shadow-lg
        flex
        items-center
        justify-center
        text-white
        p-6
      "
    >
      <div className="text-center">
        <div
          className="
            flex
            justify-center
            text-5xl
            mb-5
          "
        >
          {icon}
        </div>

        <p
          className="
            text-xl
            font-bold
            mb-2
          "
        >
          {title}
        </p>

        <p
          className="
            text-sm
            text-slate-300
            mb-5
          "
        >
          {description}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            items-center
            gap-2
            bg-white
            text-slate-900
            px-5
            py-3
            rounded-xl
            font-semibold
            hover:bg-slate-200
            transition
          "
        >
          <FaPlay />

          {buttonText}
        </a>
      </div>
    </div>
  );
}


/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({
  href,
  label,
  children,
  className = "",
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        w-12
        h-12
        rounded-full
        bg-slate-100
        flex
        items-center
        justify-center
        text-slate-600
        text-xl
        hover:scale-105
        transition
        ${className}
      `}
    >
      {children}
    </a>
  );
}