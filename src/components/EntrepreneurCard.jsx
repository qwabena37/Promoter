import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Explore() {

  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadEntrepreneurs = async () => {

      try {

        console.log("Loading entrepreneurs from API...");

        const response = await api.get(
          "/entrepreneurs/"
        );

        console.log(
          "Explore API response:",
          response.data
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setEntrepreneurs(data);

      } catch (error) {

        console.error(
          "Failed to load entrepreneurs:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    loadEntrepreneurs();

  }, []);

  const filteredEntrepreneurs =
    entrepreneurs.filter((person) => {

      const search =
        searchTerm.toLowerCase().trim();

      if (!search) return true;

      const searchableContent = [

        person.name,

        person.title,

        person.location,

        person.description,

        person.socials?.whatsapp,

        person.socials?.instagram,

        person.socials?.facebook,

        person.socials?.tiktok,

        person.socials?.youtube,

        person.socials?.website,

      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(search);

    });

  return (
    <div className="bg-slate-50 min-h-screen">

      <Navbar />

      <section className="
        bg-gradient-to-r
        from-slate-900
        via-blue-900
        to-slate-800
        text-white
        py-20
        px-6
        text-center
      ">

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="max-w-4xl mx-auto"
        >

          <h1 className="
            text-4xl
            md:text-5xl
            font-bold
          ">
            Explore Young Entrepreneurs
          </h1>

          <div className="
            w-20
            h-1
            bg-amber-400
            mx-auto
            mt-5
            rounded-full
          " />

          <p className="
            mt-6
            text-lg
            md:text-xl
            text-slate-200
            leading-relaxed
          ">
            Discover the businesses, skills,
            talents, and services offered by
            young entrepreneurs within our community.
          </p>

        </motion.div>

      </section>

      <section className="py-12 px-6">

        <div className="
          max-w-5xl
          mx-auto
          text-center
        ">

          <h2 className="
            text-3xl
            font-bold
            text-slate-900
          ">
            Discover. Connect. Support.
          </h2>

          <p className="
            mt-4
            text-slate-600
            text-lg
            leading-relaxed
            max-w-3xl
            mx-auto
          ">
            Every entrepreneur has a story,
            a skill, and something valuable to offer.
          </p>

        </div>

      </section>

      <section className="pb-16 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
            mb-8
          ">

            <div>

              <h2 className="
                text-2xl
                md:text-3xl
                font-bold
                text-slate-900
              ">
                Featured Entrepreneurs
              </h2>

              <div className="
                w-16
                h-1
                bg-amber-400
                mt-3
                rounded-full
              " />

            </div>

            <span className="
              bg-slate-900
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              w-fit
            ">
              {filteredEntrepreneurs.length}
              {" "}
              {filteredEntrepreneurs.length === 1
                ? "Entrepreneur"
                : "Entrepreneurs"}
            </span>

          </div>

          <div className="mb-10">

            <div className="max-w-2xl mx-auto">

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="
                  Search by name, business,
                  skill or service...
                "
                className="
                  w-full
                  px-5
                  py-4
                  bg-white
                  border
                  border-slate-200
                  rounded-xl
                  shadow-sm
                  outline-none
                  focus:border-amber-400
                  focus:ring-2
                  focus:ring-amber-400/20
                "
              />

            </div>

          </div>

          {loading ? (

            <div className="
              text-center
              py-16
              text-slate-500
            ">
              Loading entrepreneurs...
            </div>

          ) : filteredEntrepreneurs.length > 0 ? (

            <div className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            ">

              {filteredEntrepreneurs.map(
                (person, index) => (

                  <motion.div
                    key={person.id}
                    initial={{
                      opacity: 0,
                      y: 30
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08
                    }}
                  >

                    <EntrepreneurCard
                      person={person}
                      onClick={() => {
                        console.log(
                          "Selected entrepreneur:",
                          person
                        );
                      }}
                    />

                  </motion.div>

                )
              )}

            </div>

          ) : (

            <div className="
              bg-white
              rounded-2xl
              shadow-md
              p-12
              text-center
            ">

              <h3 className="
                text-xl
                font-bold
                text-slate-900
              ">
                No entrepreneurs found.
              </h3>

              <button
                onClick={() =>
                  setSearchTerm("")
                }
                className="
                  mt-6
                  bg-amber-400
                  hover:bg-amber-500
                  text-slate-900
                  px-5
                  py-2.5
                  rounded-lg
                  font-semibold
                "
              >
                Clear Search
              </button>

            </div>

          )}

        </div>

      </section>

      <Footer />

    </div>
  );
}