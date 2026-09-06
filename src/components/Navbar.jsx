import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaUserShield,
  FaCamera,
  FaImage,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(false);

  const [joinForm, setJoinForm] = useState({
    fullName: "",
    businessNumber: "",
    businessName: "",
    category: "",
    location: "",
    description: "",
    services: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    website: "",
  });

  const [joinImages, setJoinImages] = useState({
    profile: null,
    business1: null,
    business2: null,
    business3: null,
  });

  // ============================================================
  // DATE & TIME
  // ============================================================
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleString("en-GH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDateTime(formatted);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // FORM INPUT
  // ============================================================
  const handleJoinChange = (e) => {
    const { name, value } = e.target;

    setJoinForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // IMAGE INPUT
  // ============================================================
  const handleImageChange = (e, field) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setJoinImages((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // ============================================================
  // RESET FORM
  // ============================================================
  const resetJoinForm = () => {
    setJoinForm({
      fullName: "",
      businessNumber: "",
      businessName: "",
      category: "",
      location: "",
      description: "",
      services: "",
      facebook: "",
      instagram: "",
      tiktok: "",
      linkedin: "",
      website: "",
    });

    setJoinImages({
      profile: null,
      business1: null,
      business2: null,
      business3: null,
    });
  };

  // ============================================================
  // SUBMIT JOIN FORM
  // ============================================================
  const handleJoinSubmit = (e) => {
    e.preventDefault();

    // Make sure all four images have been selected
    if (
      !joinImages.profile ||
      !joinImages.business1 ||
      !joinImages.business2 ||
      !joinImages.business3
    ) {
      alert(
        "Please upload your profile picture and all three business images before submitting."
      );

      return;
    }

    const message = `
*NEW ENTREPRENEUR REGISTRATION*

👤 *Full Name:*
${joinForm.fullName}

📞 *Business Number:*
${joinForm.businessNumber}

🏢 *Business Name:*
${joinForm.businessName}

📂 *Business Category:*
${joinForm.category}

📍 *Location:*
${joinForm.location}

📝 *Business Description:*
${joinForm.description}

🛍 *Products / Services:*
${joinForm.services}

📱 *SOCIAL MEDIA & WEBSITE*

Facebook:
${joinForm.facebook || "Not provided"}

Instagram:
${joinForm.instagram || "Not provided"}

TikTok:
${joinForm.tiktok || "Not provided"}

LinkedIn:
${joinForm.linkedin || "Not provided"}

Website:
${joinForm.website || "Not provided"}

📸 *MEDIA*

Profile Picture:
${joinImages.profile.name}

Business Image 1:
${joinImages.business1.name}

Business Image 2:
${joinImages.business2.name}

Business Image 3:
${joinImages.business3.name}

━━━━━━━━━━━━━━━━━━

Hello Admin, I would like to join the Young Entrepreneurs platform.

I have completed the registration form. I will attach my profile picture and three business images in this WhatsApp chat.
`;

    // ==========================================================
    // ADMIN WHATSAPP NUMBER
    // ==========================================================
    const adminNumber = "233507346539";

    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp
    window.open(url, "_blank");

    // Close form
    setShowJoinForm(false);

    // Reset form after submission
    resetJoinForm();
  };

  // ============================================================
  // CLOSE MODAL
  // ============================================================
  const closeJoinForm = () => {
    setShowJoinForm(false);
  };

  return (
    <>
      {/* =====================================================
          TOP DATE & TIME BAR
      ====================================================== */}
      <div className="bg-slate-900 text-slate-200 text-center py-2 px-4 text-sm">
        {dateTime}
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* =================================================
              LOGO
          ================================================== */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-xl md:text-2xl font-bold text-slate-900"
          >
            Young{" "}
            <span className="text-amber-400">
              Entrepreneurs
            </span>{" "}
            Hub
          </Link>

          {/* =================================================
              DESKTOP MENU
          ================================================== */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium">

            <Link
              to="/"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Home
            </Link>

            <Link
              to="/vision"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Vision
            </Link>

            <Link
              to="/explore"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Explore
            </Link>

            <Link
              to="/contact"
              className="text-slate-700 hover:text-amber-400 transition"
            >
              Contact
            </Link>

            {/* =================================================
                ADMIN DASHBOARD
            ================================================== */}
            <Link
              to="/admin/login"
              className="
                flex
                items-center
                gap-2
                border
                border-slate-300
                text-slate-700
                px-4
                py-2
                rounded-lg
                hover:border-slate-900
                hover:bg-slate-900
                hover:text-white
                transition
                duration-300
              "
            >
              <FaUserShield className="text-sm" />

              <span>
                Admin
              </span>
            </Link>

            {/* =================================================
                DESKTOP JOIN BUTTON
            ================================================== */}
            <button
              type="button"
              onClick={() => setShowJoinForm(true)}
              className="
                bg-amber-400
                hover:bg-amber-500
                text-slate-900
                px-5
                py-2
                rounded-lg
                font-semibold
                transition
                duration-300
              "
            >
              Join
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <button
            className="
              md:hidden
              relative
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-slate-300/70
              bg-slate-100/70
              backdrop-blur-md
              text-slate-800
              shadow-sm
              transition-all
              duration-300
              hover:bg-slate-200/80
              hover:shadow-md
              active:scale-95
            "
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="transition-all duration-300">
              {menuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </span>
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            ${
              menuOpen
                ? "max-h-[650px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div
            className="
              mx-4
              mb-4
              rounded-2xl
              border
              border-slate-200/70
              bg-white/90
              backdrop-blur-xl
              shadow-xl
              overflow-hidden
            "
          >
            <div className="flex flex-col px-6 py-5 space-y-2">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Home
              </Link>

              <Link
                to="/vision"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Vision
              </Link>

              <Link
                to="/explore"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Explore
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="
                  px-4
                  py-3
                  rounded-lg
                  text-slate-700
                  font-medium
                  hover:bg-slate-100/80
                  hover:text-amber-500
                  transition
                  duration-200
                "
              >
                Contact
              </Link>

              {/* =================================================
                  ADMIN DASHBOARD
              ================================================== */}
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-slate-300
                  text-slate-700
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-slate-900
                  hover:text-white
                  hover:border-slate-900
                  transition
                  duration-300
                "
              >
                <FaUserShield />

                <span>
                  Admin Dashboard
                </span>
              </Link>

              {/* =================================================
                  MOBILE JOIN BUTTON
              ================================================== */}
              <button
                type="button"
                onClick={() => {
                  setShowJoinForm(true);
                  setMenuOpen(false);
                }}
                className="
                  mt-2
                  bg-amber-400
                  hover:bg-amber-500
                  text-slate-900
                  px-4
                  py-3
                  rounded-xl
                  text-center
                  font-semibold
                  shadow-sm
                  hover:shadow-md
                  transition
                  duration-300
                "
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================================
          JOIN REGISTRATION MODAL
      ========================================================== */}
      {showJoinForm && (
        <div
  className="
    fixed
    inset-0
    z-[9999]
    bg-slate-900/70
    backdrop-blur-sm
    overflow-y-auto
    px-4
    py-6
    md:py-10
  "
  onClick={closeJoinForm}
>
          <div
            className="
              relative
              w-full
              max-w-2xl
              bg-white
              rounded-2xl
              shadow-2xl
              my-8
              overflow-hidden
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* =================================================
                MODAL HEADER
            ================================================== */}
            <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl md:text-2xl font-bold">
                  Join Young Entrepreneurs Hub
                </h2>

                <p className="text-slate-300 text-sm mt-1">
                  Complete your registration to get featured.
                </p>
              </div>

              <button
                type="button"
                onClick={closeJoinForm}
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-white/10
                  transition
                "
                aria-label="Close registration form"
              >
                <FaTimes />
              </button>
            </div>

            {/* =================================================
                FORM
            ================================================== */}
            <form
              onSubmit={handleJoinSubmit}
              className="p-6 space-y-6"
            >

              {/* =================================================
                  BASIC INFORMATION
              ================================================== */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Business Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={joinForm.fullName}
                      onChange={handleJoinChange}
                      required
                      placeholder="Your full name"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-amber-400
                      "
                    />
                  </div>

                  {/* Business Number */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Business / Phone Number *
                    </label>

                    <input
                      type="tel"
                      name="businessNumber"
                      value={joinForm.businessNumber}
                      onChange={handleJoinChange}
                      required
                      placeholder="024 XXX XXXX"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-amber-400
                      "
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Business Name *
                    </label>

                    <input
                      type="text"
                      name="businessName"
                      value={joinForm.businessName}
                      onChange={handleJoinChange}
                      required
                      placeholder="Your business name"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-amber-400
                      "
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Business Category *
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={joinForm.category}
                      onChange={handleJoinChange}
                      required
                      placeholder="e.g. Fashion, Food, Tech"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-amber-400
                      "
                    />
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Location *
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={joinForm.location}
                      onChange={handleJoinChange}
                      required
                      placeholder="e.g. Accra, Ghana"
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-amber-400
                      "
                    />
                  </div>
                </div>
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Business Description *
                </label>

                <textarea
                  name="description"
                  value={joinForm.description}
                  onChange={handleJoinChange}
                  required
                  rows="4"
                  placeholder="Tell us about your business..."
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:ring-2
                    focus:ring-amber-400
                  "
                />
              </div>

              {/* =================================================
                  PRODUCTS / SERVICES
              ================================================== */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Products / Services *
                </label>

                <textarea
                  name="services"
                  value={joinForm.services}
                  onChange={handleJoinChange}
                  required
                  rows="3"
                  placeholder="What products or services do you offer?"
                  className="
                    w-full
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:ring-2
                    focus:ring-amber-400
                  "
                />
              </div>

              {/* =================================================
                  SOCIAL MEDIA
              ================================================== */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Social Media & Website
                </h3>

                <div className="space-y-4">

                  <input
                    type="url"
                    name="facebook"
                    value={joinForm.facebook}
                    onChange={handleJoinChange}
                    placeholder="Facebook link (optional)"
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-amber-400
                    "
                  />

                  <input
                    type="url"
                    name="instagram"
                    value={joinForm.instagram}
                    onChange={handleJoinChange}
                    placeholder="Instagram link (optional)"
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-amber-400
                    "
                  />

                  <input
                    type="url"
                    name="tiktok"
                    value={joinForm.tiktok}
                    onChange={handleJoinChange}
                    placeholder="TikTok link (optional)"
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-amber-400
                    "
                  />

                  <input
                    type="url"
                    name="linkedin"
                    value={joinForm.linkedin}
                    onChange={handleJoinChange}
                    placeholder="LinkedIn link (optional)"
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-amber-400
                    "
                  />

                  <input
                    type="url"
                    name="website"
                    value={joinForm.website}
                    onChange={handleJoinChange}
                    placeholder="Website link (optional)"
                    className="
                      w-full
                      border
                      border-slate-200
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-amber-400
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  MEDIA UPLOADS
              ================================================== */}
              <div className="border-t border-slate-200 pt-6">

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                    <FaCamera />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Business Images
                  </h3>
                </div>

                <p className="text-sm text-slate-500 mb-5">
                  Upload one profile picture and three images showing
                  your business, products or services.
                </p>

                <div className="space-y-5">

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Profile Picture *
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) =>
                        handleImageChange(e, "profile")
                      }
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        bg-slate-50
                      "
                    />

                    {joinImages.profile && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ {joinImages.profile.name}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 mt-1">
                      Upload a clear picture of yourself.
                    </p>
                  </div>

                  {/* Business Image 1 */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Business Image 1 *
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) =>
                        handleImageChange(e, "business1")
                      }
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        bg-slate-50
                      "
                    />

                    {joinImages.business1 && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ {joinImages.business1.name}
                      </p>
                    )}
                  </div>

                  {/* Business Image 2 */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Business Image 2 *
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) =>
                        handleImageChange(e, "business2")
                      }
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        bg-slate-50
                      "
                    />

                    {joinImages.business2 && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ {joinImages.business2.name}
                      </p>
                    )}
                  </div>

                  {/* Business Image 3 */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Business Image 3 *
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) =>
                        handleImageChange(e, "business3")
                      }
                      className="
                        w-full
                        border
                        border-slate-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        bg-slate-50
                      "
                    />

                    {joinImages.business3 && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ {joinImages.business3.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* =================================================
                    WHATSAPP INSTRUCTION
                ================================================== */}
                <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">

                  <div className="flex gap-3">

                    <FaWhatsapp className="text-green-600 text-xl mt-1 shrink-0" />

                    <div>
                      <p className="font-semibold text-green-800">
                        Images will be sent through WhatsApp
                      </p>

                      <p className="text-sm text-green-700 mt-1">
                        After submitting this form, WhatsApp will
                        open the admin chat. Please attach your
                        profile picture and the three business
                        images there and send the message.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* =================================================
                  BUTTONS
              ================================================== */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeJoinForm}
                  className="
                    w-full
                    sm:w-auto
                    sm:flex-1
                    border
                    border-slate-300
                    text-slate-700
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-slate-100
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    w-full
                    sm:flex-1
                    bg-amber-400
                    hover:bg-amber-500
                    text-slate-900
                    px-5
                    py-3
                    rounded-xl
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-2
                    shadow-md
                    hover:shadow-lg
                    transition
                    duration-300
                  "
                >
                  <FaWhatsapp />

                  Continue to WhatsApp
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}