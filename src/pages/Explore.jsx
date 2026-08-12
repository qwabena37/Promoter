import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import entrepreneurs from "../data/entrepreneurs";
import { motion } from "framer-motion";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");

  // Search entrepreneurs by name, work, business, skills, services, etc.
  const filteredEntrepreneurs = entrepreneurs.filter((person) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return true;

    const searchableContent = [
      person.name,
      person.business,
      person.work,
      person.profession,
      person.skills,
      person.service,
      person.services,
      person.description,
      person.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(search);
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Explore Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore Young Entrepreneurs
          </h1>

          <div className="w-20 h-1 bg-amber-400 mx-auto mt-5 rounded-full"></div>

          <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed">
            Discover the businesses, skills, talents, and services
            offered by young entrepreneurs within our community.
          </p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Discover. Connect. Support.
          </h2>

          <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Every entrepreneur has a story, a skill, and something valuable
            to offer. Explore the people featured on our platform and
            discover opportunities to support their businesses and services.
          </p>
        </div>
      </section>

      {/* Entrepreneurs */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Featured Entrepreneurs
              </h2>

              <div className="w-16 h-1 bg-amber-400 mt-3 rounded-full"></div>
            </div>

            <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm w-fit">
              {filteredEntrepreneurs.length}{" "}
              {filteredEntrepreneurs.length === 1
                ? "Entrepreneur"
                : "Entrepreneurs"}
            </span>
          </div>

          {/* Search */}
          <div className="mb-10">
            <div className="max-w-2xl mx-auto">
              <label
                htmlFor="entrepreneur-search"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Search entrepreneurs
              </label>

              <div className="relative">
                <input
                  id="entrepreneur-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, work, business, skill or service..."
                  className="
                    w-full
                    px-5
                    py-4
                    pr-12
                    bg-white
                    border
                    border-slate-200
                    rounded-xl
                    shadow-sm
                    text-slate-800
                    placeholder-slate-400
                    outline-none
                    focus:border-amber-400
                    focus:ring-2
                    focus:ring-amber-400/20
                    transition
                  "
                />

                {/* Search Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Search Status */}
              {searchTerm && (
                <div className="mt-3 text-sm text-slate-500 text-center">
                  {filteredEntrepreneurs.length > 0 ? (
                    <>
                      Showing{" "}
                      <span className="font-semibold text-slate-700">
                        {filteredEntrepreneurs.length}
                      </span>{" "}
                      result
                      {filteredEntrepreneurs.length !== 1 ? "s" : ""} for{" "}
                      <span className="font-semibold text-amber-500">
                        "{searchTerm}"
                      </span>
                    </>
                  ) : (
                    <>
                      No results found for{" "}
                      <span className="font-semibold text-amber-500">
                        "{searchTerm}"
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Entrepreneur Cards */}
          {filteredEntrepreneurs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEntrepreneurs.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <EntrepreneurCard person={person} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-slate-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                No entrepreneurs found.
              </h3>

              <p className="mt-3 text-slate-600">
                Try searching by entrepreneur name, business, skill,
                profession, or service.
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="
                  mt-6
                  bg-amber-400
                  hover:bg-amber-500
                  text-slate-900
                  px-5
                  py-2.5
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Your Support Can Make a Difference
            </h2>

            <p className="mt-5 text-slate-200 text-lg leading-relaxed">
              Supporting a young entrepreneur can be as simple as
              purchasing their product, using their service, recommending
              their business, or sharing their work with someone who needs it.
            </p>

            <p className="mt-4 text-amber-400 font-semibold text-lg">
              Discover a business. Support a dream. Build a community.
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}