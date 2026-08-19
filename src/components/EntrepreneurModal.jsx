
import React, {
  useEffect,
  useState,
} from "react";

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
  FaExternalLinkAlt,
  FaPlay,
} from "react-icons/fa";

import api from "../services/api";


export default function EntrepreneurModal({
  person,
  onClose,
}) {

  // =========================================================
  // STATES
  // =========================================================

  const [lightbox, setLightbox] =
    useState(null);

  const [liked, setLiked] =
    useState(false);

  const [likesCount, setLikesCount] =
    useState(
      Number(person?.likes_count || 0)
    );

  const [liking, setLiking] =
    useState(false);


  // =========================================================
  // UPDATE LIKE COUNT
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
  // CHECK LOCAL LIKE STATUS
  // =========================================================

  useEffect(() => {

    if (!person?.id) {
      return;
    }

    try {

      const storedLikes =
        JSON.parse(
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


  // =========================================================
  // PREVENT BODY SCROLL
  // =========================================================

  useEffect(() => {

    if (!person) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {

      document.body.style.overflow =
        originalOverflow;

    };

  }, [person]);


  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {

    if (!person) {
      return;
    }

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

  }, [
    person,
    lightbox,
    onClose,
  ]);


  // =========================================================
  // RETURN NOTHING IF NO ENTREPRENEUR
  // =========================================================

  if (!person) {
    return null;
  }


  // =========================================================
  // VISITOR ID
  // =========================================================

  const getVisitorId = () => {

    let visitorId =
      localStorage.getItem(
        "entrepreneur_visitor_id"
      );

    if (!visitorId) {

      if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID ===
          "function"
      ) {

        visitorId =
          crypto.randomUUID();

      } else {

        visitorId =
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
            .replace(
              /[xy]/g,
              (character) => {

                const random =
                  Math.random() * 16 | 0;

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
  // SAVE LIKE STATUS
  // =========================================================

  const saveLikeStatus = (
    isLiked
  ) => {

    try {

      const storedLikes =
        JSON.parse(
          localStorage.getItem(
            "liked_entrepreneurs"
          ) || "[]"
        );

      const id =
        String(person.id);

      let updatedLikes;

      if (isLiked) {

        updatedLikes = [
          ...new Set([
            ...storedLikes,
            id,
          ]),
        ];

      } else {

        updatedLikes =
          storedLikes.filter(
            (item) =>
              item !== id
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

  const handleLike = async (
    event
  ) => {

    event.stopPropagation();

    if (
      !person?.id ||
      liking
    ) {
      return;
    }

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

        const newCount =
          Number(
            response.data?.likes_count ??
            Math.max(
              likesCount - 1,
              0
            )
          );

        setLiked(false);

        setLikesCount(
          newCount
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

      const newCount =
        Number(
          response.data?.likes_count ??
          likesCount + 1
        );

      setLiked(true);

      setLikesCount(
        newCount
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


  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const profileImage =
    person?.profile_image ||
    person?.image ||
    "/placeholder.jpg";


  // =========================================================
  // WORK GALLERY
  // =========================================================

  const works =
    Array.isArray(person?.works)
      ? person.works
      : Array.isArray(person?.gallery)
      ? person.gallery
      : [];


  // =========================================================
  // SOCIAL DATA
  // =========================================================

  const socials =
    person?.socials || {};

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


  // =========================================================
  // WHATSAPP URL
  // =========================================================

  const whatsappNumber =
    String(whatsapp)
      .replace(/[^0-9]/g, "");

  const whatsappUrl =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}`
      : "";


  // =========================================================
  // IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (
    image
  ) => {

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


  // =========================================================
  // CLOSE ON BACKDROP
  // =========================================================

  const handleBackdropClick = (
    event
  ) => {

    if (
      event.target ===
      event.currentTarget
    ) {

      onClose?.();

    }

  };


  // =========================================================
  // VIDEO URL
  // =========================================================

  const videoUrl =
    person?.video ||
    person?.video_url ||
    "";


  // =========================================================
  // VIDEO TYPE DETECTION
  // =========================================================

  const getVideoType = (
    url
  ) => {

    if (!url) {
      return "none";
    }

    const lowerUrl =
      url.toLowerCase();


    // -------------------------------------------------------
    // TIKTOK
    // -------------------------------------------------------

    if (
      lowerUrl.includes(
        "tiktok.com"
      )
    ) {

      return "tiktok";

    }


    // -------------------------------------------------------
    // YOUTUBE
    // -------------------------------------------------------

    if (
      lowerUrl.includes(
        "youtube.com"
      ) ||
      lowerUrl.includes(
        "youtu.be"
      )
    ) {

      return "youtube";

    }


    // -------------------------------------------------------
    // DIRECT VIDEO
    // -------------------------------------------------------

    if (
      /\.(mp4|webm|ogg)(\?.*)?$/i.test(
        lowerUrl
      )
    ) {

      return "direct";

    }


    // -------------------------------------------------------
    // UNKNOWN
    // -------------------------------------------------------

    return "external";

  };


  const videoType =
    getVideoType(videoUrl);


  // =========================================================
  // YOUTUBE EMBED URL
  // =========================================================

  const getYouTubeEmbedUrl = (
    url
  ) => {

    if (!url) {
      return "";
    }

    try {

      const parsedUrl =
        new URL(url);


      // youtu.be/VIDEO_ID

      if (
        parsedUrl.hostname.includes(
          "youtu.be"
        )
      ) {

        const videoId =
          parsedUrl.pathname
            .replace("/", "")
            .trim();

        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : url;

      }


      // youtube.com/watch?v=VIDEO_ID

      const videoId =
        parsedUrl.searchParams.get(
          "v"
        );

      if (videoId) {

        return `https://www.youtube.com/embed/${videoId}`;

      }


      // youtube.com/shorts/VIDEO_ID

      const shortsMatch =
        parsedUrl.pathname.match(
          /\/shorts\/([^/]+)/
        );

      if (
        shortsMatch?.[1]
      ) {

        return `https://www.youtube.com/embed/${shortsMatch[1]}`;

      }


      // youtube.com/embed/VIDEO_ID

      if (
        parsedUrl.pathname.includes(
          "/embed/"
        )
      ) {

        return url;

      }

    } catch (error) {

      console.error(
        "Invalid YouTube URL:",
        error
      );

    }

    return url;

  };


  // =========================================================
  // TIKTOK EMBED URL
  // =========================================================

  const getTikTokEmbedUrl = (
    url
  ) => {

    if (!url) {
      return "";
    }

    try {

      const parsedUrl =
        new URL(url);

      const match =
        parsedUrl.pathname.match(
          /\/video\/(\d+)/
        );

      if (
        match?.[1]
      ) {

        return `https://www.tiktok.com/player/v1/${match[1]}`;

      }

    } catch (error) {

      console.error(
        "Invalid TikTok URL:",
        error
      );

    }

    return "";

  };


  const youtubeEmbedUrl =
    getYouTubeEmbedUrl(
      videoUrl
    );

  const tiktokEmbedUrl =
    getTikTokEmbedUrl(
      videoUrl
    );


  // =========================================================
  // VIDEO PLATFORM LABEL
  // =========================================================

  const videoPlatformLabel =
    videoType === "tiktok"
      ? "Watch More on TikTok"
      : videoType === "youtube"
      ? "Watch More on YouTube"
      : "Open Video";


  return (

    <>

      {/* =====================================================
          MAIN MODAL OVERLAY
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
        onMouseDown={
          handleBackdropClick
        }
      >

        {/* ===================================================
            MODAL CONTAINER
        ==================================================== */}

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
            animate-[fadeIn_.2s_ease-out]
          "
          onMouseDown={(event) =>
            event.stopPropagation()
          }
        >

          {/* =================================================
              CLOSE BUTTON
          ================================================== */}

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
              backdrop-blur-sm
              transition-all
              duration-200
              hover:scale-105
            "
            aria-label="Close entrepreneur profile"
          >
            <FaTimes />
          </button>


          {/* =================================================
              SCROLLABLE CONTENT
          ================================================== */}

          <div
            className="
              overflow-y-auto
              overscroll-contain
            "
          >

            {/* =================================================
                HERO PROFILE IMAGE
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

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                "
              >

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


              {/* FEATURED BADGE */}

              {person?.featured && (

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    z-30
                    bg-amber-400
                    text-slate-900
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                    shadow-lg
                  "
                >
                  Featured Entrepreneur
                </div>

              )}


              {/* LIKE BUTTON */}

              <button
                type="button"
                onClick={
                  handleLike
                }
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
                  backdrop-blur-sm
                  shadow-xl
                  transition-all
                  duration-200
                  hover:scale-105
                  ${
                    liked
                      ? "text-red-500"
                      : "text-slate-600"
                  }
                  ${
                    liking
                      ? "opacity-60 cursor-wait"
                      : ""
                  }
                `}
                aria-label={
                  liked
                    ? "Unlike entrepreneur"
                    : "Like entrepreneur"
                }
              >

                <FaHeart
                  className={`
                    text-lg
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
                  "
                >
                  {likesCount}
                </span>

              </button>

            </div>


            {/* =================================================
                PROFILE CONTENT
            ================================================== */}

            <div
              className="
                p-5
                sm:p-8
                lg:p-10
              "
            >

              {/* =================================================
                  NAME + TITLE
              ================================================== */}

              <div
                className="
                  mb-7
                "
              >

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


              {/* =================================================
                  ABOUT
              ================================================== */}

              {person?.description && (

                <section
                  className="
                    mb-9
                  "
                >

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
                      text-base
                    "
                  >
                    {person.description}
                  </p>

                </section>

              )}


              {/* =================================================
                  WORK GALLERY
              ================================================== */}

              {works.length > 0 && (

                <section
                  className="
                    mb-9
                  "
                >

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
                      Their Work
                    </h3>


                    <span
                      className="
                        text-sm
                        text-slate-400
                      "
                    >
                      {works.length}
                      {" "}
                      {works.length === 1
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
                      .map(
                        (
                          work,
                          index
                        ) => {

                          const image =
                            typeof work ===
                            "string"
                              ? work
                              : work?.image ||
                                work?.image_url;

                          if (!image) {
                            return null;
                          }

                          const imageUrl =
                            getImageUrl(
                              image
                            );

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
                                transition-all
                                duration-300
                              "
                            >

                              <img
                                src={
                                  imageUrl
                                }
                                alt={`
                                  ${
                                    person.name
                                  }
                                  work ${
                                    index + 1
                                  }
                                `}
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

                        }
                      )}

                  </div>

                </section>

              )}


              {/* =================================================
                  VIDEO
              ================================================== */}

              {videoUrl && (

                <section
                  className="
                    mb-9
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                      gap-4
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

                    {/* EXTERNAL VIDEO LINK */}

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
                        transition
                      "
                    >
                      {videoPlatformLabel}
                      <FaExternalLinkAlt
                        className="text-xs"
                      />
                    </a>

                  </div>


                  {/* =================================================
                      YOUTUBE
                  ================================================== */}

                  {videoType === "youtube" && (

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
                        className="
                          w-full
                          h-full
                        "
                        src={youtubeEmbedUrl}
                        title={
                          `${person.name} YouTube video`
                        }
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

                  )}


                  {/* =================================================
                      TIKTOK
                  ================================================== */}

                  {videoType === "tiktok" && (

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

                      {tiktokEmbedUrl ? (

                        <iframe
                          className="
                            w-full
                            h-full
                          "
                          src={tiktokEmbedUrl}
                          title={
                            `${person.name} TikTok video`
                          }
                          allow="
                            autoplay;
                            encrypted-media;
                            fullscreen;
                            picture-in-picture
                          "
                          allowFullScreen
                        />

                      ) : (

                        <div
                          className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-white
                            text-center
                            p-6
                          "
                        >

                          <FaTiktok
                            className="
                              text-5xl
                              mb-4
                            "
                          />

                          <p
                            className="
                              text-lg
                              font-semibold
                              mb-2
                            "
                          >
                            View this TikTok video
                          </p>

                          <p
                            className="
                              text-sm
                              text-slate-300
                              mb-5
                            "
                          >
                            Open the original video
                            on TikTok.
                          </p>

                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              bg-white
                              text-black
                              px-5
                              py-3
                              rounded-xl
                              font-semibold
                              hover:bg-slate-200
                              transition
                            "
                          >
                            <FaPlay />
                            Watch on TikTok
                          </a>

                        </div>

                      )}

                    </div>

                  )}


                  {/* =================================================
                      DIRECT MP4 / WEBM / OGG
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
                      >
                        <source
                          src={videoUrl}
                        />

                        Your browser does not
                        support video playback.
                      </video>

                    </div>

                  )}


                  {/* =================================================
                      UNKNOWN / EXTERNAL VIDEO
                  ================================================== */}

                  {videoType === "external" && (

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

                      <div
                        className="
                          text-center
                        "
                      >

                        <FaPlay
                          className="
                            mx-auto
                            text-5xl
                            mb-5
                          "
                        />

                        <p
                          className="
                            text-xl
                            font-bold
                            mb-2
                          "
                        >
                          Featured Video
                        </p>

                        <p
                          className="
                            text-sm
                            text-slate-300
                            mb-5
                          "
                        >
                          This video is hosted
                          externally.
                        </p>

                        <a
                          href={videoUrl}
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
                          <FaExternalLinkAlt />
                          Watch Video
                        </a>

                      </div>

                    </div>

                  )}

                </section>

              )}


              {/* =================================================
                  SOCIAL / CONTACT
              ================================================== */}

              {(whatsapp ||
                instagram ||
                facebook ||
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
                    Connect With{" "}
                    {person.name}
                  </h3>


                  {/* WHATSAPP */}

                  {whatsappUrl && (

                    <a
                      href={
                        whatsappUrl
                      }
                      target="_blank"
                      rel="
                        noreferrer
                        noopener
                      "
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
                        shadow-sm
                        hover:shadow-lg
                        transition-all
                        duration-200
                        mb-5
                      "
                    >

                      <FaWhatsapp
                        className="
                          text-xl
                        "
                      />

                      Contact Business
                      on WhatsApp

                    </a>

                  )}


                  {/* SOCIAL ICONS */}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-3
                    "
                  >

                    {instagram && (

                      <a
                        href={instagram}
                        target="_blank"
                        rel="
                          noreferrer
                          noopener
                        "
                        aria-label="Instagram"
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          text-slate-600
                          text-xl
                          hover:bg-pink-100
                          hover:text-pink-500
                          hover:scale-105
                          transition
                        "
                      >
                        <FaInstagram />
                      </a>

                    )}


                    {facebook && (

                      <a
                        href={facebook}
                        target="_blank"
                        rel="
                          noreferrer
                          noopener
                        "
                        aria-label="Facebook"
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          text-slate-600
                          text-xl
                          hover:bg-blue-100
                          hover:text-blue-600
                          hover:scale-105
                          transition
                        "
                      >
                        <FaFacebook />
                      </a>

                    )}


                    {tiktok && (

                      <a
                        href={tiktok}
                        target="_blank"
                        rel="
                          noreferrer
                          noopener
                        "
                        aria-label="TikTok"
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          text-slate-600
                          text-xl
                          hover:bg-slate-200
                          hover:text-black
                          hover:scale-105
                          transition
                        "
                      >
                        <FaTiktok />
                      </a>

                    )}


                    {youtube && (

                      <a
                        href={youtube}
                        target="_blank"
                        rel="
                          noreferrer
                          noopener
                        "
                        aria-label="YouTube"
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          text-slate-600
                          text-xl
                          hover:bg-red-100
                          hover:text-red-600
                          hover:scale-105
                          transition
                        "
                      >
                        <FaYoutube />
                      </a>

                    )}


                    {website && (

                      <a
                        href={website}
                        target="_blank"
                        rel="
                          noreferrer
                          noopener
                        "
                        aria-label="Website"
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-slate-100
                          flex
                          items-center
                          justify-center
                          text-slate-600
                          text-xl
                          hover:bg-green-100
                          hover:text-green-600
                          hover:scale-105
                          transition
                        "
                      >
                        <FaGlobe />
                      </a>

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
          onClick={() =>
            setLightbox(null)
          }
        >

          <button
            type="button"
            onClick={() =>
              setLightbox(null)
            }
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
              transition
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

