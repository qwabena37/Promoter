import { useEffect, useState } from "react";
import api from "../services/api";

export default function Entrepreneurs() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEntrepreneurs = async () => {
      try {
        setLoading(true);

        const response = await api.get("/entrepreneurs/");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setEntrepreneurs(data);
      } catch (error) {
        console.error(
          "Failed to load entrepreneurs:",
          error
        );

        setError(
          "Unable to load entrepreneurs."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEntrepreneurs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">
          Loading entrepreneurs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  if (entrepreneurs.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">
          No entrepreneurs found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {entrepreneurs.map((person) => (
        <div
          key={person.id}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* PROFILE IMAGE */}
          <img
            src={person.profile_image}
            alt={person.name}
            className="w-full h-72 object-cover"
          />

          {/* THREE WORK IMAGES */}
          <div className="grid grid-cols-3 gap-2 p-2">
            {person.works
              ?.slice(0, 3)
              .map((work, index) => (
                <div
                  key={work.id || index}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={work.image}
                    alt={`${person.name} work ${
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

          {/* INFORMATION */}
          <div className="p-5">

            <h2 className="text-xl font-bold">
              {person.name}
            </h2>

            {person.title && (
              <p className="text-gray-500 mt-1">
                {person.title}
              </p>
            )}

            {person.location && (
              <p className="text-sm text-gray-400 mt-2">
                📍 {person.location}
              </p>
            )}

            <p className="text-gray-600 mt-4 line-clamp-3">
              {person.description}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}