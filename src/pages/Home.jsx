
import { useState, useEffect } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import EntrepreneurModal from "../components/EntrepreneurModal";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Counter states
  const [entreCount, setEntreCount] = useState(0);
  const [bizCount, setBizCount] = useState(0);

  /*
   * =====================================================
   * FETCH ENTREPRENEURS
   * =====================================================
   */

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        console.log("Fetching entrepreneurs...");

        const response = await api.get(
          "/entrepreneurs/"
        );

        console.log(
          "Entrepreneurs API response:",
          response.data
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setEntrepreneurs(data);
        setApiError(false);
      } catch (error) {
        console.error(
          "Error fetching entrepreneurs:",
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

        setApiError(true);
        setEntrepreneurs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);

  /*
   * =====================================================
   * OPEN ENTREPRENEUR PROFILE
   * =====================================================
   */

  const handleOpenProfile = (person) => {
    console.log(
      "Opening entrepreneur profile:",
      person
    );

    setSelected(person);
  };

  /*
   * =====================================================
   * CLOSE ENTREPRENEUR PROFILE
   * =====================================================
   */

  const handleCloseProfile = () => {
    console.log("Closing entrepreneur profile");

    setSelected(null);
  };

  /*
   * =====================================================
   * ANIMATED COUNTERS
   * =====================================================
   */

  useEffect(() => {
    const totalEntrepreneurs =
      entrepreneurs.length;

    if (totalEntrepreneurs === 0) {
      setEntreCount(0);
      setBizCount(0);
      return;
    }

    let entrepreneurCounter = 0;
    let businessCounter = 0;

    const interval = setInterval(() => {
      if (
        entrepreneurCounter <
        totalEntrepreneurs
      ) {
        entrepreneurCounter++;

        setEntreCount(
          entrepreneurCounter
        );
      }

      if (
        businessCounter <
        totalEntrepreneurs
      ) {
        businessCounter++;

        setBizCount(
          businessCounter
        );
      }

      if (
        entrepreneurCounter >=
          totalEntrepreneurs &&
        businessCounter >=
          totalEntrepreneurs
      ) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [entrepreneurs.length]);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <Hero />

      {/* =====================================================
          FEATURED ENTREPRENEURS
      ====================================================== */}

      <section className="
        py-16
        px-6
        md:px-8
        max-w-7xl
        mx-auto
      ">

        {/* SECTION HEADER */}

        <div className="
          text-center
          mb-12
        ">

          <h2 className="
            text-4xl
            font-bold
            text-slate-900
          ">
            Our Young Entrepreneurs
          </h2>

          <div className="
            w-24
            h-1
            bg-amber-400
            mx-auto
            mt-4
            rounded-full
          " />

          <p className="
            mt-4
            text-slate-600
            max-w-2xl
            mx-auto
          ">
            Meet inspiring young business leaders
            who are creating impact, driving
            innovation, and shaping the future
            through entrepreneurship.
          </p>

        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (

          <div className="
            text-center
            py-16
          ">

            <div className="
              animate-spin
              rounded-full
              h-14
              w-14
              border-b-4
              border-amber-500
              mx-auto
            " />

            <p className="
              mt-5
              text-slate-600
              font-medium
            ">
              Loading entrepreneurs...
            </p>

          </div>

        )}

        {/* =====================================================
            API ERROR
        ====================================================== */}

        {!loading && apiError && (

          <div className="
            text-center
            py-16
          ">

            <div className="
              max-w-lg
              mx-auto
              bg-white
              rounded-xl
              shadow-md
              p-8
            ">

              <h3 className="
                text-2xl
                font-semibold
                text-slate-800
                mb-3
              ">
                Entrepreneurs are currently unavailable
              </h3>

              <p className="
                text-slate-500
              ">
                We couldn't connect to the
                entrepreneurs database.
                Please check back shortly.
              </p>

            </div>

          </div>

        )}

        {/* =====================================================
            EMPTY DATABASE
        ====================================================== */}

        {!loading &&
          !apiError &&
          entrepreneurs.length === 0 && (

            <div className="
              text-center
              py-16
            ">

              <div className="
                max-w-lg
                mx-auto
                bg-white
                rounded-xl
                shadow-md
                p-8
              ">

                <h3 className="
                  text-2xl
                  font-semibold
                  text-slate-700
                ">
                  No entrepreneurs available yet.
                </h3>

                <p className="
                  text-slate-500
                  mt-3
                ">
                  New entrepreneur profiles will
                  appear here once they are added
                  by the administrator.
                </p>

              </div>

            </div>

          )}

        {/* =====================================================
            ENTREPRENEUR CARDS
        ====================================================== */}

        {!loading &&
          !apiError &&
          entrepreneurs.length > 0 && (

            <div className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            ">

              {entrepreneurs.map((person) => (

                <EntrepreneurCard
                  key={person.id}
                  person={person}
                  onClick={() =>
                    handleOpenProfile(person)
                  }
                />

              ))}

            </div>

          )}

      </section>

      {/* =====================================================
          ENTREPRENEUR MODAL
      ====================================================== */}

      {selected && (

        <EntrepreneurModal
          person={selected}
          onClose={handleCloseProfile}
        />

      )}

      {/* =====================================================
          STATS SECTION
      ====================================================== */}

      <section
  className="
    bg-gradient-to-r
    from-slate-900
    via-blue-900
    to-slate-800
    text-white
    py-10
    sm:py-12
    md:py-16
  "
>
  <div
    className="
      max-w-5xl
      mx-auto
      text-center
      px-4
      sm:px-6
    "
  >
    <h2
      className="
        text-2xl
        sm:text-3xl
        font-bold
        mb-7
        sm:mb-10
      "
    >
      Our Growing Impact
    </h2>

    <div
      className="
        flex
        flex-row
        justify-center
        items-start
        gap-6
        sm:gap-12
        md:gap-20
      "
    >
      {/* ENTREPRENEURS */}

      <div className="flex-1 min-w-0">
        <h3
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-amber-400
          "
        >
          {entreCount}+
        </h3>

        <p
          className="
            mt-2
            sm:mt-3
            text-xs
            sm:text-sm
            md:text-base
            text-slate-200
            leading-tight
          "
        >
          Young Entrepreneurs Exposed
        </p>
      </div>

      {/* BUSINESSES */}

      <div className="flex-1 min-w-0">
        <h3
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-amber-400
          "
        >
          {bizCount}+
        </h3>

        <p
          className="
            mt-2
            sm:mt-3
            text-xs
            sm:text-sm
            md:text-base
            text-slate-200
            leading-tight
          "
        >
          Businesses Promoted
        </p>
      </div>
    </div>
  </div>
</section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}
