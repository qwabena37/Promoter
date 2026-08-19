
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaUsers,
  FaImages,
  FaStar,
  FaPlus,
  FaSignOutAlt,
  FaHome,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaImage,
  FaLinkedIn,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingEntrepreneur, setEditingEntrepreneur] =
    useState(null);

  /* =========================================================
     FORM DATA
  ========================================================== */

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    location: "",
    description: "",
    video: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    linkedIn: "",
    website: "",

    featured: false,

    // Images
    profile_image: null,
    work_image_1: null,
    work_image_2: null,
    work_image_3: null,
  });

  /* =========================================================
     CHECK LOGIN
  ========================================================== */

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    loadEntrepreneurs();
  }, []);

  /* =========================================================
     LOAD ENTREPRENEURS
  ========================================================== */

  const loadEntrepreneurs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/entrepreneurs/");

      console.log(
        "Entrepreneurs API response:",
        response.data
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.results || [];

      setEntrepreneurs(data);
    } catch (error) {
      console.error(
        "Error loading entrepreneurs:",
        error
      );

      if (error.response?.status === 401) {
        handleLogout();
        return;
      }

      setError(
        error.response?.data?.detail ||
          "Unable to load entrepreneurs."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/admin/login", {
      replace: true,
    });
  };

  /* =========================================================
     FORM HANDLING
  ========================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] || null
          : value,
    }));
  };

  /* =========================================================
     RESET FORM
  ========================================================== */

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      location: "",
      description: "",
      video: "",

      whatsapp: "",
      instagram: "",
      facebook: "",
      tiktok: "",
      youtube: "",
      linkedIn: "",
      website: "",

      featured: false,

      profile_image: null,
      work_image_1: null,
      work_image_2: null,
      work_image_3: null,
    });
  };

  /* =========================================================
     OPEN ADD FORM
  ========================================================== */

  const openAddForm = () => {
    setEditingEntrepreneur(null);
    resetForm();
    setShowForm(true);
  };

  /* =========================================================
     OPEN EDIT FORM
  ========================================================== */

  const openEditForm = (person) => {
    setEditingEntrepreneur(person);

    setFormData({
      name: person.name || "",
      title: person.title || "",
      location: person.location || "",
      description: person.description || "",
      video: person.video || "",

      whatsapp: person.whatsapp || "",
      instagram: person.instagram || "",
      facebook: person.facebook || "",
      tiktok: person.tiktok || "",
      youtube: person.youtube || "",
      linkedIn: person.linkedIn || "",
      website: person.website || "",

      featured: Boolean(person.featured),

      // New files are selected only if admin wants
      // to replace existing images.
      profile_image: null,
      work_image_1: null,
      work_image_2: null,
      work_image_3: null,
    });

    setShowForm(true);
  };

  /* =========================================================
     CLOSE FORM
  ========================================================== */

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingEntrepreneur(null);
    resetForm();
  };

  /* =========================================================
     SAVE ENTREPRENEUR
  ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");

    try {
      const form = new FormData();

      /* =====================================================
         BASIC INFORMATION
      ====================================================== */

      form.append(
        "name",
        formData.name.trim()
      );

      form.append(
        "title",
        formData.title.trim()
      );

      form.append(
        "location",
        formData.location.trim()
      );

      form.append(
        "description",
        formData.description.trim()
      );

      /* =====================================================
         VIDEO
      ====================================================== */

      if (formData.video?.trim()) {
        form.append(
          "video",
          formData.video.trim()
        );
      }

      /* =====================================================
         SOCIAL MEDIA
      ====================================================== */

      if (formData.whatsapp?.trim()) {
        form.append(
          "whatsapp",
          formData.whatsapp.trim()
        );
      }

      if (formData.instagram?.trim()) {
        form.append(
          "instagram",
          formData.instagram.trim()
        );
      }

      if (formData.facebook?.trim()) {
        form.append(
          "facebook",
          formData.facebook.trim()
        );
      }

      if (formData.tiktok?.trim()) {
        form.append(
          "tiktok",
          formData.tiktok.trim()
        );
      }

      if (formData.youtube?.trim()) {
        form.append(
          "youtube",
          formData.youtube.trim()
        );
      }

      /* =====================================================
         LINKEDIN
      ====================================================== */

      if (formData.linkedIn?.trim()) {
        form.append(
          "linkedIn",
          formData.linkedIn.trim()
        );
      }

      /* =====================================================
         WEBSITE
      ====================================================== */

      if (formData.website?.trim()) {
        form.append(
          "website",
          formData.website.trim()
        );
      }

      /* =====================================================
         FEATURED
      ====================================================== */

      form.append(
        "featured",
        formData.featured ? "true" : "false"
      );

      /* =====================================================
         PROFILE IMAGE

         FIXED:
         Previous code checked formData.image,
         but the actual state field is profile_image.
      ====================================================== */

      if (
        formData.profile_image instanceof File
      ) {
        console.log(
          "Uploading profile image:",
          formData.profile_image.name
        );

        form.append(
          "profile_image",
          formData.profile_image
        );
      }

      /* =====================================================
         WORK IMAGE 1
      ====================================================== */

      if (
        formData.work_image_1 instanceof File
      ) {
        console.log(
          "Uploading work image 1:",
          formData.work_image_1.name
        );

        form.append(
          "work_image_1",
          formData.work_image_1
        );
      }

      /* =====================================================
         WORK IMAGE 2
      ====================================================== */

      if (
        formData.work_image_2 instanceof File
      ) {
        console.log(
          "Uploading work image 2:",
          formData.work_image_2.name
        );

        form.append(
          "work_image_2",
          formData.work_image_2
        );
      }

      /* =====================================================
         WORK IMAGE 3
      ====================================================== */

      if (
        formData.work_image_3 instanceof File
      ) {
        console.log(
          "Uploading work image 3:",
          formData.work_image_3.name
        );

        form.append(
          "work_image_3",
          formData.work_image_3
        );
      }

      /* =====================================================
         DEBUG FORMDATA
      ====================================================== */

      console.log(
        "========== FORM DATA =========="
      );

      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}:`,
            value.name,
            value.type,
            value.size
          );
        } else {
          console.log(
            `${key}:`,
            value
          );
        }
      }

      /* =====================================================
         API REQUEST
      ====================================================== */

      let response;

      if (editingEntrepreneur) {
        response = await api.patch(
          `/entrepreneurs/${editingEntrepreneur.id}/`,
          form
        );

        console.log(
          "Updated entrepreneur:",
          response.data
        );
      } else {
        response = await api.post(
          "/entrepreneurs/",
          form
        );

        console.log(
          "Created entrepreneur:",
          response.data
        );
      }

      /* =====================================================
         SUCCESS
      ====================================================== */

      alert(
        editingEntrepreneur
          ? "Entrepreneur updated successfully."
          : "Entrepreneur added successfully."
      );

      closeForm();

      await loadEntrepreneurs();

    } catch (error) {
      console.error(
        "SAVE ENTREPRENEUR ERROR:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      /* =====================================================
         401
      ====================================================== */

      if (
        error.response?.status === 401
      ) {
        handleLogout();
        return;
      }

      /* =====================================================
         403
      ====================================================== */

      if (
        error.response?.status === 403
      ) {
        alert(
          "You are logged in, but you do not have permission to create or edit entrepreneurs."
        );

        return;
      }

      /* =====================================================
         400
      ====================================================== */

      if (
        error.response?.status === 400
      ) {
        const backendErrors =
          error.response?.data;

        let message =
          "Please check the information entered.";

        if (
          backendErrors &&
          typeof backendErrors === "object"
        ) {
          const messages =
            Object.entries(
              backendErrors
            )
              .map(
                ([field, errors]) => {
                  const errorMessage =
                    Array.isArray(errors)
                      ? errors.join(", ")
                      : String(errors);

                  return `${field}: ${errorMessage}`;
                }
              )
              .join("\n");

          if (messages) {
            message = messages;
          }
        }

        alert(message);
        return;
      }

      /* =====================================================
         413
      ====================================================== */

      if (
        error.response?.status === 413
      ) {
        alert(
          "The uploaded image is too large. Please choose a smaller image."
        );

        return;
      }

      /* =====================================================
         415
      ====================================================== */

      if (
        error.response?.status === 415
      ) {
        alert(
          "The server rejected the uploaded file format."
        );

        return;
      }

      /* =====================================================
         500
      ====================================================== */

      if (
        error.response?.status >= 500
      ) {
        alert(
          "The server encountered an error while saving the entrepreneur. Please check the backend logs."
        );

        return;
      }

      /* =====================================================
         NETWORK ERROR
      ====================================================== */

      if (
        error.request &&
        !error.response
      ) {
        alert(
          "The backend server could not be reached."
        );

        return;
      }

      /* =====================================================
         GENERAL ERROR
      ====================================================== */

      alert(
        error.response?.data?.detail ||
          "Unable to save entrepreneur. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================== */

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this entrepreneur?"
      );

    if (!confirmed) return;

    try {
      await api.delete(
        `/entrepreneurs/${id}/`
      );

      await loadEntrepreneurs();

    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        handleLogout();
        return;
      }

      if (
        error.response?.status === 403
      ) {
        alert(
          "You do not have permission to delete this entrepreneur."
        );

        return;
      }

      alert(
        error.response?.data?.detail ||
          "Unable to delete entrepreneur."
      );
    }
  };

  /* =========================================================
     SEARCH
  ========================================================== */

  const filteredEntrepreneurs =
    entrepreneurs.filter((person) => {
      const query =
        search.toLowerCase().trim();

      if (!query) return true;

      return (
        person.name
          ?.toLowerCase()
          .includes(query) ||
        person.title
          ?.toLowerCase()
          .includes(query) ||
        person.location
          ?.toLowerCase()
          .includes(query)
      );
    });

  /* =========================================================
     STATISTICS
  ========================================================== */

  const totalEntrepreneurs =
    entrepreneurs.length;

  const featuredCount =
    entrepreneurs.filter(
      (person) =>
        Boolean(person.featured)
    ).length;

  const totalWorks =
    entrepreneurs.reduce(
      (total, person) =>
        total +
        (Array.isArray(person.gallery)
          ? person.gallery.length
          : 0),
      0
    );

  /* =========================================================
     IMAGE PREVIEW COMPONENT
  ========================================================== */

  const ImagePreview = ({
    file,
    existingImage,
    label,
  }) => {
    const [preview, setPreview] =
      useState(null);

    useEffect(() => {
      if (!file) {
        setPreview(null);
        return;
      }

      const objectUrl =
        URL.createObjectURL(file);

      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(
          objectUrl
        );
      };
    }, [file]);

    const imageSource =
      preview || existingImage;

    return (
      <div
        className="
          aspect-square
          rounded-lg
          bg-slate-100
          flex
          items-center
          justify-center
          mb-3
          overflow-hidden
          border
          border-slate-200
        "
      >
        {imageSource ? (
          <img
            src={imageSource}
            alt={label}
            className="
              w-full
              h-full
              object-cover
            "
          />
        ) : (
          <div className="text-center">
            <FaImage className="text-3xl text-slate-300 mx-auto" />

            <p className="text-xs text-slate-400 mt-2">
              No image
            </p>
          </div>
        )}
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="bg-slate-900 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-5">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            justify-between
            gap-4
          ">

            <div>
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Young Entrepreneurs Hub
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  navigate("/")
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-slate-600
                  hover:bg-slate-800
                  transition
                "
              >
                <FaHome />
                Website
              </button>

              <button
                onClick={handleLogout}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  bg-red-500
                  hover:bg-red-600
                  transition
                "
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ===================================================
            STATISTICS
        ==================================================== */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          mb-10
        ">

          {/* ENTREPRENEURS */}

          <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="text-slate-500 text-sm">
                  Entrepreneurs
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-slate-900
                  mt-2
                ">
                  {totalEntrepreneurs}
                </h2>

              </div>

              <div className="
                w-12
                h-12
                rounded-xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              ">
                <FaUsers />
              </div>

            </div>

          </div>

          {/* WORK IMAGES */}

          <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="text-slate-500 text-sm">
                  Work Images
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-slate-900
                  mt-2
                ">
                  {totalWorks}
                </h2>

              </div>

              <div className="
                w-12
                h-12
                rounded-xl
                bg-purple-100
                text-purple-600
                flex
                items-center
                justify-center
              ">
                <FaImages />
              </div>

            </div>

          </div>

          {/* FEATURED */}

          <div className="
            bg-white
            rounded-xl
            shadow-sm
            p-6
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="text-slate-500 text-sm">
                  Featured
                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  text-slate-900
                  mt-2
                ">
                  {featuredCount}
                </h2>

              </div>

              <div className="
                w-12
                h-12
                rounded-xl
                bg-amber-100
                text-amber-500
                flex
                items-center
                justify-center
              ">
                <FaStar />
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            ENTREPRENEURS TABLE
        ==================================================== */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          overflow-hidden
        ">

          <div className="
            p-6
            border-b
            border-slate-200
          ">

            <div className="
              flex
              flex-col
              md:flex-row
              md:items-center
              justify-between
              gap-4
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-900
                ">
                  Entrepreneurs
                </h2>

                <p className="
                  text-slate-500
                  text-sm
                  mt-1
                ">
                  Manage entrepreneur profiles
                  and businesses.
                </p>

              </div>

              <button
                onClick={openAddForm}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-amber-400
                  hover:bg-amber-500
                  text-slate-900
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                <FaPlus />
                Add Entrepreneur
              </button>

            </div>

          </div>

          {/* SEARCH */}

          <div className="p-6">

            <div className="relative">

              <FaSearch
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search entrepreneurs..."
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  border
                  border-slate-300
                  rounded-lg
                  outline-none
                  focus:border-amber-400
                  focus:ring-2
                  focus:ring-amber-100
                "
              />

            </div>

          </div>

          {/* TABLE CONTENT */}

          {loading ? (

            <div className="
              p-10
              text-center
              text-slate-500
            ">
              Loading entrepreneurs...
            </div>

          ) : error ? (

            <div className="
              p-10
              text-center
            ">

              <p className="text-red-500 mb-4">
                {error}
              </p>

              <button
                onClick={loadEntrepreneurs}
                className="
                  px-4
                  py-2
                  bg-slate-900
                  text-white
                  rounded-lg
                "
              >
                Try Again
              </button>

            </div>

          ) : filteredEntrepreneurs.length === 0 ? (

            <div className="
              p-10
              text-center
              text-slate-500
            ">
              {search
                ? "No entrepreneurs match your search."
                : "No entrepreneurs found."}
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-slate-600
                    ">
                      Entrepreneur
                    </th>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-slate-600
                    ">
                      Title
                    </th>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-slate-600
                    ">
                      Location
                    </th>

                    <th className="
                      text-left
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-slate-600
                    ">
                      Featured
                    </th>

                    <th className="
                      text-right
                      px-6
                      py-4
                      text-sm
                      font-semibold
                      text-slate-600
                    ">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="
                  divide-y
                  divide-slate-100
                ">

                  {filteredEntrepreneurs.map(
                    (person) => (

                      <tr
                        key={person.id}
                        className="
                          hover:bg-slate-50
                          transition
                        "
                      >

                        <td className="px-6 py-4">

                          <div className="
                            flex
                            items-center
                            gap-3
                          ">

                            <img
                              src={
                                person.image ||
                                person.profile_image ||
                                "/placeholder.jpg"
                              }
                              alt={person.name}
                              className="
                                w-12
                                h-12
                                rounded-lg
                                object-cover
                                bg-slate-100
                              "
                            />

                            <p className="
                              font-semibold
                              text-slate-900
                            ">
                              {person.name}
                            </p>

                          </div>

                        </td>

                        <td className="
                          px-6
                          py-4
                          text-slate-600
                        ">
                          {person.title}
                        </td>

                        <td className="
                          px-6
                          py-4
                          text-slate-600
                        ">
                          {person.location}
                        </td>

                        <td className="px-6 py-4">

                          {person.featured ? (

                            <span className="
                              inline-flex
                              items-center
                              gap-1
                              bg-amber-100
                              text-amber-700
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                            ">
                              <FaStar />
                              Featured
                            </span>

                          ) : (

                            <span className="
                              text-slate-400
                              text-sm
                            ">
                              No
                            </span>

                          )}

                        </td>

                        <td className="px-6 py-4">

                          <div className="
                            flex
                            justify-end
                            gap-2
                          ">

                            <button
                              onClick={() =>
                                openEditForm(person)
                              }
                              className="
                                p-2
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                                hover:bg-blue-100
                              "
                              title="Edit"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  person.id
                                )
                              }
                              className="
                                p-2
                                rounded-lg
                                bg-red-50
                                text-red-600
                                hover:bg-red-100
                              "
                              title="Delete"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {showForm && (

        <div className="
          fixed
          inset-0
          bg-black/70
          z-50
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            bg-white
            w-full
            max-w-4xl
            max-h-[92vh]
            overflow-y-auto
            rounded-2xl
            shadow-2xl
          ">

            {/* MODAL HEADER */}

            <div className="
              sticky
              top-0
              bg-white
              border-b
              border-slate-200
              px-6
              py-5
              flex
              justify-between
              items-center
              z-10
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-900
                ">
                  {editingEntrepreneur
                    ? "Edit Entrepreneur"
                    : "Add Entrepreneur"}
                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Enter entrepreneur information below.
                </p>

              </div>

              <button
                onClick={closeForm}
                disabled={saving}
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-slate-100
                  hover:bg-slate-200
                  disabled:opacity-50
                  flex
                  items-center
                  justify-center
                "
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="
                p-6
                space-y-7
              "
            >

              {/* =================================================
                  BASIC INFORMATION
              ================================================== */}

              <div>

                <h3 className="
                  font-bold
                  text-slate-900
                  mb-4
                ">
                  Basic Information
                </h3>

                <div className="
                  grid
                  md:grid-cols-2
                  gap-4
                ">

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Entrepreneur name"
                    required
                    className="input-field"
                  />

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Business / Job title"
                    required
                    className="input-field"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="input-field"
                  />

                </div>

              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <div>

                <label className="
                  block
                  font-semibold
                  text-sm
                  mb-2
                ">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about this entrepreneur..."
                  className="
                    input-field
                    resize-none
                  "
                />

              </div>

              {/* =================================================
                  IMAGES
              ================================================== */}

              <div>

                <div className="
                  flex
                  items-center
                  justify-between
                  mb-5
                ">

                  <div>

                    <h3 className="
                      font-bold
                      text-slate-900
                    ">
                      Entrepreneur Images
                    </h3>

                    <p className="
                      text-sm
                      text-slate-500
                      mt-1
                    ">
                      Add a profile picture and
                      images showing the entrepreneur's work.
                    </p>

                  </div>

                  <span className="
                    hidden
                    sm:inline-flex
                    items-center
                    bg-purple-100
                    text-purple-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                  ">
                    4 Images
                  </span>

                </div>

                {/* PROFILE IMAGE */}

                <div className="
                  border
                  border-slate-200
                  rounded-xl
                  p-5
                  bg-slate-50
                  mb-6
                ">

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-4
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-lg
                      bg-amber-100
                      text-amber-600
                      flex
                      items-center
                      justify-center
                      font-bold
                    ">
                      1
                    </div>

                    <div>

                      <label className="
                        block
                        font-semibold
                        text-sm
                        text-slate-900
                      ">
                        Profile Picture
                      </label>

                      <p className="
                        text-xs
                        text-slate-500
                      ">
                        Main image displayed on
                        the entrepreneur profile.
                      </p>

                    </div>

                  </div>

                  {(editingEntrepreneur?.image ||
                    editingEntrepreneur?.profile_image) && (
                    <div className="
                      w-32
                      h-32
                      rounded-xl
                      overflow-hidden
                      mb-4
                      border
                      border-slate-200
                    ">
                      <img
                        src={
                          editingEntrepreneur.image ||
                          editingEntrepreneur.profile_image
                        }
                        alt="Current profile"
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    name="profile_image"
                    accept=".jpeg,.jpg,.png,.webp"
                    onChange={handleChange}
                    className="
                      block
                      w-full
                      text-sm
                      text-slate-600
                      border
                      border-slate-300
                      rounded-lg
                      bg-white
                      cursor-pointer
                      p-2
                      file:mr-4
                      file:py-2
                      file:px-4
                      file:rounded-lg
                      file:border-0
                      file:bg-amber-100
                      file:text-amber-700
                      file:font-semibold
                      hover:file:bg-amber-200
                    "
                  />

                  <p className="
                    text-xs
                    text-slate-400
                    mt-2
                  ">
                    JPG, JPEG, PNG or WebP.
                  </p>

                </div>

                {/* WORK IMAGES */}

                <div>

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  ">

                    <div>

                      <h4 className="
                        font-semibold
                        text-slate-900
                      ">
                        Work Images
                      </h4>

                      <p className="
                        text-xs
                        text-slate-500
                        mt-1
                      ">
                        Upload up to three images
                        showing the entrepreneur's work.
                      </p>

                    </div>

                    <span className="
                      text-xs
                      font-semibold
                      bg-purple-100
                      text-purple-700
                      px-3
                      py-1
                      rounded-full
                    ">
                      3 Images
                    </span>

                  </div>

                  <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-4
                  ">

                    {/* WORK IMAGE 1 */}

                    <div className="
                      border
                      border-slate-200
                      rounded-xl
                      p-3
                      bg-white
                      hover:border-amber-300
                      transition
                    ">

                      <ImagePreview
                        file={
                          formData.work_image_1
                        }
                        existingImage={
                          editingEntrepreneur
                            ?.gallery?.[0]
                              ?.image
                        }
                        label="Work Image 1"
                      />

                      <label className="
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                        mb-2
                      ">
                        Work Image 1
                      </label>

                      <input
                        type="file"
                        name="work_image_1"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleChange}
                        className="
                          block
                          w-full
                          text-xs
                          text-slate-500
                          border
                          border-slate-300
                          rounded-lg
                          bg-slate-50
                          cursor-pointer
                          p-2
                          file:mr-2
                          file:py-1.5
                          file:px-2
                          file:rounded-md
                          file:border-0
                          file:bg-slate-200
                          file:text-slate-700
                          file:text-xs
                          file:font-medium
                          hover:file:bg-slate-300
                        "
                      />

                    </div>

                    {/* WORK IMAGE 2 */}

                    <div className="
                      border
                      border-slate-200
                      rounded-xl
                      p-3
                      bg-white
                      hover:border-amber-300
                      transition
                    ">

                      <ImagePreview
                        file={
                          formData.work_image_2
                        }
                        existingImage={
                          editingEntrepreneur
                            ?.gallery?.[1]
                              ?.image
                        }
                        label="Work Image 2"
                      />

                      <label className="
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                        mb-2
                      ">
                        Work Image 2
                      </label>

                      <input
                        type="file"
                        name="work_image_2"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleChange}
                        className="
                          block
                          w-full
                          text-xs
                          text-slate-500
                          border
                          border-slate-300
                          rounded-lg
                          bg-slate-50
                          cursor-pointer
                          p-2
                          file:mr-2
                          file:py-1.5
                          file:px-2
                          file:rounded-md
                          file:border-0
                          file:bg-slate-200
                          file:text-slate-700
                          file:text-xs
                          file:font-medium
                          hover:file:bg-slate-300
                        "
                      />

                    </div>

                    {/* WORK IMAGE 3 */}

                    <div className="
                      border
                      border-slate-200
                      rounded-xl
                      p-3
                      bg-white
                      hover:border-amber-300
                      transition
                    ">

                      <ImagePreview
                        file={
                          formData.work_image_3
                        }
                        existingImage={
                          editingEntrepreneur
                            ?.gallery?.[2]
                              ?.image
                        }
                        label="Work Image 3"
                      />

                      <label className="
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                        mb-2
                      ">
                        Work Image 3
                      </label>

                      <input
                        type="file"
                        name="work_image_3"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleChange}
                        className="
                          block
                          w-full
                          text-xs
                          text-slate-500
                          border
                          border-slate-300
                          rounded-lg
                          bg-slate-50
                          cursor-pointer
                          p-2
                          file:mr-2
                          file:py-1.5
                          file:px-2
                          file:rounded-md
                          file:border-0
                          file:bg-slate-200
                          file:text-slate-700
                          file:text-xs
                          file:font-medium
                          hover:file:bg-slate-300
                        "
                      />

                    </div>

                  </div>

                  <p className="
                    text-xs
                    text-slate-400
                    mt-3
                  ">
                    Supported formats: JPG, JPEG,
                    PNG and WebP.
                  </p>

                </div>

              </div>

              {/* =================================================
                  VIDEO
              ================================================== */}

              <div>

                <label className="
                  block
                  font-semibold
                  text-sm
                  mb-2
                ">
                  Video URL
                </label>

                <input
                  type="url"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/..."
                  className="input-field"
                />

                <p className="
                  text-xs
                  text-slate-400
                  mt-2
                ">
                  Enter a YouTube or other supported
                  video URL.
                </p>

              </div>

              {/* =================================================
                  SOCIAL MEDIA
              ================================================== */}

              <div>

                <h3 className="
                  font-bold
                  text-slate-900
                  mb-4
                ">
                  Social Media
                </h3>

                <div className="
                  grid
                  md:grid-cols-2
                  gap-4
                ">

                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp number"
                    className="input-field"
                  />

                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="input-field"
                  />

                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    className="input-field"
                  />

                  <input
                    type="url"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleChange}
                    placeholder="TikTok URL"
                    className="input-field"
                  />

                  <input
                    type="url"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="YouTube URL"
                    className="input-field"
                  />

                  {/* LINKEDIN */}

                  <div className="relative">

                    <FaLinkedin
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-blue-700
                        text-lg
                      "
                    />

                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn profile URL"
                      className="
                        input-field
                        pl-11
                      "
                    />

                  </div>

                  {/* WEBSITE */}

                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Website URL"
                    className="input-field"
                  />

                </div>

                <p className="
                  text-xs
                  text-slate-400
                  mt-3
                ">
                  Add the entrepreneur's professional
                  social media and website links.
                </p>

              </div>

              {/* =================================================
                  FEATURED
              ================================================== */}

              <label className="
                flex
                items-center
                gap-3
                cursor-pointer
              ">

                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="
                    w-5
                    h-5
                    accent-amber-400
                  "
                />

                <span className="font-medium">
                  Feature this entrepreneur
                </span>

              </label>

              {/* =================================================
                  BUTTONS
              ================================================== */}

              <div className="
                flex
                justify-end
                gap-3
                pt-4
                border-t
              ">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="
                    px-5
                    py-3
                    rounded-lg
                    border
                    border-slate-300
                    hover:bg-slate-100
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    px-6
                    py-3
                    rounded-lg
                    bg-amber-400
                    hover:bg-amber-500
                    disabled:bg-slate-300
                    disabled:cursor-not-allowed
                    text-slate-900
                    font-bold
                  "
                >
                  {saving
                    ? "Saving..."
                    : editingEntrepreneur
                    ? "Update Entrepreneur"
                    : "Save Entrepreneur"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}
