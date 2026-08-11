import { useState } from "react";

export default function Profile() {

// 🔐 PROTECTION GOES HERE
  if (!localStorage.getItem("token")) {
    return <p className="text-center mt-10">Please login first</p>;
  }


  const [formData, setFormData] = useState({
    expertise: "",
    profile_image: null,
    image1: null,
    image2: null,
    image3: null,
    video: null
  });

  const handleChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/auth/update-profile/",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: data
        }
      );

      const result = await res.json();
      alert(result.message || "Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="expertise"
          placeholder="Your expertise"
          onChange={handleChange}
          className="border p-2"
        />

        <input type="file" name="profile_image" onChange={handleChange} />
        <input type="file" name="image1" onChange={handleChange} />
        <input type="file" name="image2" onChange={handleChange} />
        <input type="file" name="image3" onChange={handleChange} />
        <input type="file" name="video" onChange={handleChange} />

        <button className="bg-blue-600 text-white p-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
}